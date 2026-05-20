import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'amber' | 'green' | 'white';
}

const variantClasses = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-green-100 text-green-700',
  white: 'bg-white/20 text-white'
};

export default function Badge({ icon: Icon, children, variant = 'blue' }: BadgeProps): JSX.Element {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${variantClasses[variant]}`}>
      {Icon && <Icon size={16} />}
      {children}
    </span>
  );
}
