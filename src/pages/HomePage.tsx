import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
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

export default function HomePage(): JSX.Element {
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
            A growing collection of mathematical insights, olympiad strategies, guided problem-solving frameworks,
            and student-friendly resources designed for learners who are serious about competitive mathematics.
            It covers core olympiad topics from algebraic number theory and inequalities to intermediate combinatorics,
            functional equations, and geometry through clear notes and worked solutions.
          </motion.p>

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
        </motion.div>
      </div>
    </div>
  );
}
