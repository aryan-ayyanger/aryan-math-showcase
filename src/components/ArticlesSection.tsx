import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Search, ArrowRight } from 'lucide-react';
import { articles, Article } from '../data/articles';
import SectionTitle from './SectionTitle';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps): JSX.Element {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -5 }}
      className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-slate-400">{article.date}</span>
        <span className="text-sm text-slate-500">{article.readTime}</span>
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      
      <p className="text-slate-500 mb-4 line-clamp-2">
        {article.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link
        to={`/articles/${article.slug}`}
        className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all"
      >
        Read Article
        <ArrowRight size={16} />
      </Link>
    </motion.article>
  );
}

export default function ArticlesSection(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags: string[] = ['All', ...new Set(articles.flatMap(a => a.tags))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <section id="articles" className="min-h-screen py-24 bg-gradient-to-b from-white to-slate-50 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <SectionTitle
            badge="Article Library"
            badgeIcon={FileText}
            badgeVariant="blue"
            title="Math Articles & Notes"
            description="Deep dives into olympiad techniques, competition strategies, and mathematical concepts"
          />

          {/* Search and Filter */}
          <motion.div variants={fadeInUp} className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredArticles.map((article) => (
              <ArticleCard key={article.title} article={article} />
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-500">No articles found matching your search.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
