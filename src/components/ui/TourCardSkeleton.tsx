import { motion } from 'framer-motion';

export default function TourCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100/80 flex flex-col h-full"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-shimmer bg-[length:200%_100%]" />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-4 h-4 rounded bg-slate-100 animate-pulse" />
          ))}
        </div>
        <div className="h-6 w-3/4 bg-slate-100 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-end">
          <div>
            <div className="h-3 w-20 bg-slate-100 rounded animate-pulse mb-2" />
            <div className="h-7 w-24 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 w-28 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
