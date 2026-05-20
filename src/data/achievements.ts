import { LucideIcon, Trophy, Star, Award, Atom, Calculator, Target } from 'lucide-react';

export interface Achievement {
  title: string;
  icon: LucideIcon;
  color: string;
}

export const achievements: Achievement[] = [
  { title: '2× AIME Qualifier', icon: Trophy, color: 'from-amber-500 to-yellow-500' },
  { title: 'MathCON Finalist (2×) — Honorable Mention', icon: Star, color: 'from-purple-500 to-pink-500' },
  { title: 'Genius Olympiad Finalist (Science Fair)', icon: Award, color: 'from-emerald-500 to-teal-500' },
  { title: 'Texas A&M Math Contest Power Team — 2nd', icon: Calculator, color: 'from-blue-500 to-cyan-500' },
  { title: 'University of Houston Physics Contest — 2nd', icon: Atom, color: 'from-green-500 to-emerald-500' },
  { title: 'TMSCA State Contest — 5th', icon: Target, color: 'from-orange-500 to-red-500' }
];

// Cache-busting comment for Vercel redeploy
