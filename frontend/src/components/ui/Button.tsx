import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-zoo-500 text-white hover:bg-zoo-600 focus:ring-zoo-500 shadow-lg shadow-zoo-500/25',
        secondary: 'bg-dark-700 text-dark-100 hover:bg-dark-600 focus:ring-dark-500 border border-dark-600',
        outline: 'border-2 border-zoo-500 text-zoo-400 hover:bg-zoo-500/10 focus:ring-zoo-500',
        ghost: 'text-dark-300 hover:text-white hover:bg-dark-700 focus:ring-dark-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
