import { cn } from '../../utils/cn.js';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  converted: 'bg-zoo-500/20 text-zoo-400 border-zoo-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
  planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-zoo-500/20 text-zoo-400 border-zoo-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

interface BadgeProps {
  children: React.ReactNode;
  status?: string;
  className?: string;
}

export function Badge({ children, status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        status ? statusColors[status] || 'bg-dark-700 text-dark-300 border-dark-600' : 'bg-dark-700 text-dark-300 border-dark-600',
        className
      )}
    >
      {children}
    </span>
  );
}
