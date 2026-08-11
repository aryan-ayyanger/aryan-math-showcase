export interface Article {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  readTime: string;
  date: string;
  pdfPath?: string;
  author: string;
  indexable: boolean;
  comingSoon?: boolean;
}

export const articles: Article[] = [
  {
    slug: 'divisibility-in-olympiad-number-theory',
    title: 'Divisibility in Olympiad Number Theory',
    category: 'Number Theory',
    description: 'Explore fundamental divisibility concepts and their applications in mathematical olympiads, including modular arithmetic and prime factorization techniques.',
    tags: ['Number Theory', 'Olympiad', 'Divisibility'],
    readTime: '12 min read',
    date: 'March 2026',
    pdfPath: '/Number_Theory_Divisibility.pdf',
    author: 'Aryan Ayyanger',
    indexable: true,
  },
  {
    slug: 'prime-numbers-and-factorization',
    title: 'Prime Numbers and Factorization: Intermediate Techniques',
    category: 'Number Theory',
    description: "A complete follow-up to Divisibility in Olympiad Number Theory, covering primes, factorization methods, GCD/LCM structure, Legendre's formula, factorial exponents, and advanced divisibility techniques for olympiad problem solving.",
    tags: ['Number Theory', 'Olympiad', 'Prime Factorization'],
    readTime: '16 min read',
    date: 'August 2026',
    pdfPath: '/Number_Theory_Second_Handout.pdf',
    author: 'Aryan Ayyanger',
    indexable: true,
  },
  {
    slug: 'counting-and-combinatorics-core-concepts',
    title: 'Counting and Combinatorics: Core Concepts Guide',
    category: 'Combinatorics',
    description: 'Includes fundamental counting principles, permutations, inclusion-exclusion, and double counting. A strong starting point for beginners building essential combinatorics skills.',
    tags: ['Combinatorics', 'Counting', 'Olympiad'],
    readTime: '14 min read',
    date: 'August 2026',
    pdfPath: '/Olympiad_Counting_and_Combinatorics_Handout_1.pdf',
    author: 'Aryan Ayyanger',
    indexable: true,
  },
  {
    slug: 'algebraic-manipulations',
    title: 'Algebraic Manipulations',
    category: 'Algebra',
    description: 'Master the art of polynomials, algebraic expressions and other extraneous algebraic topics.',
    tags: ['Algebra', 'Polynomials'],
    readTime: '',
    date: 'Coming Soon',
    author: 'Aryan Ayyanger',
    indexable: false,
    comingSoon: true,
  },
];
