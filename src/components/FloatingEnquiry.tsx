import React, { useState } from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from './EnquiryModal';
import { cn } from '../lib/utils';

interface FloatingEnquiryProps {
    className?: string;
}

export default function FloatingEnquiry({ className }: FloatingEnquiryProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Floating Tab */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ x: -10 }}
                className={cn(
                    "fixed right-0 top-[60%] -translate-y-1/2 z-[90] hidden md:block",
                    className
                )}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white font-black py-4 px-6 rounded-l-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.3)] flex items-center gap-4 group transition-all hover:bg-accent border-l-4 border-accent"
                >
                    <div className="bg-accent text-white p-2 rounded-lg group-hover:bg-white group-hover:text-primary transition-colors">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="whitespace-nowrap tracking-tight">Quick Enquiry</span>
                </button>
            </motion.div>

            {/* Mobile Floating FAB */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-6 z-[90] md:hidden"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-accent text-white w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(204,18,23,0.4)] flex items-center justify-center border-2 border-white/20 active:bg-primary transition-colors"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            </motion.div>

            <EnquiryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
