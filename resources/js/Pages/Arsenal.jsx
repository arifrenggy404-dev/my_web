import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Arsenal() {
    const skills = [
        { name: 'Laravel', level: 95, color: '#ff007f', isCore: true, desc: 'Mesin utama untuk backend berkinerja tinggi.' },
        { name: 'React', level: 85, color: '#00f0ff', desc: 'Antarmuka reaktif dan dinamis.' },
        { name: 'Tailwind CSS', level: 90, color: '#00f0ff', desc: 'Sistem desain utilitas atomik.' },
        { name: 'Docker', level: 75, color: '#fee715', desc: 'Kontainerisasi infrastruktur.' },
        { name: 'SQLite', level: 80, color: '#fee715', desc: 'Penyimpanan data lokal yang persisten.' },
        { name: 'Inertia.js', level: 88, color: '#00f0ff', desc: 'Penghubung mulus antara Laravel dan React.' }
    ];

    return (
        <ArsipLayout>
            <Head>
                <title>Pusat Arsenal</title>
                <meta name="description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
                <meta name="keywords" content="Tech stack, Laravel skill, React skill, PHP, JavaScript, Docker, Tailwind" />
            </Head>
            <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h2 className="text-[#ff007f] font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Pusat Teknologi</h2>
                    <span className="text-[10px] text-gray-600 font-mono">STATUS_ALUTSISTA: OPTIMAL</span>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {skills.map(s => (
                        <div key={s.name} className={`p-5 border transition-all ${s.isCore ? "border-[#ff007f]/40 bg-[#ff007f]/5 shadow-[0_0_15px_rgba(255,0,127,0.1)]" : "border-gray-800 bg-[#1a1a1c]/20 hover:border-gray-700"}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono uppercase tracking-tighter ${s.isCore ? 'text-[#ff007f] font-black text-xl text-neon-pink' : 'text-gray-200 font-bold'}`}>
                                            {s.name}
                                        </span>
                                        {s.isCore && (
                                            <span className="text-[8px] bg-[#ff007f] text-black px-1.5 py-0.5 font-black uppercase leading-none">CORE_ENGINE</span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-mono italic">{s.desc}</div>
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
                                        backgroundColor: s.color,
                                        color: s.color 
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                
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
