import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Identitas() {
    return (
        <ArsipLayout>
            <Head>
                <title>Identitas Core</title>
                <meta name="description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
                <meta name="keywords" content="Arif Renggy, Laravel, React, Fullstack Developer, Indonesia, Cyberpunk UI" />
            </Head>
             <div className="space-y-6">
                <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Arsip Identitas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                    <div className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">IDENTITAS_INTI</div>
                        <div className="text-white">Arif Renggy</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">PERAN</div>
                        <div className="text-white">Fullstack Developer</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors border-l-2 border-l-terminal-primary">
                        <div className="text-gray-500 mb-1 text-[10px]">SPESIALISASI</div>
                        <div className="text-terminal-primary font-bold">Laravel Expert</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">WILAYAH</div>
                        <div className="text-white">Indonesia</div>
                    </div>
                </div>
                <div className="relative p-6 border border-gray-800 bg-[#1a1a1c]/30">
                     <div className="absolute top-0 left-0 w-1 h-full bg-terminal-warning"></div>
                     <p className="text-gray-400 text-sm leading-relaxed italic">
                        "Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel."
                    </p>
                </div>
            </div>
        </ArsipLayout>
    );
}
