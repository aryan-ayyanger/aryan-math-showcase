import { motion } from 'framer-motion';
import { Trophy, GraduationCap } from 'lucide-react';
import { achievements, Achievement } from '../data/achievements';
import { topics, MathTopic } from '../data/topics';

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

interface AchievementCardProps {
  achievement: Achievement;
}

function AchievementCard({ achievement }: AchievementCardProps): JSX.Element {
  const IconComponent = achievement.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      className="group relative p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} text-white shrink-0`}>
          <IconComponent size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {achievement.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

interface TopicCardProps {
  topic: MathTopic;
}

function TopicCard({ topic }: TopicCardProps): JSX.Element {
  const IconComponent = topic.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
    >
      <div className="inline-flex p-4 bg-white/20 rounded-xl mb-4">
        <IconComponent size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{topic.name}</h3>
      <p className="text-white/70 text-sm">{topic.description}</p>
    </motion.div>
  );
}

export default function AchievementsPage(): JSX.Element {
  return (
    <div className="min-h-screen pt-16">
      {/* Achievements Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                <Trophy size={16} />
                Recognition
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Achievements & Awards</h1>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Milestones from my journey in competitive mathematics and STEM
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.title} achievement={achievement} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Math Topics Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl font-bold text-white">∑</div>
          <div className="absolute top-20 right-20 text-6xl font-bold text-white">π</div>
          <div className="absolute bottom-10 left-1/4 text-7xl font-bold text-white">∫</div>
          <div className="absolute bottom-20 right-1/3 text-5xl font-bold text-white">√</div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                <GraduationCap size={16} />
                AMC/AIME Focus
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Math Topics</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Core areas of focus in competitive mathematics
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {topics.map((topic) => (
                <TopicCard key={topic.name} topic={topic} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
