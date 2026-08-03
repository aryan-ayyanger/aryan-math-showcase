export interface Article {
  title: string;
  description: string;
  tags: string[];
  readTime: string;
  date: string;
  comingSoon?: boolean;
  link?: string;
}

export const articles: Article[] = [
  {
    title: 'Divisibility in Olympiad Number Theory',
    description: 'Explore fundamental divisibility concepts and their applications in mathematical olympiads, including modular arithmetic and prime factorization techniques.',
    tags: ['Number Theory', 'Olympiad', 'Divisibility'],
    readTime: '12 min read',
    date: 'March 2026',
    link: '/Number_Theory_Divisibility.pdf'
  },
  {
    title: 'Prime Numbers and Factorization: Intermediate Techniques',
    description: 'A complete follow-up to Divisibility in Olympiad Number Theory, covering primes, factorization methods, GCD/LCM structure, Legendre\'s formula, factorial exponents, and advanced divisibility techniques for olympiad problem solving.',
    tags: ['Number Theory', 'Olympiad', 'Prime Factorization'],
    readTime: '16 min read',
    date: 'August 2026',
    link: '/Number_Theory_Second_Handout.pdf'
  },
  {
    title: 'Counting and Combinatorics: Core Concepts Guide',
    description: 'Includes fundamental counting principles, permutations, inclusion-exclusion, and double counting. A strong starting point for beginners building essential combinatorics skills.',
    tags: ['Combinatorics', 'Counting', 'Olympiad'],
    readTime: '14 min read',
    date: 'August 2026',
    link: '/Olympiad_Counting_and_Combinatorics_Handout_1.pdf'
  },
  {
    title: 'Algebraic Manipulations',
    description: 'Master the art of polynomials, algebraic expressions and other extraneous algebraic topics.',
    tags: ['Algebra', 'Polynomials'],
    readTime: '',
    date: 'Coming Soon',
    comingSoon: true
  }
];
