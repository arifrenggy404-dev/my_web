import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Identitas({ profil }) {
    const activeProfil = profil || {
        nama_lengkap: 'Arif Renggy',
        peran: 'Fullstack Developer',
        spesialisasi: 'Laravel Expert',
        wilayah: 'Indonesia',
        kutipan: 'Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel.'
    };

    return (
        <ArsipLayout>
            <Head>
                <title>Identitas Core | Arif Renggy - Fullstack Developer</title>
                <meta name="description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
                <meta name="keywords" content="Arif Renggy, Laravel, React, Fullstack Developer, Indonesia, Cyberpunk UI" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arifrenggy.site/identitas" />
                <meta property="og:title" content="Identitas Core | Arif Renggy - Fullstack Developer" />
                <meta property="og:description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
                <meta property="og:site_name" content="Arif Renggy Portfolio" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://arifrenggy.site/identitas" />
                <meta name="twitter:title" content="Identitas Core | Arif Renggy - Fullstack Developer" />
                <meta name="twitter:description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
            </Head>
            <div className="space-y-6">
                <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Arsip Identitas</h2>
                <ul className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">IDENTITAS_INTI</div>
                        <div className="text-white">{activeProfil.nama_lengkap}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">PERAN</div>
                        <div className="text-white">{activeProfil.peran}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors border-l-2 border-l-terminal-primary">
                        <div className="text-gray-500 mb-1 text-[10px]">SPESIALISASI</div>
                        <div className="text-terminal-primary font-bold">{activeProfil.spesialisasi}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">WILAYAH</div>
                        <div className="text-white">{activeProfil.wilayah}</div>
                    </li>
                </ul>
                <div className="relative p-6 border border-gray-800 bg-[#1a1a1c]/30">
                     <div className="absolute top-0 left-0 w-1 h-full bg-terminal-warning"></div>
                     <p className="text-gray-400 text-sm leading-relaxed italic">
                        "{activeProfil.kutipan}"
                     </p>
                </div>
            </div>
        </ArsipLayout>
    );
}
