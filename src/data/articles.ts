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
    title: 'Algebraic Manipulations',
    description: 'Master the art of polynomials, algebraic expressions and other extraneous algebraic topics.',
    tags: ['Algebra', 'Polynomials'],
    readTime: '',
    date: 'Coming Soon',
    comingSoon: true
  }
];
