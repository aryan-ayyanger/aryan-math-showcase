import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, GraduationCap } from 'lucide-react';
import { articles, Article } from '../data/articles';
import { topics, MathTopic } from '../data/topics';

const countApiNamespace = 'aryan-ayyanger-math-showcase';
const countedArticleViewsSessionKey = 'aa_article_views_counted_session';
const articleViewCooldownKey = 'aa_article_view_last_hit_at';
const articleViewCooldownMs = 24 * 60 * 60 * 1000;

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

interface TopicCardProps {
  topic: MathTopic;
}

function TopicCard({ topic }: TopicCardProps): JSX.Element {
  const IconComponent = topic.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3 }}
      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
    >
      <div className="inline-flex p-3 bg-white/20 rounded-lg mb-3">
        <IconComponent size={24} className="text-white" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">{topic.name}</h3>
      <p className="text-white/70 text-xs">{topic.description}</p>
    </motion.div>
  );
}

interface ArticleCardProps {
  article: Article;
  viewCount: number;
  onRead: (title: string) => Promise<void>;
}

function ArticleCard({ article, viewCount, onRead }: ArticleCardProps): JSX.Element {
  const isComingSoon = article.comingSoon;
  
  return (
    <motion.article
      variants={scaleIn}
      whileHover={isComingSoon ? {} : { y: -5 }}
      className={`group bg-white p-6 rounded-2xl border transition-all duration-300 ${
        isComingSoon 
          ? 'border-dashed border-slate-300 opacity-70' 
          : 'border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`text-sm ${isComingSoon ? 'text-blue-500 font-medium' : 'text-slate-400'}`}>
          {article.date}
        </span>
        <div className="text-right">
          {article.readTime && <span className="block text-sm text-slate-500">{article.readTime}</span>}
          {!isComingSoon && <span className="block text-xs text-slate-400">Views: {viewCount}</span>}
        </div>
      </div>
      
      <h3 className={`text-xl font-semibold mb-3 transition-colors ${
        isComingSoon ? 'text-slate-500' : 'text-slate-900 group-hover:text-blue-600'
      }`}>
        {article.title}
      </h3>
      
      <p className="text-slate-500 mb-4">
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
      
      {!isComingSoon && article.link && (
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onRead(article.title)}
          className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all"
        >
          Read Article
          <ArrowRight size={16} />
        </a>
      )}
    </motion.article>
  );
}

export default function ArticlesPage(): JSX.Element {
  const coreSubjects: string[] = ['All', 'Number Theory', 'Algebra', 'Combinatorics', 'Geometry'];
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [articleViews, setArticleViews] = useState<Record<string, number>>({});

  const getArticleCounterKey = (title: string): string =>
    `article-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  useEffect(() => {
    let isMounted = true;

    const loadGlobalViews = async (): Promise<void> => {
      try {
        const publishedArticles = articles.filter((article) => !article.comingSoon);
        const counts = await Promise.all(
          publishedArticles.map(async (article) => {
            const key = getArticleCounterKey(article.title);
            const response = await fetch(`https://api.countapi.xyz/get/${countApiNamespace}/${key}`);

            if (!response.ok) {
              return [article.title, 0] as const;
            }

            const data = (await response.json()) as { value?: number };
            return [article.title, typeof data.value === 'number' ? data.value : 0] as const;
          })
        );

        if (!isMounted) {
          return;
        }

        setArticleViews(Object.fromEntries(counts));
      } catch {
        if (isMounted) {
          setArticleViews({});
        }
      }
    };

    void loadGlobalViews();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleArticleRead = async (title: string): Promise<void> => {
    const key = getArticleCounterKey(title);

    try {
      const now = Date.now();
      const lastHitByArticle = JSON.parse(localStorage.getItem(articleViewCooldownKey) ?? '{}') as Record<string, number>;
      const lastHitAt = lastHitByArticle[key] ?? 0;

      if (now - lastHitAt < articleViewCooldownMs) {
        return;
      }

      const countedArticleViews = new Set<string>(
        JSON.parse(sessionStorage.getItem(countedArticleViewsSessionKey) ?? '[]') as string[]
      );

      if (countedArticleViews.has(key)) {
        return;
      }

      countedArticleViews.add(key);
      sessionStorage.setItem(countedArticleViewsSessionKey, JSON.stringify(Array.from(countedArticleViews)));

      const response = await fetch(`https://api.countapi.xyz/hit/${countApiNamespace}/${key}`);

      if (!response.ok) {
        throw new Error('Failed to increment article view count');
      }

      const data = (await response.json()) as { value?: number };
      if (typeof data.value === 'number') {
        setArticleViews((prev) => ({
          ...prev,
          [title]: data.value as number
        }));
      }

      const nextLastHitByArticle = {
        ...lastHitByArticle,
        [key]: now
      };
      localStorage.setItem(articleViewCooldownKey, JSON.stringify(nextLastHitByArticle));
    } catch {
      // Ignore remote counter failures to avoid displaying misleading increments.
    }
  };

  const filteredArticles: Article[] = selectedSubject === 'All'
    ? articles
    : articles.filter((article) => article.tags.includes(selectedSubject));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <FileText size={16} />
              Article Library
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Math Articles & Notes</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Deep dives into olympiad techniques, competition strategies, and mathematical concepts
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {coreSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    selectedSubject === subject
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {subject}
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
              <ArticleCard
                key={article.title}
                article={article}
                viewCount={articleViews[article.title] ?? 0}
                onRead={handleArticleRead}
              />
            ))}
          </motion.div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-slate-500">No articles yet in {selectedSubject}.</p>
            </motion.div>
          )}

          {/* Math Topics */}
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl relative overflow-hidden mt-12"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-4xl font-bold text-white">∑</div>
              <div className="absolute top-8 right-8 text-3xl font-bold text-white">π</div>
              <div className="absolute bottom-4 left-1/4 text-4xl font-bold text-white">∫</div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-white" size={28} />
                <h2 className="text-2xl font-semibold text-white">Math Pillars</h2>
                <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
                  AMC/AIME Focus
                </span>
              </div>
              <motion.div
                variants={staggerContainer}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {topics.map((topic) => (
                  <TopicCard key={topic.name} topic={topic} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
