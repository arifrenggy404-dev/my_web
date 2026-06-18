import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Terminal, Cpu, Layers, Zap, MessageSquare } from 'lucide-react';
import AsciiHeader from '../Components/AsciiHeader';
import TerminalStatusBar from '../Components/TerminalStatusBar';
import TerminalNotifications from '../Components/TerminalNotifications';
import InteractiveBackground from '../Components/InteractiveBackground';
import InteractiveCli from '../Components/InteractiveCli';
import TelemetryWidget from '../Components/TelemetryWidget';

export default function ArsipLayout({ children }) {
    const [logs, setLogs] = useState([]);
    const [isCliOpen, setIsCliOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

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
        // Load theme from localStorage on mount
        const savedTheme = localStorage.getItem('terminal-theme') || 'cyber';
        const themes = {
            cyber: { primary: '#00f0ff', accent: '#ff007f', warning: '#fee715', bg: '#0a0a0c', muted: 'rgba(0, 240, 255, 0.1)' },
            matrix: { primary: '#00ff00', accent: '#008000', warning: '#adff2f', bg: '#050505', muted: 'rgba(0, 255, 0, 0.1)' },
            deus: { primary: '#fee715', accent: '#ff8c00', warning: '#ffffff', bg: '#0f0e0a', muted: 'rgba(254, 231, 21, 0.1)' },
            vapor: { primary: '#ff007f', accent: '#00f0ff', warning: '#da70d6', bg: '#0f0a1c', muted: 'rgba(255, 0, 127, 0.1)' }
        };
        const t = themes[savedTheme] || themes.cyber;
        document.documentElement.style.setProperty('--color-terminal-primary', t.primary);
        document.documentElement.style.setProperty('--color-terminal-accent', t.accent);
        document.documentElement.style.setProperty('--color-terminal-warning', t.warning);
        document.documentElement.style.setProperty('--color-terminal-bg', t.bg);
        document.documentElement.style.setProperty('--color-terminal-muted', t.muted);

        // Initial Logs
        setTimeout(() => addLog('KERNEL_LOADED_V4.0', 'SYS'), 500);
        setTimeout(() => addLog('SECURE_HANDSHAKE_COMPLETE', 'SEC'), 1200);

        // Inertia Navigation Logs
        const startListener = router.on('start', (event) => {
            setIsTransitioning(true);
            setLoadingProgress(10);
            addLog(`FETCHING_NODE: ${event.detail.visit.url.pathname}`, 'INFO');
        });

        const progressInterval = isTransitioning && setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.floor(Math.random() * 15 + 5);
            });
        }, 80);

        const finishListener = router.on('finish', () => {
            setLoadingProgress(100);
            setTimeout(() => {
                setIsTransitioning(false);
                setLoadingProgress(0);
                addLog('DOM_UPDATED_READY', 'SYS');
            }, 350); // Small delay to appreciate the CRT glitch
        });

        return () => {
            startListener();
            finishListener();
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isTransitioning]);

    const renderProgressBar = () => {
        const blocks = Math.floor(loadingProgress / 10);
        return '[' + '='.repeat(blocks) + ' '.repeat(10 - blocks) + ']';
    };

    const navItems = [
        { href: '/identitas', label: 'identitas', icon: Cpu },
        { href: '/misi', label: 'misi', icon: Layers },
        { href: '/arsenal', label: 'arsenal', icon: Zap },
        { href: '/jalur-komunikasi', label: 'komunikasi', icon: MessageSquare }
    ];

    return (
        <div className="min-h-screen bg-transparent text-terminal-secondary pt-12 p-4 md:p-8 overflow-hidden relative font-mono selection:bg-terminal-primary selection:text-terminal-bg">
            <InteractiveBackground />
            <TerminalStatusBar />
            <TerminalNotifications logs={logs} />
            
            <div className="absolute inset-0 scanline pointer-events-none opacity-5 z-50"></div>

            {/* CRT Glitch Transition Overlay */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-black/90 z-[90] flex flex-col justify-center items-center font-mono text-terminal-primary animate-crt-flicker pointer-events-auto select-none">
                    <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-terminal-primary/5 via-transparent to-terminal-primary/5 pointer-events-none"></div>
                    
                    <div className="space-y-4 text-center">
                        <div className="text-sm tracking-widest text-neon-cyan animate-pulse">
                            &gt; DECRYPTING NODE DATA...
                        </div>
                        <div className="text-xs text-gray-500">
                            STABILIZING_UPLINK: {renderProgressBar()} {loadingProgress}%
                        </div>
                    </div>
                </div>
            )}
            
            <header className="max-w-7xl mx-auto border-b border-terminal/30 pb-1 mb-8 flex flex-col items-center gap-4 relative z-10">
                <h1 className="sr-only">Arif Renggy - Portofolio Developer Laravel & React</h1>
                
                {/* Row 1: ASCII Art (Centered) */}
                <div className="w-full flex justify-center py-2">
                    <AsciiHeader />
                </div>
                
                {/* Row 2: Telemetry Widget sits directly on/above the header bottom border */}
                <TelemetryWidget />
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 relative z-10">
                <aside className="space-y-6">
                    <nav className="space-y-1">
                        <div className="text-terminal-primary text-[10px] font-mono mb-2 uppercase tracking-widest opacity-50">Directory</div>
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link 
                                        id={`sidebar-link-${item.label}`}
                                        href={item.href} 
                                        className={`flex items-center gap-3 p-2 border border-transparent hover:border-terminal hover:bg-terminal-primary/5 transition-all group ${window.location.pathname === item.href ? 'text-terminal-primary border-terminal bg-terminal-primary/10' : 'text-gray-400'}`}
                                    >
                                        <span className="text-terminal-primary opacity-50 group-hover:opacity-100">{'>'}</span>
                                        <span className="font-mono text-xs tracking-wider">/home/{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                
                <main className="col-span-3 border border-terminal p-6 relative bg-terminal-muted/10 backdrop-blur-sm min-h-[500px]">
                    {/* Decorative Terminal Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-terminal-primary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-terminal-primary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-terminal-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-terminal-primary"></div>
                    
                    {children}
                </main>
            </div>

            <button
                id="cli-trigger-btn"
                onClick={() => setIsCliOpen(true)}
                className="fixed bottom-6 right-6 w-12 h-12 bg-black border border-terminal-primary rounded-full flex items-center justify-center text-terminal-primary hover:bg-terminal-primary hover:text-black transition-all cursor-pointer z-[60] shadow-[0_0_15px_var(--color-terminal-primary)] hover:shadow-[0_0_25px_var(--color-terminal-primary)] transition-shadow duration-300 animate-pulse"
                title="Switch to CLI Mode"
                aria-label="Switch to CLI Mode"
            >
                <Terminal size={22} aria-hidden="true" />
            </button>
            <InteractiveCli isOpen={isCliOpen} onClose={() => setIsCliOpen(false)} />
        </div>
    );
}
