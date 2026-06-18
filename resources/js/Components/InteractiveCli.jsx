# Interactive CLI Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a fully interactive terminal command-line overlay with a toggle button and local API fetching for projects.

**Architecture:** Create an API route in Laravel for projects. Build an `InteractiveCli` component handling terminal rendering, custom command parsing, and a matrix screen effect. Integrate it into `ArsipLayout`.

**Tech Stack:** Laravel, React 19, Inertia.js, Tailwind CSS 4.

## Global Constraints
- Add a new route `/api/proyek` to serve project data for the CLI.
- All terminal styling should match the cyberpunk dark neon theme.

---

### Task 1: Create Projects API Endpoint

**Files:**
- Modify: `routes/web.php`

- [ ] **Step 1: Add projects JSON endpoint in web.php**

Modify [routes/web.php](file:///home/arifrenggy00/my_web/routes/web.php) to add a JSON endpoint for the projects:

```php
<?php

use Inertia\Inertia;
use App\Models\Proyek;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/identitas');

Route::get('/identitas', function () {
    return Inertia::render('Identitas');
});

Route::get('/misi', function () {
    return Inertia::render('Misi', [
        'proyek' => Proyek::all(),
    ]);
});

Route::get('/arsenal', function () {
    return Inertia::render('Arsenal');
});

Route::get('/jalur-komunikasi', function () {
    return Inertia::render('Kontak');
});

// Endpoint untuk Terminal CLI
Route::get('/api/proyek', function () {
    return response()->json(Proyek::all());
});
```

- [ ] **Step 2: Commit changes**

```bash
git add routes/web.php
git commit -m "feat: add projects API endpoint for terminal CLI"
```

---

### Task 2: Build InteractiveCli Component

**Files:**
- Create: `resources/js/Components/InteractiveCli.jsx`

**Interfaces:**
- Consumes: `/api/proyek` API
- Produces: `InteractiveCli` component

- [ ] **Step 1: Write InteractiveCli component with full command parsing and matrix effect**

Create [InteractiveCli.jsx](file:///home/arifrenggy00/my_web/resources/js/Components/InteractiveCli.jsx) with the following content:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';

export default function InteractiveCli({ isOpen, onClose }) {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [inputValue, setInputValue] = useState('');
    const [logs, setLogs] = useState([
        'ARIF-RENGGY-TERMINAL-OS [Version 4.0.1]',
        '(c) 2026 Arif Renggy. All rights reserved.',
        '',
        'Type "help" to see available commands.',
        ''
    ]);
    const [isMatrixActive, setIsMatrixActive] = useState(false);
    const [visitorId, setVisitorId] = useState('');

    const logContainerRef = useRef(null);
    const inputRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setVisitorId(Math.floor(Math.random() * 900 + 100).toString());
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs, isMatrixActive]);

    // Matrix Waterfall Screen Effect
    useEffect(() => {
        if (!isMatrixActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00f0ff';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        
        const stopMatrix = () => {
            setIsMatrixActive(false);
            clearInterval(interval);
            setLogs(prev => [...prev, 'visitor@arif-renggy:~$ matrix', 'DECRYPTION STREAM CLOSED.', '']);
        };

        const timer = setTimeout(stopMatrix, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [isMatrixActive]);

    if (!isOpen) return null;

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const input = inputValue.trim();
            if (!input) return;

            const updatedLogs = [...logs, `visitor@arif-renggy:~$ ${input}`];
            setLogs(updatedLogs);
            setHistory(prev => [...prev, input]);
            setHistoryIndex(-1);
            setInputValue('');

            // Dispatch event for sidebar system logs
            window.dispatchEvent(new CustomEvent('system-log', {
                detail: { message: `CLI_RUN: ${input.toUpperCase()}`, type: 'USER' }
            }));

            const args = input.split(/\s+/);
            const cmd = args[0].toLowerCase();

            switch (cmd) {
                case 'help':
                    setLogs(prev => [...prev,
                        'AVAILABLE COMMANDS:',
                        '  about / identitas     - Profile details & bio',
                        '  skills / arsenal      - Technical capabilities',
                        '  projects / misi       - List completed missions (from DB)',
                        '  contact / komunikasi  - Encrypted communications channels',
                        '  sysinfo / neofetch    - System specs and active info',
                        '  whoami                - Visitor identity',
                        '  date / time           - Show temporal metrics',
                        '  weather               - Cyberpunk local ambient forecast',
                        '  ping                  - Test connection latency',
                        '  matrix                - Run canvas code waterfall',
                        '  history               - History of input commands',
                        '  clear                 - Clean terminal window buffer',
                        '  exit / gui / close    - Re-engage graphical GUI',
                        ''
                    ]);
                    break;

                case 'about':
                case 'identitas':
                    setLogs(prev => [...prev,
                        '--- CORE IDENTITY PROFILE ---',
                        'NAME: Arif Renggy',
                        'ROLE: Fullstack Developer',
                        'WILAYAH: Indonesia',
                        'ENGINE: Laravel 13, React 19, Tailwind CSS 4',
                        'BIO: "Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel."',
                        ''
                    ]);
                    break;

                case 'skills':
                case 'arsenal':
                    setLogs(prev => [...prev,
                        '+-----------------------------------+',
                        '| ARSENAL CAPABILITIES              |',
                        '+-----------------------------------+',
                        '| Laravel       [================]  | 95%',
                        '| React         [==============  ]  | 85%',
                        '| Tailwind CSS  [=============== ]  | 90%',
                        '| Inertia.js    [==============  ]  | 88%',
                        '| SQLite/MySQL  [=============   ]  | 80%',
                        '| Docker        [============    ]  | 75%',
                        '+-----------------------------------+',
                        ''
                    ]);
                    break;

                case 'projects':
                case 'misi':
                    setLogs(prev => [...prev, '[FETCHING MISSION FILES FROM ARCHIVE DATABASE...]']);
                    try {
                        const response = await fetch('/api/proyek');
                        const data = await response.json();
                        if (data.length === 0) {
                            setLogs(prev => [...prev, 'NO COMPLETED MISSIONS DETECTED.', '']);
                        } else {
                            const projectLogs = ['--- COMPLETED MISSIONS ---'];
                            data.forEach(p => {
                                projectLogs.push(`ID: MISI_${p.id.toString().padStart(3, '0')}`);
                                projectLogs.push(`NAME: ${p.nama_proyek.toUpperCase()}`);
                                projectLogs.push(`INFO: ${p.deskripsi}`);
                                if (p.tautan_github) projectLogs.push(`SRC: ${p.tautan_github}`);
                                projectLogs.push('--------------------------');
                            });
                            setLogs(prev => [...prev, ...projectLogs, '']);
                        }
                    } catch (err) {
                        setLogs(prev => [...prev, 'ERROR: SECURE DATABASE LINK LOST.', '']);
                    }
                    break;

                case 'contact':
                case 'komunikasi':
                    setLogs(prev => [...prev,
                        '--- ENCRYPTED CHANNELS ---',
                        'GitHub: https://github.com/arifrenggy00',
                        'Email: arifrenggy404@gmail.com',
                        'WhatsApp: MISI_LANGSUNG',
                        'LinkedIn: Arif Renggy',
                        ''
                    ]);
                    break;

                case 'sysinfo':
                case 'neofetch':
                    setLogs(prev => [...prev,
                        '         ______',
                        '       /  __   \\     ARIF-RENGGY-TERMINAL OS',
                        '      |  /  \\   |    -----------------------',
                        '      |  |__|   |    USER: visitor_node_' + visitorId,
                        '      |   __   /     HOST: arif-renggy-cv',
                        '     /   /  \\  \\     OS: CyberOS x86_64',
                        '    |___/    \\__\\    SHELL: React-CLI v4.0.1',
                        '                     ENGINE: Laravel 13 / React 19',
                        '                     RESOLUSI: ' + window.screen.width + 'x' + window.screen.height,
                        ''
                    ]);
                    break;

                case 'whoami':
                    setLogs(prev => [...prev, `USER: visitor_node_${visitorId} (standby_node)`, '']);
                    break;

                case 'date':
                case 'time':
                    setLogs(prev => [...prev, `DATETIME: ${new Date().toString()}`, '']);
                    break;

                case 'weather':
                    setLogs(prev => [...prev,
                        'WEATHER STATS:',
                        '  AMBIENT: ACID RAIN',
                        '  SUHU: 27.4°C',
                        '  QUALITY: TOXIC',
                        ''
                    ]);
                    break;

                case 'ping':
                    setLogs(prev => [...prev,
                        'PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.',
                        `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=${(Math.random() * 20 + 10).toFixed(2)} ms`,
                        `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=${(Math.random() * 20 + 10).toFixed(2)} ms`,
                        '--- 127.0.0.1 ping statistics ---',
                        '2 packets transmitted, 2 received, 0% packet loss',
                        ''
                    ]);
                    break;

                case 'matrix':
                    setIsMatrixActive(true);
                    break;

                case 'history':
                    setLogs(prev => [...prev, 'HISTORY BUFFER:', ...history.map((h, idx) => `  ${idx + 1}  ${h}`), '']);
                    break;

                case 'clear':
                    setLogs([]);
                    break;

                case 'exit':
                case 'gui':
                case 'close':
                    onClose();
                    break;

                case 'sudo':
                    setLogs(prev => [...prev, 'Access Denied: Privilege escalation blocked. Incident logged.', '']);
                    break;

                default:
                    setLogs(prev => [...prev, `Command "${cmd}" not recognized. Type "help" for info.`, '']);
                    break;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInputValue(history[newIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= history.length) {
                setHistoryIndex(-1);
                setInputValue('');
            } else {
                setHistoryIndex(newIndex);
                setInputValue(history[newIndex]);
            }
        }
    };

    return (
        <div 
            onClick={() => inputRef.current?.focus()}
            className="fixed inset-0 z-[70] bg-black/95 text-[#00f0ff] p-4 font-mono text-xs flex flex-col md:p-6 overflow-hidden"
        >
            {isMatrixActive && (
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                />
            )}
            
            <div className="flex justify-between items-center border-b border-[#00f0ff]/30 pb-2 mb-4 relative z-20">
                <div className="flex items-center gap-2 text-neon-cyan">
                    <Terminal size={16} />
                    <span>visitor@arif-renggy: CLI_SESSION_ACTIVE</span>
                </div>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-[#ff007f] transition-colors cursor-pointer"
                >
                    <X size={18} />
                </button>
            </div>

            <div 
                ref={logContainerRef} 
                className="flex-1 overflow-y-auto mb-4 space-y-1 scrollbar-thin scrollbar-thumb-[#00f0ff]/20 scrollbar-track-transparent relative z-20"
            >
                {logs.map((log, i) => (
                    <pre key={i} className="whitespace-pre-wrap leading-relaxed select-text font-mono">
                        {log}
                    </pre>
                ))}
            </div>

            <div className="flex items-center gap-2 relative z-20">
                <span className="text-[#ff007f]">visitor@arif-renggy:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-[#00f0ff] font-mono caret-[#00f0ff] focus:ring-0 p-0"
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
