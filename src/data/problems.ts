// Placeholder problem bank — a small, hand-verified seed set standing in for the
// full 50-problem bank described in the spec (17 Easy / 17 Medium / 16 Hard).
// In production this data should live in a Google Sheet (ID | Problem | Answer |
// Solution | Topic | Subtopic | Difficulty | Format | Source | Author) and be
// fetched at build/runtime; swap the export below for that fetch when ready.
// All problems here are original — not sourced from AMC/AIME or any contest.

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  problem: string;
  answer: string;
  solution: string;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  format: 'Short Answer';
  source: 'BetweenTheSteps Original';
  author: string;
}

const AUTHOR = 'Aryan Ayyanger';
const SOURCE = 'BetweenTheSteps Original';

export const problems: Problem[] = [
  // Number Theory
  {
    id: 'NT-E1', topic: 'Number Theory', subtopic: 'Modular Arithmetic', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'What is the remainder when $2^{2026}$ is divided by $7$?',
    answer: '$2$',
    solution: 'Since $2^3 = 8 \\equiv 1 \\pmod{7}$, powers of $2$ cycle with period $3$. Because $2026 = 3\\cdot 675 + 1$, we get $2^{2026} \\equiv 2^1 \\equiv 2 \\pmod{7}$.',
  },
  {
    id: 'NT-E2', topic: 'Number Theory', subtopic: 'Divisors', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'How many positive divisors does $360$ have?',
    answer: '$24$',
    solution: '$360 = 2^3 \\cdot 3^2 \\cdot 5^1$, so the number of divisors is $(3+1)(2+1)(1+1) = 24$.',
  },
  {
    id: 'NT-M1', topic: 'Number Theory', subtopic: 'Diophantine Equations', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Find the number of ordered pairs of positive integers $(x,y)$ satisfying $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{20}$.',
    answer: '$15$',
    solution: 'Multiplying through and rearranging gives $(x-20)(y-20) = 400$. Since $400 = 2^4 \\cdot 5^2$ has $15$ positive divisors, and each divisor $d$ gives a valid pair $x = 20+d$, $y = 20+400/d$, there are $15$ ordered pairs.',
  },
  {
    id: 'NT-M2', topic: 'Number Theory', subtopic: "Legendre's Formula", difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'How many trailing zeros does $50!$ have?',
    answer: '$12$',
    solution: 'The number of trailing zeros equals the exponent of $5$ in $50!$: $\\lfloor 50/5 \\rfloor + \\lfloor 50/25 \\rfloor = 10 + 2 = 12$.',
  },
  {
    id: 'NT-H1', topic: 'Number Theory', subtopic: 'Multiplicative Order', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Find the smallest positive integer $n$ such that $2^n \\equiv 1 \\pmod{101}$.',
    answer: '$100$',
    solution: 'Since $101$ is prime, the order of $2$ divides $100 = 2^2 \\cdot 5^2$. Checking each divisor of $100$ shows $2^{50} \\equiv -1 \\pmod{101}$ and no proper divisor of $100$ works, so the order is $100$.',
  },
  {
    id: 'NT-H2', topic: 'Number Theory', subtopic: 'Chinese Remainder Theorem', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Find the smallest positive integer that leaves a remainder of $3$ when divided by $7$, a remainder of $5$ when divided by $11$, and a remainder of $2$ when divided by $13$.',
    answer: '$808$',
    solution: 'Writing $N = 7k+3$ and solving $7k+3 \\equiv 5 \\pmod{11}$ gives $k \\equiv 5 \\pmod{11}$, so $N = 77m + 38$. Solving $77m+38 \\equiv 2 \\pmod{13}$ gives $m \\equiv 10 \\pmod{13}$, so the smallest solution is $N = 1001(0) + 77(10) + 38 = 808$.',
  },

  // Combinatorics
  {
    id: 'C-E1', topic: 'Combinatorics', subtopic: 'Permutations', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'In how many ways can $3$ distinct books be arranged on a shelf?',
    answer: '$6$',
    solution: 'There are $3! = 6$ arrangements of $3$ distinct objects.',
  },
  {
    id: 'C-E2', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'A committee of $3$ people is to be chosen from a group of $10$. How many different committees are possible?',
    answer: '$120$',
    solution: '$\\binom{10}{3} = \\frac{10 \\cdot 9 \\cdot 8}{6} = 120$.',
  },
  {
    id: 'C-M1', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'How many $5$-digit positive integers have digits that strictly increase from left to right?',
    answer: '$126$',
    solution: 'Any set of $5$ distinct digits from $\\{1,\\ldots,9\\}$ (digit $0$ cannot appear, since it could only be the smallest digit, which would have to lead the number) corresponds to exactly one strictly increasing arrangement. There are $\\binom{9}{5} = 126$ such sets.',
  },
  {
    id: 'C-M2', topic: 'Combinatorics', subtopic: 'Inclusion-Exclusion', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'How many integers from $1$ to $300$ inclusive are divisible by neither $3$ nor $5$?',
    answer: '$160$',
    solution: 'By inclusion-exclusion, the count divisible by $3$ or $5$ is $100 + 60 - 20 = 140$. So $300 - 140 = 160$ integers are divisible by neither.',
  },
  {
    id: 'C-H1', topic: 'Combinatorics', subtopic: 'Derangements', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'In how many ways can $7$ distinct letters be placed into $7$ distinct envelopes (one letter per envelope) so that no letter is placed in its correct envelope?',
    answer: '$1854$',
    solution: 'This is the derangement number $D_7 = 7!\\sum_{k=0}^{7}\\frac{(-1)^k}{k!} = 1854$.',
  },
  {
    id: 'C-H2', topic: 'Combinatorics', subtopic: 'Stars and Bars', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Find the number of ways to distribute $20$ identical candies among $4$ distinct children so that each child gets at least $2$ candies but no more than $8$ candies.',
    answer: '$231$',
    solution: 'Give each child $2$ candies first, leaving $12$ to distribute with each child receiving between $0$ and $6$ more. Unrestricted solutions to $a+b+c+d=12$ number $\\binom{15}{3}=455$. Subtracting the $4\\binom{8}{3} = 224$ solutions where some child exceeds the cap (and no overlaps occur), the answer is $455-224=231$.',
  },

  // Algebra
  {
    id: 'A-E1', topic: 'Algebra', subtopic: 'Function Evaluation', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'If $f(x) = 2x^2 - 3x + 1$, find $f(3)$.',
    answer: '$10$',
    solution: '$f(3) = 2(9) - 3(3) + 1 = 18 - 9 + 1 = 10$.',
  },
  {
    id: 'A-E2', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Solve for $x$: $\\frac{2x+1}{3} = \\frac{x-2}{2}$.',
    answer: '$x = -8$',
    solution: 'Cross-multiplying gives $2(2x+1) = 3(x-2)$, so $4x+2 = 3x-6$, giving $x = -8$.',
  },
  {
    id: 'A-M1', topic: 'Algebra', subtopic: "Vieta's Formulas", difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'The roots of $x^2 - 7x + k = 0$ are both positive integers. Find the sum of all possible values of $k$.',
    answer: '$28$',
    solution: 'The roots are positive integers summing to $7$: $(1,6), (2,5), (3,4)$, giving $k = 6, 10, 12$. The sum of possible values is $6+10+12 = 28$.',
  },
  {
    id: 'A-M2', topic: 'Algebra', subtopic: 'Sequences', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'The first term of an arithmetic sequence is $5$ and the $20$th term is $81$. Find the common difference.',
    answer: '$4$',
    solution: 'Using $a_{20} = a_1 + 19d$: $81 = 5 + 19d$, so $d = 76/19 = 4$.',
  },
  {
    id: 'A-H1', topic: 'Algebra', subtopic: 'Symmetric Functions', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Let $a,b,c$ be the roots of $x^3 - 6x^2 + 11x - 6 = 0$. Find $a^2+b^2+c^2$.',
    answer: '$14$',
    solution: 'By Vieta, $a+b+c=6$ and $ab+bc+ca=11$. Then $a^2+b^2+c^2 = (a+b+c)^2 - 2(ab+bc+ca) = 36 - 22 = 14$.',
  },
  {
    id: 'A-H2', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'For positive reals $x,y$ with $x+y=10$, find the minimum value of $\\frac{1}{x}+\\frac{1}{y}$.',
    answer: '$\\frac{2}{5}$',
    solution: 'Since $\\frac{1}{x}+\\frac{1}{y} = \\frac{x+y}{xy} = \\frac{10}{xy}$, this is minimized when $xy$ is maximized. By AM-GM, $xy \\le \\left(\\frac{x+y}{2}\\right)^2 = 25$, with equality at $x=y=5$. The minimum value is $10/25 = 2/5$.',
  },

  // Geometry
  {
    id: 'G-E1', topic: 'Geometry', subtopic: 'Right Triangles', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'A right triangle has legs of length $9$ and $12$. Find the length of the hypotenuse.',
    answer: '$15$',
    solution: 'By the Pythagorean theorem, the hypotenuse is $\\sqrt{9^2+12^2} = \\sqrt{225} = 15$.',
  },
  {
    id: 'G-E2', topic: 'Geometry', subtopic: 'Circles', difficulty: 'Easy',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Find the area of a circle with radius $6$, in terms of $\\pi$.',
    answer: '$36\\pi$',
    solution: 'Area $= \\pi r^2 = \\pi (6)^2 = 36\\pi$.',
  },
  {
    id: 'G-M1', topic: 'Geometry', subtopic: 'Similar Triangles', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'In $\\triangle ABC$, points $D$ and $E$ lie on sides $AB$ and $AC$ so that $DE \\parallel BC$. If $AD=4$, $DB=6$, and $DE=8$, find $BC$.',
    answer: '$20$',
    solution: 'Since $DE \\parallel BC$, $\\triangle ADE \\sim \\triangle ABC$ with ratio $AD/AB = 4/10 = 2/5$. So $BC = DE \\cdot \\frac{5}{2} = 20$.',
  },
  {
    id: 'G-M2', topic: 'Geometry', subtopic: 'Power of a Point', difficulty: 'Medium',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'Two chords $\\overline{AB}$ and $\\overline{CD}$ of a circle intersect at point $P$ inside the circle. If $AP=4$, $PB=9$, and $CP=6$, find $PD$.',
    answer: '$6$',
    solution: 'By power of a point, $AP \\cdot PB = CP \\cdot PD$, so $36 = 6 \\cdot PD$, giving $PD = 6$.',
  },
  {
    id: 'G-H1', topic: 'Geometry', subtopic: 'Coordinate Geometry', difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'A circle passes through the points $(0,0)$, $(6,0)$, and $(0,8)$. Find the radius of the circle.',
    answer: '$5$',
    solution: 'The angle at $(0,0)$ between the two axes is $90^\\circ$, so the segment from $(6,0)$ to $(0,8)$ is a diameter. Its length is $\\sqrt{36+64} = 10$, so the radius is $5$.',
  },
  {
    id: 'G-H2', topic: 'Geometry', subtopic: "Heron's Formula", difficulty: 'Hard',
    format: 'Short Answer', source: SOURCE, author: AUTHOR,
    problem: 'In $\\triangle ABC$, $AB=13$, $BC=14$, $CA=15$. Find the area of $\\triangle ABC$.',
    answer: '$84$',
    solution: "With $s = 21$, Heron's formula gives area $= \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.",
  },
];
