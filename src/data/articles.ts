export interface Article {
  slug: string;
  title: string;
  category: string;
  description: string;
  topics?: string[];
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
    description: 'Learn key divisibility techniques used in Olympiad number theory, including modular arithmetic, GCD and LCM, Bézout\'s theorem, prime factorization strategies, and competition-style problem solving.',
    topics: [
      'Divisibility rules and their proofs',
      'Modular arithmetic fundamentals',
      'GCD, LCM, and Bézout\'s theorem',
      'Prime factorization and its applications',
      'Competition problem-solving strategies',
    ],
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
    description: 'A follow-up to the Divisibility handout covering prime numbers, integer factorization, GCD/LCM structure, Legendre\'s formula for factorial valuations, and advanced divisibility techniques for competition mathematics.',
    topics: [
      'Properties and distribution of prime numbers',
      'Integer factorization methods',
      'GCD and LCM structure',
      'Legendre\'s formula for prime exponents in factorials',
      'Factorial valuations and advanced divisibility',
    ],
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
    description: 'Covers fundamental counting principles, permutations, combinations, inclusion-exclusion, and double counting—building a solid foundation for competition-level combinatorics.',
    category: 'Combinatorics',
    topics: [
      'Rule of sum and rule of product',
      'Permutations and combinations',
      'Inclusion-exclusion principle',
      'Double counting techniques',
      'Foundation for competition combinatorics problems',
    ],
    tags: ['Combinatorics', 'Counting', 'Olympiad'],
    readTime: '14 min read',
    date: 'August 2026',
    pdfPath: '/Olympiad_Counting_and_Combinatorics_Handout_1.pdf',
    author: 'Aryan Ayyanger',
    indexable: true,
  },
  {
    slug: 'coordinate-geometry-amc',
    title: 'Coordinate Geometry',
    category: 'Geometry',
    description: 'An AMC 10/12 guide to coordinate geometry covering strategic axis placement, essential formulas, circles and power of a point, and conic sections—with tiered problem sets and full solutions.',
    topics: [
      'Strategic coordinate placement for common figures',
      'Distance, midpoint, section, and shoelace formulas',
      'Circles, power of a point, and the radical axis',
      'Conic sections: parabolas, ellipses, and hyperbolas',
      'Tiered AMC 10/12 problem sets with full solutions',
    ],
    tags: ['Geometry', 'AMC', 'Coordinate Geometry', 'Conics'],
    readTime: '20 min read',
    date: 'August 2026',
    pdfPath: '/Coordinate_Geometry.pdf',
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
