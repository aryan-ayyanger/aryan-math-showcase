import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Badge from './Badge';

interface SectionTitleProps {
  badge: string;
  badgeIcon: LucideIcon;
  badgeVariant?: 'blue' | 'purple' | 'amber' | 'green' | 'white';
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function SectionTitle({
  badge,
  badgeIcon,
  badgeVariant = 'blue',
  title,
  description,
  titleColor = 'text-slate-900',
  descriptionColor = 'text-slate-500'
}: SectionTitleProps): JSX.Element {
  return (
    <motion.div variants={fadeInUp} className="text-center mb-12">
      <Badge icon={badgeIcon} variant={badgeVariant}>
        {badge}
      </Badge>
      <h2 className={`text-4xl font-bold ${titleColor} mb-4`}>{title}</h2>
      <p className={`${descriptionColor} max-w-2xl mx-auto`}>{description}</p>
    </motion.div>
  );
}
