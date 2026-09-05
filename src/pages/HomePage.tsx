import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { topics } from '../data/topics';
import { getCategoryColor } from '../lib/categoryColors';

export default function HomePage(): JSX.Element {
  return (
    <div className="pb-24">
      {/* Hero — solid brand band, not a gradient */}
      <section className="bg-[var(--color-primary)] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] text-white tracking-tight">
            Between the Steps
          </h1>
          <p className="mt-5 text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Between the Steps is a growing library of competitive math
            handouts, problem-solving guides, and crafted problems for
            students chasing the AMC, AIME, and beyond. Most write-ups jump
            straight from problem to answer. This site dwells on the steps
            in between: the reasoning, the false starts, the moment an idea
            clicks.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-accent-soft)] transition-colors"
            >
              <BookOpen size={16} />
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        {/* Math pillars */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink)]">
              Math Pillars
            </h2>
            <span className="small-caps text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              AMC/AIME Focus
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map((topic) => {
              const color = getCategoryColor(topic.name);
              const Icon = topic.icon;
              return (
                <div
                  key={topic.name}
                  className="p-6 rounded-xl bg-white border border-[var(--color-rule)] text-center"
                >
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color.bg} ${color.text}`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg text-[var(--color-ink)] mb-1.5">{topic.name}</h3>
                  <p className="text-sm text-slate-500">{topic.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}



