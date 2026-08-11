import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ExternalLink, Tag, User, Calendar } from 'lucide-react';
import { articles } from '../data/articles';
import { useSEO } from '../lib/seo';

const SITE = 'https://www.aryanayyanger.com';

export default function ArticleDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article || article.comingSoon) {
    return <Navigate to="/articles" replace />;
  }

  useSEO({
    title: `${article.title} | Aryan Ayyanger`,
    description: article.description,
    canonical: `${SITE}/articles/${article.slug}`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Tag size={14} />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User size={14} />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {article.date}
              </span>
              {article.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={14} />
                  {article.readTime}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {article.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {article.pdfPath && (
              <a
                href={article.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <ExternalLink size={18} />
                View Full Article (PDF)
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
