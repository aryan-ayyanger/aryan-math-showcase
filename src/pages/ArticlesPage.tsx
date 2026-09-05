import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { sortedArticles, Article } from '../data/articles';
import { topics } from '../data/topics';
import { getCategoryColor } from '../lib/categoryColors';

interface ArticleRowProps {
  article: Article;
}

function ArticleRow({ article }: ArticleRowProps): JSX.Element {
  const isComingSoon = article.comingSoon;
  const color = getCategoryColor(article.category);

  const content = (
    <div className={`p-6 rounded-xl border transition-all ${
      isComingSoon
        ? 'border-dashed border-[var(--color-rule)] bg-[var(--color-paper-alt)]/60'
        : 'bg-white border-[var(--color-rule)] group-hover:border-[var(--color-primary)]/30 group-hover:shadow-md'
    }`}>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className={`small-caps text-[11px] font-semibold px-2.5 py-1 rounded-md ${color.bg} ${color.text}`}>
          {article.category}
        </span>
        <span className={`text-xs ${isComingSoon ? 'text-[var(--color-accent)] font-semibold' : 'text-slate-400'}`}>
          {article.date}
        </span>
        {article.readTime && <span className="text-xs text-slate-400">{article.readTime}</span>}
      </div>

      <h3
        className={`font-display text-xl sm:text-2xl leading-snug transition-colors ${
          isComingSoon
            ? 'text-slate-400 italic'
            : 'text-[var(--color-ink)] group-hover:text-[var(--color-primary)]'
        }`}
      >
        {article.title}
      </h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
        {article.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4">
        {article.tags.map((tag, i) => (
          <span key={tag} className="text-[11px] small-caps text-slate-500 inline-flex items-center gap-2">
            {i > 0 && <span className="text-slate-300">·</span>}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (isComingSoon) {
    return content;
  }

  return (
    <Link to={`/articles/${article.slug}`} className="group block">
      {content}
    </Link>
  );
}

export default function ArticlesPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryOptions: string[] = useMemo(
    () => ['All', ...topics.map((t) => t.name)],
    []
  );

  const filteredArticles = sortedArticles.filter((article) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      article.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24">
      <section className="bg-[var(--color-primary)] pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-tight mb-4">
            Articles &amp; Handouts
          </h1>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            Handouts on olympiad techniques, competition strategy, and the
            underlying mathematics.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="pt-10 pb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[var(--color-rule)] rounded-lg focus:border-[var(--color-primary)] outline-none text-sm placeholder:text-slate-400 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`small-caps px-3 py-1.5 rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-white font-semibold'
                    : 'bg-white border border-[var(--color-rule)] text-slate-500 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-4">
          {filteredArticles.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-slate-500 text-sm py-10 text-center">
            No articles match that search.
          </p>
        )}
      </div>
    </div>
  );
}

