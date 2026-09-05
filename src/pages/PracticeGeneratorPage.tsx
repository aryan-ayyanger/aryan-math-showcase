import { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { problems } from '../data/problems';
import type { Problem } from '../data/problems';
import {
  computeDistribution,
  generateProblemSet,
  LEVEL_LABELS,
  LEVEL_DESCRIPTIONS,
  MIN_PROBLEMS,
  MAX_PROBLEMS,
  PracticeLevel,
  GeneratedSet,
} from '../lib/practiceGenerator';
import { MathText } from '../lib/mathText';
import { getCategoryColor } from '../lib/categoryColors';

const LEVELS: PracticeLevel[] = [1, 2, 3];

interface ProblemCardProps {
  index: number;
  problem: Problem;
  revealed: boolean;
}

function ProblemCard({ index, problem, revealed }: ProblemCardProps): JSX.Element {
  const color = getCategoryColor(problem.topic);
  return (
    <div className="p-6 rounded-xl bg-white border border-[var(--color-rule)]">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-display text-sm text-slate-400">#{index + 1}</span>
        <span className={`small-caps text-[11px] font-semibold px-2.5 py-1 rounded-md ${color.bg} ${color.text}`}>
          {problem.topic}
        </span>
      </div>

      <MathText text={problem.problem} className="text-[var(--color-ink)] leading-relaxed" />

      <div className="mt-5">
        <label className="small-caps text-[11px] font-semibold text-slate-500" htmlFor={`answer-${problem.id}`}>
          Your Answer
        </label>
        <textarea
          id={`answer-${problem.id}`}
          rows={2}
          disabled={revealed}
          placeholder="Write your answer here"
          className="mt-1.5 w-full p-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-alt)] text-sm outline-none focus:border-[var(--color-primary)] transition-colors disabled:opacity-60"
        />
      </div>

      {revealed && (
        <div className="mt-5 pt-5 border-t border-dashed border-[var(--color-rule)] space-y-3">
          <div>
            <span className="small-caps text-[11px] font-semibold text-[var(--color-primary)]">Answer</span>
            <div className="mt-1">
              <MathText text={problem.answer} className="text-[var(--color-ink)]" />
            </div>
          </div>
          <div>
            <span className="small-caps text-[11px] font-semibold text-[var(--color-primary)]">Solution</span>
            <div className="mt-1">
              <MathText text={problem.solution} className="text-slate-600 leading-relaxed" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PracticeGeneratorPage(): JSX.Element {
  const [level, setLevel] = useState<PracticeLevel>(2);
  const [count, setCount] = useState<number>(10);
  const [generated, setGenerated] = useState<GeneratedSet | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);

  const previewDistribution = computeDistribution(level, count);

  const handleGenerate = (): void => {
    setGenerated(generateProblemSet(problems, level, count));
    setRevealed(false);
  };

  const handleNewSet = (): void => {
    setGenerated(null);
    setRevealed(false);
  };

  return (
    <div className="pb-24">
      <section className="bg-[var(--color-primary)] pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Practice Generator
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            Generate a custom practice set from the original problem bank. Choose a
            difficulty level and a problem count, and get a shuffled set with a
            time estimate.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        {!generated && (
          <div className="pt-10 pb-4">
            <div className="p-6 rounded-xl bg-white border border-[var(--color-rule)] space-y-8">
              <div>
                <h2 className="small-caps text-xs text-[var(--color-primary)] font-semibold mb-4">
                  Difficulty
                </h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`text-left p-4 rounded-lg border transition-colors ${
                        level === lvl
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                          : 'border-[var(--color-rule)] hover:border-[var(--color-primary)]/30'
                      }`}
                    >
                      <span className="font-display text-lg text-[var(--color-ink)]">
                        {LEVEL_LABELS[lvl]}
                      </span>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {LEVEL_DESCRIPTIONS[lvl]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="small-caps text-xs text-[var(--color-primary)] font-semibold">
                    Number of Problems
                  </h2>
                  <span className="font-display text-lg text-[var(--color-ink)]">{count}</span>
                </div>
                <input
                  type="range"
                  min={MIN_PROBLEMS}
                  max={MAX_PROBLEMS}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{MIN_PROBLEMS}</span>
                  <span>{MAX_PROBLEMS}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs small-caps text-slate-500">
                <span>{previewDistribution.Easy} Easy</span>
                <span>{previewDistribution.Medium} Medium</span>
                <span>{previewDistribution.Hard} Hard</span>
                <span>&middot;</span>
                <span>~{previewDistribution.timeMinutes} minutes</span>
              </div>

              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-soft)] transition-colors"
              >
                <Sparkles size={14} aria-hidden="true" />
                Generate Practice Set
              </button>
            </div>
          </div>
        )}

        {generated && (
          <div className="pt-10 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-5 rounded-xl bg-[var(--color-paper-alt)] border border-[var(--color-rule)]">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                <span className="font-display text-lg text-[var(--color-ink)]">
                  {generated.problems.length} Problems &middot; {LEVEL_LABELS[level]}
                </span>
                <span className="text-slate-500 small-caps text-xs">
                  {generated.distribution.Easy} Easy &middot; {generated.distribution.Medium} Medium &middot; {generated.distribution.Hard} Hard
                </span>
                <span className="text-slate-500 small-caps text-xs">
                  ~{generated.distribution.timeMinutes} minutes
                </span>
              </div>
              <button
                onClick={handleNewSet}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <RefreshCw size={14} aria-hidden="true" />
                New Set
              </button>
            </div>

            {generated.warning && (
              <p className="mb-6 text-sm text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded-lg px-4 py-3">
                {generated.warning}
              </p>
            )}

            <div className="space-y-4">
              {generated.problems.map((problem, i) => (
                <ProblemCard key={problem.id} index={i} problem={problem} revealed={revealed} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-soft)] transition-colors"
                >
                  Submit &amp; Reveal Answers
                </button>
              ) : (
                <button
                  onClick={handleNewSet}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-soft)] transition-colors"
                >
                  <Sparkles size={14} aria-hidden="true" />
                  Generate Another Set
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
