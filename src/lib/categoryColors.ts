// Maps article categories to a consistent badge color across the site.
export const categoryColors: Record<string, { bg: string; text: string }> = {
  'Number Theory': { bg: 'bg-[#16225c]/10', text: 'text-[#16225c]' },
  Combinatorics: { bg: 'bg-[#0f6d5c]/10', text: 'text-[#0f6d5c]' },
  Algebra: { bg: 'bg-[#c8842a]/15', text: 'text-[#95611c]' },
  Geometry: { bg: 'bg-[#7a3b69]/10', text: 'text-[#7a3b69]' },
};

const fallback = { bg: 'bg-slate-100', text: 'text-slate-600' };

export function getCategoryColor(category: string): { bg: string; text: string } {
  return categoryColors[category] ?? fallback;
}
