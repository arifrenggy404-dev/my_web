import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';
import { MessageSquare, Globe, Mail, ChevronRight } from 'lucide-react';

const IkonGithub = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IkonLinkedin = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Kontak() {
    const contacts = [
        { name: 'GitHub', icon: IkonGithub, url: 'https://github.com/arifrenggy00', label: '@arifrenggy00', color: 'hover:text-white' },
        { name: 'LinkedIn', icon: IkonLinkedin, url: '#', label: 'Arif Renggy', color: 'hover:text-terminal-primary' },
        { name: 'WhatsApp', icon: MessageSquare, url: '#', label: 'MISI_LANGSUNG', color: 'hover:text-terminal-warning' },
        { name: 'Email', icon: Mail, url: 'mailto:arifrenggy404@gmail.com', label: 'arifrenggy404@gmail.com', color: 'hover:text-terminal-accent' },
        { name: 'Website', icon: Globe, url: 'https://portofolio-cyberpunk-production.up.railway.app', label: 'PORT_PROD_V1', color: 'hover:text-terminal-primary' }
    ];

    return (
        <ArsipLayout>
            <Head>
                <title>Saluran Komunikasi</title>
                <meta name="description" content="Hubungi Arif Renggy melalui berbagai saluran komunikasi terenkripsi seperti Email, GitHub, WhatsApp, dan LinkedIn." />
                <meta name="keywords" content="Kontak web developer, Email Arif Renggy, GitHub Arif Renggy, Hubungi developer" />
            </Head>
            <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Saluran Terenkripsi</h2>
                    <span className="text-[10px] text-gray-600 font-mono">SINYAL: KUAT</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {contacts.map(link => (
                        <a 
                            key={link.name}
                            href={link.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 border border-gray-800 bg-[#1a1a1c]/20 hover:border-terminal-primary hover:bg-terminal-primary/5 group transition-all relative overflow-hidden"
                        >
                            {/* Efek Hover Background */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-terminal-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                            
                            <div className="flex items-center gap-5 relative z-10">
                                <div className={`p-2 border border-gray-800 bg-black group-hover:border-terminal-primary/50 transition-colors ${link.color}`}>
                                    <link.icon size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="font-mono text-xs text-gray-500 uppercase tracking-tighter group-hover:text-gray-300">HUBUNGKAN_MELALUI</span>
                                    <div className="font-mono text-sm font-black uppercase tracking-tight group-hover:text-terminal-primary">{link.name}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-xs text-gray-600 font-mono tracking-tighter group-hover:text-terminal-warning">{link.label}</span>
                                <ChevronRight size={14} className="text-gray-800 group-hover:text-terminal-primary transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
                
                <div className="mt-12 p-6 border border-gray-800 bg-black/40 font-mono relative">
                    <div className="text-[10px] text-terminal-accent mb-4 uppercase tracking-widest text-neon-pink">// CATATAN_PENGEMBANG:</div>
                    <div className="text-xs text-gray-400 leading-relaxed space-y-2">
                        <p>Pesan yang dikirim melalui saluran ini akan diproses melalui pipeline enkripsi asimetris.</p>
                        <p>Waktu respons rata-rata: <span className="text-terminal-primary">12-24 Jam Standar Sektor</span>.</p>
                    </div>
                </div>
            </div>
        </ArsipLayout>
    );
}
