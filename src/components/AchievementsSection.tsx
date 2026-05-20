import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { achievements, Achievement } from '../data/achievements';
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

export default function AchievementsSection(): JSX.Element {
  return (
    <section id="achievements" className="min-h-screen py-24 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <SectionTitle
            badge="Recognition"
            badgeIcon={Trophy}
            badgeVariant="amber"
            title="Achievements & Awards"
            description="Milestones from my journey in competitive mathematics and STEM"
          />

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.title} achievement={achievement} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
