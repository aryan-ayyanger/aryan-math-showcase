import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, User, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import { useSEO } from '../lib/seo';

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
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-6xl font-bold text-slate-200 mb-4">404</p>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Article Not Found</h1>
            <p className="text-slate-500 mb-8">This article doesn't exist or may have moved.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Browse All Articles
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors text-sm font-medium"
              >
                Go Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const a = article!;
  const sameCat = articles.filter((r) => r.slug !== a.slug && !r.comingSoon && r.category === a.category);
  const related = (sameCat.length > 0
    ? sameCat
    : articles.filter((r) => r.slug !== a.slug && !r.comingSoon)
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-slate-400 flex-wrap">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/articles" className="hover:text-blue-600 transition-colors">Articles</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-600 font-medium truncate max-w-[220px]" aria-current="page">{a.title}</li>
            </ol>
          </nav>

          <main>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10 mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Tag size={14} aria-hidden="true" />
                  {a.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} aria-hidden="true" />
                  {a.author}
                </span>
                {a.readTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden="true" />
                    {a.readTime}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {a.title}
              </h1>

              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {a.description}
              </p>

              {a.topics && a.topics.length > 0 && (
                <div className="mb-8 p-5 bg-slate-50 rounded-2xl">
                  <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                    What this guide covers
                  </h2>
                  <ul className="space-y-2">
                    {a.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2.5 text-slate-600 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-10">
                {a.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {a.pdfPath && (
                <a
                  href={a.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                  Read &#8220;{a.title}&#8221; (PDF)
                </a>
              )}
            </div>

            {related.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Related Articles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/articles/${r.slug}`}
                      className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <p className="text-xs text-slate-400 mb-1">{r.category}</p>
                      <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors text-sm leading-snug">
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Articles
            </Link>
          </main>
        </motion.div>
      </div>
    </div>
  );
}

