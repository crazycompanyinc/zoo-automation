import { cn } from '../../utils/cn.js';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className, id }: CardProps) {
  return (
    <div id={id} className={cn('bg-dark-800 border border-dark-700 rounded-xl p-6', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn('text-xl font-bold text-white', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={cn('text-dark-400 mt-1', className)}>{children}</p>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('', className)}>{children}</div>;
}
