import { motion } from 'framer-motion';
import { BookOpen, Rocket, Trophy, FileText, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

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

export default function HomePage(): JSX.Element {
  const quickLinks = [
    { to: '/articles', label: 'Articles', icon: FileText, description: 'Math notes & olympiad techniques', color: 'from-blue-500 to-cyan-500' },
    { to: '/projects', label: 'Projects', icon: Rocket, description: 'Research & engineering work', color: 'from-purple-500 to-pink-500' },
    { to: '/achievements', label: 'Achievements', icon: Trophy, description: 'Awards & recognitions', color: 'from-amber-500 to-orange-500' },
    { to: '/about', label: 'About Me', icon: User, description: 'Learn more about my journey', color: 'from-slate-600 to-slate-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Competitive Math & Research
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            Competitive Math{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Guide
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-slate-600 mb-4 font-medium"
          >
            Olympiad Problem-Solving • Mathematical Modeling • STEM Research
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A collection of mathematical insights, competition strategies, research projects, 
            and resources for students passionate about competitive mathematics and its real-world applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <BookOpen size={20} />
              Explore Articles
            </Link>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickLinks.map((link) => (
              <motion.div key={link.to} variants={scaleIn}>
                <Link
                  to={link.to}
                  className="group block p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.color} text-white mb-4`}>
                    <link.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
