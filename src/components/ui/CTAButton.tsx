import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function CTAButton({
  children,
  variant = 'primary',
  href,
  onClick,
  icon: Icon,
  showArrow = true,
  className,
  size = 'md',
  fullWidth,
  disabled,
}: CTAButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-300',
    'active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    fullWidth && 'w-full'
  );

  const variants = {
    primary: 'bg-accent text-white shadow-accent-premium hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5',
    secondary: 'bg-primary text-white shadow-premium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-white/60 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary',
    ghost: 'bg-slate-100 text-primary hover:bg-slate-200 hover:text-accent',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm min-h-[44px]',
    md: 'px-6 py-3.5 text-sm min-h-[48px] sm:min-h-[52px]',
    lg: 'px-8 py-4 text-base min-h-[52px] sm:min-h-[56px]',
  };

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
      <span>{children}</span>
      {showArrow && !Icon && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform" />}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className, disabled && 'opacity-60 cursor-not-allowed');

  if (href && !disabled) {
    return (
      <Link to={href} onClick={() => window.scrollTo(0, 0)} className={cn('group', fullWidth && 'w-full')}>
        <motion.span
          whileHover={{ y: variant === 'primary' || variant === 'secondary' ? -2 : 0 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: variant === 'primary' || variant === 'secondary' ? -2 : 0 }}
      whileTap={{ scale: 0.98 }}
      className={cn(classes, 'group')}
    >
      {content}
    </motion.button>
  );
}
