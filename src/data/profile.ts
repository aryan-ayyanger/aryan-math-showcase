export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  stats: Stat[];
}

export const profile: Profile = {
  name: 'Aryan Ayyanger',
  tagline: 'Competitive Math • Mathematical Modeling • Engineering Research',
  location: 'Houston, TX',
  email: 'aryan.ayyanger@gmail.com',
  github: '@aryan-ayyanger',
  linkedin: 'https://www.linkedin.com/in/aryan-ayyanger-bb4219357/',
  bio: `Passionate about exploring the intersection of mathematics and engineering through olympiad problem-solving, scientific research, and space systems design. Applying mathematical modeling, data analysis, and optimization to solve real-world challenges in healthcare and ecological systems.`,
  stats: [
    { label: 'AIME Qualifications', value: '2×' },
    { label: 'Articles Written', value: '1+' },
    { label: 'Research Projects', value: '3+' },
    { label: 'Competition Awards', value: '6+' }
  ]
};
