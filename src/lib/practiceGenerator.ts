import { Problem, Difficulty } from '../data/problems';

export type PracticeLevel = 1 | 2 | 3;

export const MIN_PROBLEMS = 3;
export const MAX_PROBLEMS = 20;

export interface DifficultyCounts {
  Easy: number;
  Medium: number;
  Hard: number;
}

export interface Distribution extends DifficultyCounts {
  timeMinutes: number;
}

export const LEVEL_LABELS: Record<PracticeLevel, string> = {
  1: 'Level 1',
  2: 'Level 2',
  3: 'Level 3',
};

export const LEVEL_DESCRIPTIONS: Record<PracticeLevel, string> = {
  1: 'Mostly easy, a bit of medium — a warm-up set.',
  2: 'A balanced mix across easy, medium, and hard.',
  3: 'Mostly hard, some medium — a challenge set.',
};

// Difficulty distribution + suggested time, per the Practice Generator spec.
export function computeDistribution(level: PracticeLevel, n: number): Distribution {
  if (level === 1) {
    const easy = Math.floor(0.8 * n);
    const medium = n - easy;
    return { Easy: easy, Medium: medium, Hard: 0, timeMinutes: 1.5 * n };
  }
  if (level === 2) {
    const medium = Math.floor(0.6 * n);
    const hard = Math.floor(0.2 * n);
    const easy = n - medium - hard;
    return { Easy: easy, Medium: medium, Hard: hard, timeMinutes: 1.5 * n };
  }
  const hard = Math.floor(0.8 * n);
  const medium = n - hard;
  return { Easy: 0, Medium: medium, Hard: hard, timeMinutes: 2 * n };
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface GeneratedSet {
  problems: Problem[];
  distribution: Distribution;
  warning?: string;
}

// Selects `distribution` problems per difficulty without replacement, shuffles
// the result, and backfills from other difficulties if the bank runs short
// (expected only while the placeholder bank is small).
export function generateProblemSet(bank: Problem[], level: PracticeLevel, n: number): GeneratedSet {
  const distribution = computeDistribution(level, n);
  const used = new Set<string>();
  const selected: Problem[] = [];
  let shortfall = 0;

  (['Easy', 'Medium', 'Hard'] as Difficulty[]).forEach((difficulty) => {
    const need = distribution[difficulty];
    if (need <= 0) return;
    const pool = shuffle(bank.filter((p) => p.difficulty === difficulty));
    const take = pool.slice(0, need);
    take.forEach((p) => used.add(p.id));
    selected.push(...take);
    shortfall += need - take.length;
  });

  if (shortfall > 0) {
    const remaining = shuffle(bank.filter((p) => !used.has(p.id)));
    const fill = remaining.slice(0, shortfall);
    fill.forEach((p) => used.add(p.id));
    selected.push(...fill);
  }

  const warning = selected.length < n
    ? `The problem bank only has ${selected.length} of ${n} requested problems available right now.`
    : undefined;

  return { problems: shuffle(selected), distribution, warning };
}
