import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No tours found',
  description = 'Try adjusting your filters to discover more packages.',
  actionLabel = 'Clear filters',
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 sm:py-24 px-6"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 text-center">{title}</h3>
      <p className="text-slate-500 text-center max-w-sm mb-8">{description}</p>
      {onAction && actionLabel && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="px-6 py-3 rounded-2xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
