import React, { useState, useEffect } from 'react';

export default function TerminalStatusBar() {
    const [time, setTime] = useState(new Date());
    const [sessionTime, setSessionTime] = useState(0);
    const [ping, setPing] = useState(32);

    useEffect(() => {
        // Clock & Session Timer
        const start = sessionStorage.getItem('sessionStartTime') || Date.now();
        if (!sessionStorage.getItem('sessionStartTime')) {
            sessionStorage.setItem('sessionStartTime', start);
        }

        const timer = setInterval(() => {
            setTime(new Date());
            setSessionTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);

        // Ping Simulation
        const pingInterval = setInterval(() => {
            setPing(prev => {
                const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
                return Math.max(15, Math.min(120, prev + change));
            });
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(pingInterval);
        };
    }, []);

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const getPingColor = (p) => {
        if (p < 50) return 'text-green-500';
        if (p < 100) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-terminal-bg border-b border-terminal-primary/30 z-[60] flex justify-between items-center px-4 font-mono text-[10px] uppercase tracking-wider select-none">
            {/* Left: Temporal */}
            <div className="flex gap-4">
                <span className="text-terminal-secondary">[ {time.toLocaleTimeString()} ]</span>
                <span className="text-gray-500">SESSION: <span className="text-terminal-primary">{formatDuration(sessionTime)}</span></span>
            </div>

            {/* Center: Security */}
            <div className="hidden md:flex gap-4 items-center animate-pulse opacity-80">
                <span className="text-terminal-primary">// SEC_STATUS: ENCRYPTED</span>
                <span className="text-terminal-primary">// FW: ACTIVE</span>
            </div>

            {/* Right: Network */}
            <div className="flex items-center gap-2">
                <span className="text-gray-500">PING: <span className={getPingColor(ping)}>{ping}ms</span></span>
                <div className={`w-1.5 h-1.5 rounded-full ${ping < 100 ? 'bg-terminal-primary animate-pulse' : 'bg-red-500'}`}></div>
            </div>
        </div>
    );
}
