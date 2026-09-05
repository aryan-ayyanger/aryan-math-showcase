import type { ComponentType } from 'react';
import { Lightbulb, Triangle } from 'lucide-react';
import { ModulusIcon, AlgebraIcon } from '../components/MathIcons';

export interface MathTopic {
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  description: string;
}

export const topics: MathTopic[] = [
  { name: 'Combinatorics', icon: Lightbulb, description: 'Counting, probability, recursion' },
  { name: 'Number Theory', icon: ModulusIcon, description: 'Divisibility, modular arithmetic, primes' },
  { name: 'Algebra', icon: AlgebraIcon, description: 'Polynomials, inequalities, sequences' },
  { name: 'Geometry', icon: Triangle, description: 'Euclidean, coordinate, transformations' }
];
