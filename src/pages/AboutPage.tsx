import { motion } from 'framer-motion';
import { MapPin, Mail, Linkedin, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';

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

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <MapPin size={18} />
              <span>{profile.location}</span>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={28} />
              About Me
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              I'm Aryan Ayyanger, a high school student deeply passionate about competitive mathematics
              and its applications in solving real-world problems. Beyond competitions, I use mathematical
              modeling and data analysis to tackle meaningful challenges in science and engineering.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Competitively, I'm a 2× AIME Qualifier, 2× MathCON Finalist, Genius Olympiad Science Fair
              Finalist, and have placed 2nd at both the Texas A&M Math Contest (Power Team) and the
              University of Houston Physics Contest, among other state-level awards.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Let's Connect</h2>
            <p className="text-slate-500 mb-6">
              Interested in discussing math, research collaborations, or just want to say hi?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Mail size={20} />
                Email Me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
