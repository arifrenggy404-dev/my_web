import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Arsenal({ skills }) {
    // Mapping warna database ke CSS variables
    const getWarnaVariable = (colorName) => {
        switch (colorName) {
            case 'accent': return 'var(--color-terminal-accent)';
            case 'warning': return 'var(--color-terminal-warning)';
            default: return 'var(--color-terminal-primary)';
        }
    };

    const activeSkills = (skills && skills.length > 0) ? skills : [
        { name: 'Laravel', level: 95, warna: 'accent', apakah_core: true, deskripsi: 'Mesin utama untuk backend berkinerja tinggi.' },
        { name: 'React', level: 85, warna: 'primary', apakah_core: false, deskripsi: 'Antarmuka reaktif dan dinamis.' },
        { name: 'Tailwind CSS', level: 90, warna: 'primary', apakah_core: false, deskripsi: 'Sistem desain utilitas atomik.' },
        { name: 'Docker', level: 75, warna: 'warning', apakah_core: false, deskripsi: 'Kontainerisasi infrastruktur.' },
        { name: 'SQLite', level: 80, warna: 'warning', apakah_core: false, deskripsi: 'Penyimpanan data lokal yang persisten.' },
        { name: 'Inertia.js', level: 88, warna: 'primary', apakah_core: false, deskripsi: 'Penghubung mulus antara Laravel dan React.' }
    ];

    return (
        <ArsipLayout>
            <Head>
                <title>Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer</title>
                <meta name="description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
                <meta name="keywords" content="Tech stack, Laravel skill, React skill, PHP, JavaScript, Docker, Tailwind" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arifrenggy.site/arsenal" />
                <meta property="og:title" content="Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer" />
                <meta property="og:description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
                <meta property="og:site_name" content="Arif Renggy Portfolio" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://arifrenggy.site/arsenal" />
                <meta name="twitter:title" content="Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer" />
                <meta name="twitter:description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
            </Head>
            <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Pusat Teknologi</h2>
                    <span className="text-[10px] text-gray-600 font-mono">STATUS_ALUTSISTA: OPTIMAL</span>
                </div>
                
                <ul className="grid grid-cols-1 gap-6">
                    {activeSkills.map(s => (
                        <li key={s.nama || s.name} className={`p-5 border transition-all ${(s.apakah_core || s.isCore) ? "border-terminal-accent/40 bg-terminal-accent/5 shadow-[0_0_15px_var(--color-terminal-muted)]" : "border-gray-800 bg-[#1a1a1c]/20 hover:border-gray-700"}`}>
                            <div className="flex flex-row items-center justify-between gap-4 mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono uppercase tracking-tighter ${(s.apakah_core || s.isCore) ? 'text-terminal-accent font-black text-xl text-neon-pink' : 'text-gray-200 font-bold'}`}>
                                            {s.nama || s.name}
                                        </span>
                                        {(s.apakah_core || s.isCore) && (
                                            <span className="text-[8px] bg-terminal-accent text-black px-1.5 py-0.5 font-black uppercase leading-none">CORE_ENGINE</span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-mono italic">{s.deskripsi || s.desc}</div>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-mono text-lg font-bold text-white">{s.level}</span>
                                    <span className="font-mono text-[10px] text-gray-600">%_ENERGI</span>
                                </div>
                            </div>
                            
                            <div className="w-full h-1.5 bg-black border border-gray-900 overflow-hidden">
                                <div 
                                    className="h-full transition-all duration-[2000ms] ease-out shadow-[0_0_10px_currentColor]" 
                                    style={{ 
                                        width: `${s.level}%`, 
                                        backgroundColor: getWarnaVariable(s.warna),
                                        color: getWarnaVariable(s.warna) 
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <div className="p-4 border border-dashed border-gray-800 opacity-40 hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Analisis_Tambahan:</div>
                    <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                        Sistem arsenal terus diperbarui. Memiliki kemahiran mendalam dalam integrasi modul Laravel 13, optimalisasi database SQLite, dan pengembangan antarmuka reaktif menggunakan React 19.
                    </p>
                </div>
            </div>
        </ArsipLayout>
    );
}
