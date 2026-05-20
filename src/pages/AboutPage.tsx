import { motion } from 'framer-motion';
import { MapPin, Mail, Linkedin, GraduationCap, Target, Trophy } from 'lucide-react';
import { profile } from '../data/profile';
import { achievements, Achievement } from '../data/achievements';

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

interface AchievementCardProps {
  achievement: Achievement;
}

function AchievementCard({ achievement }: AchievementCardProps): JSX.Element {
  const IconComponent = achievement.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      className="group relative p-5 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${achievement.color} text-white shrink-0`}>
          <IconComponent size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
            {achievement.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

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
            <p className="text-slate-600 leading-relaxed mb-6">
              I'm Aryan Ayyanger, a high school student deeply passionate about competitive mathematics 
              and its powerful applications in solving real-world problems. My journey through math 
              competitions—from AMC to qualifying for AIME twice—has shaped my analytical thinking 
              and problem-solving approach.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Beyond competitions, I explore how mathematical modeling and data analysis can address 
              meaningful challenges across science and engineering. Through research projects and 
              scientific fairs, I've applied optimization techniques and algorithmic thinking to 
              create tangible impact in various domains.
            </p>
          </motion.div>

          {/* What Drives Me */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Target className="text-purple-600" size={28} />
              What Drives Me
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-2">Problem Solving</h3>
                <p className="text-slate-600 text-sm">
                  The thrill of tackling challenging olympiad problems and discovering elegant solutions.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-2">Research Impact</h3>
                <p className="text-slate-600 text-sm">
                  Using mathematics to create tangible solutions for real-world challenges.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-2">Knowledge Sharing</h3>
                <p className="text-slate-600 text-sm">
                  Writing articles and notes to help fellow math enthusiasts on their competition journey.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <h3 className="font-semibold text-slate-900 mb-2">Continuous Learning</h3>
                <p className="text-slate-600 text-sm">
                  Exploring new mathematical concepts and their connections to engineering and science.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Trophy className="text-amber-500" size={28} />
              Achievements & Awards
            </h2>
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 gap-3"
            >
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.title} achievement={achievement} />
              ))}
            </motion.div>
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
