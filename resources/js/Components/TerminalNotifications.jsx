import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalNotifications({ logs }) {
    return (
        <div className="fixed top-12 right-4 z-[70] flex flex-col gap-2 pointer-events-none max-w-xs w-full">
            <AnimatePresence mode="popLayout">
                {logs.map((log) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="bg-terminal-bg/90 border-r-2 border-terminal-primary border border-terminal-muted p-3 backdrop-blur-md shadow-lg shadow-black"
                    >
                        <div className="flex items-start gap-2">
                            <span className="text-terminal-primary font-bold">{'>'}</span>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-500 leading-none mb-1">[{log.timestamp}] {log.type}</span>
                                <span className="text-[11px] font-mono text-terminal-secondary leading-tight uppercase tracking-tighter">
                                    {log.message}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
