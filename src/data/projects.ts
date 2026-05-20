import { LucideIcon, Brain, Rocket, BookOpen } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  status: 'In Progress' | 'Completed' | 'Ongoing';
}

export const projects: Project[] = [
  {
    title: 'PPG-Based Arrhythmia Detection Research',
    description: 'Developed a biomedical heart arrhythmia sensor using photoplethysmography (PPG) sensors, tested on 15+ subjects. Designed mathematical algorithms and sinus rhythm deviation models to analyze physiological datasets and detect cardiac irregularities. Regional Qualifier at Science & Engineering Fair of Houston.',
    tags: ['Biomedical', 'Mathematical Modeling', 'Data Analysis'],
    icon: Brain,
    status: 'Completed'
  },
  {
    title: 'NASA Space Settlement Design Competition',
    description: 'Lead Operational Engineer for mathematical optimization in space settlement modeling. Contributed to energy-efficiency analysis, structural planning, and cross-team engineering coordination. Organized technical presentations for NASA judge panels.',
    tags: ['Space Engineering', 'Optimization', 'Leadership'],
    icon: Rocket,
    status: 'Completed'
  },
  {
    title: 'Biodiversity Index Research',
    description: 'Developed an integrated biodiversity index combining Quadratic Entropy and Pianka\'s Index with energy-based representation using gross primary product. Built optimization and classification models using CART trees, recursion, and K-means clustering. Regional Qualifier at Science & Engineering Fair of Houston.',
    tags: ['Ecological Modeling', 'Data Science', 'Research'],
    icon: BookOpen,
    status: 'Completed'
  }
];
