import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';
import { ExternalLink, ShieldAlert, Cpu } from 'lucide-react';

const IkonGithub = ({ size = 14, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Misi({ proyek = [] }) {
    return (
        <ArsipLayout>
            <Head>
                <title>Laporan Misi</title>
                <meta name="description" content="Arsip portofolio proyek dan misi digital yang berhasil dikerjakan oleh Arif Renggy menggunakan PHP/Laravel, React, dan database SQL." />
                <meta name="keywords" content="Proyek Web, Showcase Laravel, Aplikasi React, Portofolio PHP, Arif Renggy" />
            </Head>
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Laporan Misi</h2>
                    <span className="text-[10px] text-gray-600 font-mono">TOTAL_MISI: {proyek.length}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {proyek.map((p) => (
                        <div key={p.id} className="border border-gray-800 p-5 relative group hover:border-terminal-primary/50 transition-all bg-[#1a1a1c]/20">
                            {/* Efek Sudut Cyberpunk */}
                            <div className="absolute top-0 right-0 w-3 h-3 bg-gray-800 group-hover:bg-terminal-primary clip-path-polygon transition-colors"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Thumbnail Proyek */}
                                <div className="w-full md:w-32 h-32 flex-shrink-0 border border-gray-800 bg-black overflow-hidden relative group-hover:border-terminal-primary/30 transition-colors">
                                    {p.jalur_gambar ? (
                                        <img 
                                            src={`/storage/${p.jalur_gambar}`} 
                                            alt={p.nama_proyek} 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col justify-center items-center text-gray-700">
                                            <Cpu size={24} className="mb-1 opacity-20" />
                                            <span className="text-[8px] font-mono tracking-tighter">TIADA_VISUAL</span>
                                        </div>
                                    )}
                                </div>
 
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-terminal-primary uppercase tracking-tight text-neon-cyan">{p.nama_proyek}</h3>
                                            <div className="text-[10px] text-gray-500 font-mono">ID: MISI_{p.id.toString().padStart(3, '0')}</div>
                                        </div>
                                        <span className="text-[9px] font-mono px-2 py-0.5 border border-terminal-warning text-terminal-warning animate-pulse">
                                            TERSELESAIKAN
                                        </span>
                                    </div>
                                    
                                    <p className="text-xs text-gray-400 leading-relaxed">{p.deskripsi}</p>
                                    
                                    <div className="flex flex-wrap gap-1.5">
                                        {(p.teknologi_utama || []).map(t => (
                                            <span key={t} className="text-[9px] bg-black px-2 py-0.5 text-terminal-warning border border-terminal-warning/20 font-mono uppercase italic">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-6 pt-2 border-t border-gray-900">
                                        {p.tautan_github ? (
                                            <a 
                                                href={p.tautan_github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-[10px] font-mono text-gray-500 hover:text-white uppercase flex items-center gap-1.5 transition-colors"
                                            >
                                                <IkonGithub size={12} /> /KODE_SUMBER
                                            </a>
                                        ) : (
                                            <span className="text-[10px] font-mono text-gray-700 uppercase flex items-center gap-1.5 cursor-not-allowed">
                                                <ShieldAlert size={12} /> /DATA_PRIVAT
                                            </span>
                                        )}
                                        {p.tautan_langsung && (
                                            <a 
                                                href={p.tautan_langsung} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-[10px] font-mono text-terminal-primary hover:text-white uppercase flex items-center gap-1.5 transition-colors"
                                            >
                                                /AKSES_DEMO <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ArsipLayout>
    );
}
