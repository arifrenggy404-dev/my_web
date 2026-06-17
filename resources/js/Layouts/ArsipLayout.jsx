import React from 'react';
import { Link } from '@inertiajs/react';
import { Terminal, Cpu, Layers, ShieldAlert, Zap, MessageSquare } from 'lucide-react';

export default function ArsipLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-gray-100 p-4 md:p-8 overflow-hidden relative font-mono">
            <div className="absolute inset-0 scanline pointer-events-none opacity-10 z-50"></div>
            
            <header className="max-w-7xl mx-auto border-b border-[#00f0ff]/30 pb-4 mb-8 flex justify-between items-center relative z-10">
                <div>
                    <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-xs uppercase">
                        <Terminal size={14} /> <span>Sistem Aktif</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase text-neon-cyan">ARIF RENGGY</h1>
                </div>
                <div className="text-right font-mono text-[10px] text-[#ff007f] text-neon-pink">
                    STATUS: AKSES DIIZINKAN
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <nav className="space-y-2">
                    <div className="text-[#fee715] text-[10px] font-mono mb-4 uppercase tracking-widest opacity-50">Folder Arsip</div>
                    {[
                        { href: '/identitas', label: 'IDENTITAS', icon: Cpu },
                        { href: '/misi', label: 'MISI', icon: Layers },
                        { href: '/arsenal', label: 'ARSENAL', icon: Zap },
                        { href: '/jalur-komunikasi', label: 'KOMUNIKASI', icon: MessageSquare }
                    ].map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center gap-3 p-3 border border-gray-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all group ${window.location.pathname === item.href ? 'border-[#00f0ff] bg-[#00f0ff]/10' : ''}`}
                        >
                            <item.icon size={16} className="group-hover:text-[#00f0ff]" />
                            <span className="font-mono text-xs tracking-widest">/{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <main className="md:col-span-3 border border-gray-800 p-6 relative bg-[#121214]/50 backdrop-blur-sm">
                    {/* Efek Sudut Cyberpunk */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-[#ff007f] clip-path-polygon"></div>
                    {children}
                </main>
            </div>
        </div>
    );
}
