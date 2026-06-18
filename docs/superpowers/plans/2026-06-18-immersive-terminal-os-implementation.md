# Immersive Terminal OS Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio UI into a modern hacker-terminal aesthetic using a Cyan/White/Black color palette, ASCII art, and interactive terminal elements.

**Architecture:** Refactor existing Layout and Page components to use a centralized Terminal OS theme defined in Tailwind CSS 4. Introduce specialized components for ASCII headers and rolling system logs.

**Tech Stack:** Laravel 11, React 19, Inertia.js, Tailwind CSS 4, Framer Motion, Lucide React.

---

### Task 1: Update Global Styles and Theme

**Files:**
- Modify: `resources/css/app.css`

- [ ] **Step 1: Update Tailwind CSS 4 theme and global styles**

```css
@import url('https://fonts.bunny.net/css?family=fira-code:400,500,600');
@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';

@theme {
    --font-mono: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --color-terminal-bg: #050505;
    --color-terminal-primary: #00f0ff;
    --color-terminal-secondary: #ffffff;
    --color-terminal-muted: #1a1a1a;
}

@layer base {
  body {
    @apply bg-terminal-bg text-terminal-secondary font-mono;
    background-image: 
        radial-gradient(circle at 50% 50%, #0a0a0a 0%, #050505 100%),
        linear-gradient(rgba(0, 240, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px);
    background-size: 100% 100%, 30px 30px, 30px 30px;
  }
}

@layer utilities {
  .text-neon-cyan { text-shadow: 0 0 5px #00f0ff, 0 0 10px rgba(0, 240, 255, 0.5); }
  .border-terminal { border-color: var(--color-terminal-muted); }
  .border-terminal-active { border-color: var(--color-terminal-primary); }
  
  .typing-animation {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--color-terminal-primary);
    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: var(--color-terminal-primary); }
  }

  .scanline {
    background: linear-gradient(
      to bottom,
      transparent,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1)
    );
    background-size: 100% 4px;
    z-index: 100;
  }

  .flicker {
    animation: flicker 0.15s infinite;
  }

  @keyframes flicker {
    0% { opacity: 0.97; }
    5% { opacity: 0.95; }
    10% { opacity: 0.9; }
    15% { opacity: 0.95; }
    20% { opacity: 0.98; }
    25% { opacity: 0.95; }
    30% { opacity: 0.9; }
    100% { opacity: 1; }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add resources/css/app.css
git commit -m "style: update theme to Immersive Terminal OS"
```

### Task 2: Create ASCII Header Component

**Files:**
- Create: `resources/js/Components/AsciiHeader.jsx`

- [ ] **Step 1: Implement AsciiHeader component**

```jsx
import React from 'react';

const ASCII_ART = `
  ___  ____  ___ _____   ____  ____ _   _  ____  ______   __
 / _ \\|  _ \\|_ _|  ___| |  _ \\| ___| \\ | |/ ___|/ ___\\ \\ / /
| |_| | |_) || || |_    | |_) |  _| |  \\| | |  _| |  _ \\ V / 
|  _  |  _ < | ||  _|   |  _ <| |___| |\\  | |_| | |_| | | |  
|_| |_|_| \\_\\___|_|     |_| \\_\\_____|_| \\_|\\____|\\____| |_|  
`;

export default function AsciiHeader() {
    return (
        <pre className="text-[6px] md:text-[8px] leading-[1] text-terminal-primary font-mono select-none opacity-80 hover:opacity-100 transition-opacity">
            {ASCII_ART}
        </pre>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/Components/AsciiHeader.jsx
git commit -m "feat: add AsciiHeader component"
```

### Task 3: Create System Logs Component

**Files:**
- Create: `resources/js/Components/SystemLogs.jsx`

- [ ] **Step 1: Implement SystemLogs component**

```jsx
import React, { useState, useEffect } from 'react';

const LOG_MESSAGES = [
    "INITIALIZING KERNEL...",
    "MOUNTING /dev/sda1...",
    "ESTABLISHING SECURE CONNECTION...",
    "ENCRYPTING DATA STREAM...",
    "BYPASSING FIREWALL...",
    "ACCESS GRANTED",
    "UPLINK STABLE: 10Gbps",
    "DECRYPTING ARCHIVE_IDENTITAS...",
    "SCANNING FOR THREATS...",
    "0 THREATS DETECTED",
];

export default function SystemLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const next = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
                return next.slice(-8); // Keep last 8 logs
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-terminal-muted/30 p-2 border border-terminal text-[10px] font-mono h-32 overflow-hidden">
            <div className="text-terminal-primary mb-1 border-b border-terminal pb-1 uppercase tracking-tighter">System Logs</div>
            {logs.map((log, i) => (
                <div key={i} className="text-gray-500">
                    <span className="text-terminal-primary">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
            ))}
        </div>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/Components/SystemLogs.jsx
git commit -m "feat: add SystemLogs component"
```

### Task 4: Refactor ArsipLayout

**Files:**
- Modify: `resources/js/Layouts/ArsipLayout.jsx`

- [ ] **Step 1: Refactor layout with new components and styling**

```jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Terminal, Cpu, Layers, Zap, MessageSquare } from 'lucide-react';
import AsciiHeader from '../Components/AsciiHeader';
import SystemLogs from '../Components/SystemLogs';

export default function ArsipLayout({ children }) {
    const navItems = [
        { href: '/identitas', label: 'identitas', icon: Cpu },
        { href: '/misi', label: 'misi', icon: Layers },
        { href: '/arsenal', label: 'arsenal', icon: Zap },
        { href: '/jalur-komunikasi', label: 'komunikasi', icon: MessageSquare }
    ];

    return (
        <div className="min-h-screen bg-terminal-bg text-terminal-secondary p-4 md:p-8 overflow-hidden relative font-mono selection:bg-terminal-primary selection:text-terminal-bg">
            <div className="absolute inset-0 scanline pointer-events-none opacity-5 z-50"></div>
            
            <header className="max-w-7xl mx-auto border-b border-terminal pb-6 mb-8 flex flex-col md:flex-row justify-between items-end gap-4 relative z-10">
                <AsciiHeader />
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-terminal-primary font-mono text-[10px] uppercase mb-1">
                        <span className="inline-block w-2 h-2 bg-terminal-primary rounded-full animate-pulse"></span>
                        Terminal Session: Active
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">
                        Node: arif-renggy-v4.0.1
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <aside className="space-y-6">
                    <nav className="space-y-1">
                        <div className="text-terminal-primary text-[10px] font-mono mb-2 uppercase tracking-widest opacity-50">Directory</div>
                        {navItems.map((item) => (
                            <Link 
                                key={item.href}
                                href={item.href} 
                                className={`flex items-center gap-3 p-2 border border-transparent hover:border-terminal hover:bg-terminal-primary/5 transition-all group ${window.location.pathname === item.href ? 'text-terminal-primary border-terminal bg-terminal-primary/10' : 'text-gray-400'}`}
                            >
                                <span className="text-terminal-primary opacity-50 group-hover:opacity-100">{'>'}</span>
                                <span className="font-mono text-xs tracking-wider">/home/{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                    
                    <SystemLogs />
                </aside>
                
                <main className="md:col-span-3 border border-terminal p-6 relative bg-terminal-muted/10 backdrop-blur-sm min-h-[500px]">
                    {/* Decorative Terminal Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-terminal-primary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-terminal-primary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-terminal-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-terminal-primary"></div>
                    
                    {children}
                </main>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/Layouts/ArsipLayout.jsx
git commit -m "refactor: update ArsipLayout with terminal aesthetic"
```

### Task 5: Update Pages with Typing Animation

**Files:**
- Modify: `resources/js/Pages/Identitas.jsx`
- Modify: `resources/js/Pages/Misi.jsx`
- Modify: `resources/js/Pages/Arsenal.jsx`
- Modify: `resources/js/Pages/Kontak.jsx`

- [ ] **Step 1: Update Identitas page**

```jsx
import React from 'react';
import ArsipLayout from '../Layouts/ArsipLayout';
import { motion } from 'framer-motion';

export default function Identitas() {
    return (
        <ArsipLayout>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-terminal-primary font-mono text-lg">{'>'}</span>
                    <h2 className="text-terminal-primary font-mono text-lg uppercase tracking-[0.2em] typing-animation">Arsip Identitas</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                    {[
                        { label: 'IDENTITAS_INTI', value: 'Arif Renggy' },
                        { label: 'PERAN', value: 'Fullstack Developer' },
                        { label: 'SPESIALISASI', value: 'Laravel Expert', active: true },
                        { label: 'WILAYAH', value: 'Indonesia' }
                    ].map((item, i) => (
                        <div key={i} className={`p-4 border border-terminal bg-black/40 hover:bg-terminal-primary/5 transition-colors ${item.active ? 'border-l-2 border-l-terminal-primary' : ''}`}>
                            <div className="text-gray-500 mb-1 text-[10px]">{item.label}</div>
                            <div className={item.active ? 'text-terminal-primary font-bold' : 'text-terminal-secondary'}>{item.value}</div>
                        </div>
                    ))}
                </div>
                
                <div className="relative p-6 border border-terminal bg-terminal-muted/20">
                     <div className="absolute top-0 left-0 w-1 h-full bg-terminal-primary"></div>
                     <p className="text-gray-400 text-sm leading-relaxed italic">
                        "Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel."
                    </p>
                </div>
            </motion.div>
        </ArsipLayout>
    );
}
```

- [ ] **Step 2: Update Misi page**

(I need to read `resources/js/Pages/Misi.jsx` first to make sure I don't break existing logic).

- [ ] **Step 3: Update Arsenal page**

(I need to read `resources/js/Pages/Arsenal.jsx` first).

- [ ] **Step 4: Update Kontak page**

(I need to read `resources/js/Pages/Kontak.jsx` first).

- [ ] **Step 5: Commit**

```bash
git add resources/js/Pages/Identitas.jsx resources/js/Pages/Misi.jsx resources/js/Pages/Arsenal.jsx resources/js/Pages/Kontak.jsx
git commit -m "feat: apply terminal aesthetic and animations to pages"
```

### Task 6: Final Verification and Cleanup

- [ ] **Step 1: Verify styles and responsiveness**
- [ ] **Step 2: Ensure ASCII art displays correctly on mobile**
- [ ] **Step 3: Final check of system logs behavior**
- [ ] **Step 4: Commit cleanup**

```bash
git commit --allow-empty -m "chore: final verification of Terminal OS theme"
```
