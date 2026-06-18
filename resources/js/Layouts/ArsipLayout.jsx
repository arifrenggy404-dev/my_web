import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Terminal, Cpu, Layers, Zap, MessageSquare } from 'lucide-react';
import AsciiHeader from '../Components/AsciiHeader';
import SystemLogs from '../Components/SystemLogs';
import TerminalStatusBar from '../Components/TerminalStatusBar';
import TerminalNotifications from '../Components/TerminalNotifications';

export default function ArsipLayout({ children }) {
    const [logs, setLogs] = useState([]);

    const addLog = (message, type = 'SYS') => {
        const id = Math.random().toString(36).substr(2, 9);
        const newLog = {
            id,
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        };
        setLogs(prev => [...prev, newLog]);
        setTimeout(() => {
            setLogs(prev => prev.filter(l => l.id !== id));
        }, 4000);
    };

    useEffect(() => {
        // Initial Logs
        setTimeout(() => addLog('KERNEL_LOADED_V4.0', 'SYS'), 500);
        setTimeout(() => addLog('SECURE_HANDSHAKE_COMPLETE', 'SEC'), 1200);

        // Inertia Navigation Logs
        const startListener = router.on('start', (event) => {
            addLog(`FETCHING_NODE: ${event.detail.visit.url.pathname}`, 'INFO');
        });

        const finishListener = router.on('finish', () => {
            addLog('DOM_UPDATED_READY', 'SYS');
        });

        return () => {
            startListener();
            finishListener();
        };
    }, []);

    const navItems = [
        { href: '/identitas', label: 'identitas', icon: Cpu },
        { href: '/misi', label: 'misi', icon: Layers },
        { href: '/arsenal', label: 'arsenal', icon: Zap },
        { href: '/jalur-komunikasi', label: 'komunikasi', icon: MessageSquare }
    ];

    return (
        <div className="min-h-screen bg-terminal-bg text-terminal-secondary pt-12 p-4 md:p-8 overflow-hidden relative font-mono selection:bg-terminal-primary selection:text-terminal-bg">
            <TerminalStatusBar />
            <TerminalNotifications logs={logs} />
            
            <div className="absolute inset-0 scanline pointer-events-none opacity-5 z-50"></div>
            
            <header className="max-w-7xl mx-auto border-b border-terminal pb-6 mb-8 flex flex-col md:flex-row justify-between items-end gap-4 relative z-10">
                <h1 className="sr-only">Arif Renggy - Portofolio Developer Laravel & React</h1>
                <AsciiHeader />
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-terminal-primary font-mono text-[10px] uppercase mb-1">
                        <span className="inline-block w-2 h-2 bg-terminal-primary rounded-full animate-pulse"></span>
                        Terminal Session: Active
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">
                        Node: arif-renggy-v4.0.1
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <aside className="space-y-6">
                    <nav className="space-y-1">
                        <div className="text-terminal-primary text-[10px] font-mono mb-2 uppercase tracking-widest opacity-50">Directory</div>
                        {navItems.map((item) => (
                            <Link 
                                key={item.href}
                                href={item.href} 
                                className={`flex items-center gap-3 p-2 border border-transparent hover:border-terminal hover:bg-terminal-primary/5 transition-all group ${window.location.pathname === item.href ? 'text-terminal-primary border-terminal bg-terminal-primary/10' : 'text-gray-400'}`}
                            >
                                <span className="text-terminal-primary opacity-50 group-hover:opacity-100">{'>'}</span>
                                <span className="font-mono text-xs tracking-wider">/home/{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                    
                    <SystemLogs />
                </aside>
                
                <main className="md:col-span-3 border border-terminal p-6 relative bg-terminal-muted/10 backdrop-blur-sm min-h-[500px]">
                    {/* Decorative Terminal Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-terminal-primary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-terminal-primary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-terminal-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-terminal-primary"></div>
                    
                    {children}
                </main>
            </div>
        </div>
    );
}
