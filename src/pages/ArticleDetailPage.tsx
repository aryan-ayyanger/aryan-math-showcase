import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Tag, User, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import { useSEO } from '../lib/seo';
import { getCategoryColor } from '../lib/categoryColors';

const SITE = 'https://www.aryanayyanger.com';

export default function ArticleDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const notFound = !article;
  const isComingSoon = article?.comingSoon ?? false;

  // useSEO must always be called — no conditional hooks.
  useSEO(
    !notFound && !isComingSoon
      ? {
          title: `${article!.title} | Aryan Ayyanger`,
          description: article!.description,
          canonical: `${SITE}/articles/${article!.slug}`,
          ogType: 'article',
          jsonLd: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: article!.title,
                description: article!.description,
                author: { '@type': 'Person', name: article!.author },
                mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/articles/${article!.slug}` },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
                  { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE}/articles` },
                  { '@type': 'ListItem', position: 3, name: article!.title, item: `${SITE}/articles/${article!.slug}` },
                ],
              },
            ],
          }),
        }
      : { title: notFound ? 'Article Not Found | Aryan Ayyanger' : 'Articles | Aryan Ayyanger' }
  );

  if (isComingSoon) return <Navigate to="/articles" replace />;

  if (notFound) {
    return (
      <div className="pt-24 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-display text-6xl text-slate-300 mb-4">404</p>
          <h1 className="font-display text-2xl text-slate-900 mb-3">Article not found</h1>
          <p className="text-slate-500 mb-8">This article doesn&rsquo;t exist or may have moved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/articles"
              className="text-[var(--color-accent)] border-b border-[var(--color-accent)]/40 hover:border-[var(--color-accent)] transition-colors"
            >
              Browse all articles
            </Link>
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const a = article!;
  const color = getCategoryColor(a.category);
  const sameCat = articles.filter((r) => r.slug !== a.slug && !r.comingSoon && r.category === a.category);
  const related = (sameCat.length > 0
    ? sameCat
    : articles.filter((r) => r.slug !== a.slug && !r.comingSoon)
  ).slice(0, 2);

  return (
    <div className="pb-24">
      <section className="bg-[var(--color-primary)] pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-white/50 flex-wrap small-caps">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/articles" className="hover:text-white transition-colors">Articles</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80 truncate max-w-[220px]" aria-current="page">{a.category}</li>
            </ol>
          </nav>

          <span className={`small-caps text-[11px] font-semibold px-2.5 py-1 rounded-md ${color.bg} ${color.text} inline-block mb-5`}>
            {a.category}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.1] tracking-tight">
            {a.title}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <main>
          <article className="pt-12 pb-12 border-b border-[var(--color-rule)]">

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 text-xs small-caps text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <User size={12} aria-hidden="true" />
                {a.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag size={12} aria-hidden="true" />
                {a.date}
              </span>
              {a.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} aria-hidden="true" />
                  {a.readTime}
                </span>
              )}
            </div>

            <p className="text-xl text-slate-800 leading-[1.6] mb-10">
              {a.description}
            </p>

            {a.topics && a.topics.length > 0 && (
              <div className="mb-10 p-6 rounded-xl bg-[var(--color-paper-alt)] border border-[var(--color-rule)]">
                <h2 className="small-caps text-xs text-[var(--color-primary)] font-semibold mb-4">
                  What this guide covers
                </h2>
                <ul className="space-y-2.5">
                  {a.topics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-slate-700 leading-relaxed">
                      <span className="text-[var(--color-accent)] shrink-0" aria-hidden="true">&mdash;</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-10">
              {a.tags.map((tag, i) => (
                <span key={tag} className="text-[11px] small-caps text-slate-500 inline-flex items-center gap-3">
                  {i > 0 && <span className="text-slate-300">·</span>}
                  {tag}
                </span>
              ))}
            </div>

            {a.pdfPath && (
              <a
                href={a.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-medium rounded-lg hover:bg-[var(--color-accent-soft)] transition-colors"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Read the handout (PDF)
              </a>
            )}
          </article>

          {related.length > 0 && (
            <div className="pt-12 pb-10 border-b border-[var(--color-rule)]">
              <h2 className="small-caps text-xs text-[var(--color-primary)] font-semibold mb-6">Related</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => {
                  const rColor = getCategoryColor(r.category);
                  return (
                    <Link
                      key={r.slug}
                      to={`/articles/${r.slug}`}
                      className="group block p-5 rounded-xl bg-white border border-[var(--color-rule)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all"
                    >
                      <span className={`small-caps text-[10px] font-semibold px-2 py-0.5 rounded ${rColor.bg} ${rColor.text}`}>
                        {r.category}
                      </span>
                      <p className="font-display text-lg text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mt-2">
                        {r.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to articles
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

