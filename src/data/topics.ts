import { LucideIcon, Calculator, Lightbulb, Target, Sparkles } from 'lucide-react';

export interface MathTopic {
  name: string;
  icon: LucideIcon;
  description: string;
}

export const topics: MathTopic[] = [
  { name: 'Combinatorics', icon: Lightbulb, description: 'Counting, probability, recursion' },
  { name: 'Number Theory', icon: Calculator, description: 'Divisibility, modular arithmetic, primes' },
  { name: 'Algebra', icon: Target, description: 'Polynomials, inequalities, sequences' },
  { name: 'Geometry', icon: Sparkles, description: 'Euclidean, coordinate, transformations' }
];
