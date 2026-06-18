# CRT Glitch Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a full-screen CRT monitor flicker loading overlay triggered during Inertia.js navigation events, with custom styling in `app.css`.

**Architecture:** Append transition/flicker CSS utility classes to `app.css`. Listen to navigation events in `ArsipLayout` to manage an overlay rendering loading bars and a scanline filter.

**Tech Stack:** React 19, Inertia.js, Tailwind CSS 4.

## Global Constraints
- The page transition overlay must only trigger during Inertia route requests.
- Hold transition completion state for 350ms to ensure the glitch effect is visible.

---

### Task 1: Append Glitch CSS Styles

**Files:**
- Modify: `resources/css/app.css`

- [ ] **Step 1: Append transition and flicker animations**

Modify [app.css](file:///home/arifrenggy00/my_web/resources/css/app.css) to add the CRT keyframe animations and utility classes:

```css
@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';

@theme {
    --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji';
}

@layer base {
  body {
    @apply bg-[#0a0a0c] text-gray-100 font-mono;
    background-image: radial-gradient(circle at 50% 50%, #1a1a1c 0%, #0a0a0c 100%);
  }
}

@layer utilities {
  .text-neon-cyan { text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff; }
  .text-neon-pink { text-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f; }
  .border-neon-cyan { box-shadow: 0 0 5px #00f0ff; border-color: #00f0ff; }
  .neon-glow-cyan {
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.2);
  }
  .neon-glow-pink {
    box-shadow: 0 0 10px rgba(255, 0, 127, 0.5), 0 0 20px rgba(255, 0, 127, 0.2);
  }
  .grid-bg {
    background-image: 
      linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .scanline {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.3)
    );
    background-size: 100% 4px;
  }
  .clip-path-polygon {
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }
  
  /* CRT Glitch Transition Animations */
  @keyframes crt-flicker {
    0% { opacity: 0.98; filter: brightness(1); }
    50% { opacity: 0.95; filter: brightness(0.95); }
    100% { opacity: 0.99; filter: brightness(1.05); }
  }

  @keyframes scanline-scroll {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  .animate-crt-flicker {
    animation: crt-flicker 0.15s infinite;
  }

  .animate-scanline-scroll {
    animation: scanline-scroll 6s linear infinite;
  }
}
```

- [ ] **Step 2: Commit changes**

```bash
git add resources/css/app.css
git commit -m "style: add CRT glitch and flicker transition styles"
```

---

### Task 2: Integrate Transition Overlay in ArsipLayout

**Files:**
- Modify: `resources/js/Layouts/ArsipLayout.jsx`

**Interfaces:**
- Consumes: CSS animations
- Produces: Interactive page load overlay during routing

- [ ] **Step 1: Write routing overlay and state logic**

Modify [ArsipLayout.jsx](file:///home/arifrenggy00/my_web/resources/js/Layouts/ArsipLayout.jsx) to add the `isTransitioning` state, navigation listener delay, and loading progress bar:

```jsx
import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Terminal, Cpu, Layers, Zap, MessageSquare } from 'lucide-react';
import AsciiHeader from '../Components/AsciiHeader';
import TerminalStatusBar from '../Components/TerminalStatusBar';
import TerminalNotifications from '../Components/TerminalNotifications';
import InteractiveBackground from '../Components/InteractiveBackground';
import InteractiveCli from '../Components/InteractiveCli';

export default function ArsipLayout({ children }) {
    const [logs, setLogs] = useState([]);
    const [isCliOpen, setIsCliOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const addLog = (message, type = 'SYS') => {
        const id = Math.random().toString(36).substr(2, 9);
        const newLog = {
            id,
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        };
        setLogs(prev => [...prev, newLog]);
        setTimeout(() => {
            setLogs(prev => prev.filter(l => l.id !== id));
        }, 4000);
    };

    useEffect(() => {
        // Initial Logs
        setTimeout(() => addLog('KERNEL_LOADED_V4.0', 'SYS'), 500);
        setTimeout(() => addLog('SECURE_HANDSHAKE_COMPLETE', 'SEC'), 1200);

        // Inertia Navigation Logs
        const startListener = router.on('start', (event) => {
            setIsTransitioning(true);
            setLoadingProgress(10);
            addLog(`FETCHING_NODE: ${event.detail.visit.url.pathname}`, 'INFO');
        });

        const progressInterval = isTransitioning && setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.floor(Math.random() * 15 + 5);
            });
        }, 80);

        const finishListener = router.on('finish', () => {
            setLoadingProgress(100);
            setTimeout(() => {
                setIsTransitioning(false);
                setLoadingProgress(0);
                addLog('DOM_UPDATED_READY', 'SYS');
            }, 350); // Small delay to appreciate the CRT glitch
        });

        return () => {
            startListener();
            finishListener();
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isTransitioning]);

    const navItems = [
        { href: '/identitas', label: 'identitas', icon: Cpu },
        { href: '/misi', label: 'misi', icon: Layers },
        { href: '/arsenal', label: 'arsenal', icon: Zap },
        { href: '/jalur-komunikasi', label: 'komunikasi', icon: MessageSquare }
    ];

    const renderProgressBar = () => {
        const blocks = Math.floor(loadingProgress / 10);
        return '[' + '='.repeat(blocks) + ' '.repeat(10 - blocks) + ']';
    };

    return (
        <div className="min-h-screen bg-transparent text-terminal-secondary pt-12 p-4 md:p-8 overflow-hidden relative font-mono selection:bg-terminal-primary selection:text-terminal-bg">
            <InteractiveBackground />
            <TerminalStatusBar />
            <TerminalNotifications logs={logs} />
            
            <div className="absolute inset-0 scanline pointer-events-none opacity-5 z-50"></div>

            {/* CRT Glitch Transition Overlay */}
            {isTransitioning && (
                <div className="fixed inset-0 bg-black/90 z-[90] flex flex-col justify-center items-center font-mono text-[#00f0ff] animate-crt-flicker pointer-events-auto select-none">
                    <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-[#00f0ff]/5 pointer-events-none"></div>
                    
                    <div className="space-y-4 text-center">
                        <div className="text-sm tracking-widest text-neon-cyan animate-pulse">
                            &gt; DECRYPTING NODE DATA...
                        </div>
                        <div className="text-xs text-gray-500">
                            STABILIZING_UPLINK: {renderProgressBar()} {loadingProgress}%
                        </div>
                    </div>
                </div>
            )}
            
            <header className="max-w-7xl mx-auto border-b border-terminal pb-6 mb-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 relative z-10">
                <h1 className="sr-only">Arif Renggy - Portofolio Developer Laravel & React</h1>
                <AsciiHeader />
                <div className="text-center md:text-right w-full md:w-auto">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-terminal-primary font-mono text-[10px] uppercase mb-1">
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

            <button
                onClick={() => setIsCliOpen(true)}
                className="fixed bottom-6 right-6 w-12 h-12 bg-black border border-terminal-primary rounded-full flex items-center justify-center text-terminal-primary hover:bg-terminal-primary hover:text-black transition-all cursor-pointer z-[60] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] animate-pulse"
                title="Switch to CLI Mode"
            >
                <Terminal size={22} />
            </button>
            <InteractiveCli isOpen={isCliOpen} onClose={() => setIsCliOpen(false)} />
        </div>
    );
}
```

- [ ] **Step 2: Commit changes**

```bash
git add resources/js/Layouts/ArsipLayout.jsx
git commit -m "feat: integrate CRT glitch transition overlay in ArsipLayout"
```

---

### Task 3: Build Verification

**Files:**
- None

- [ ] **Step 1: Compile assets**

Run: `npm run build`
Expected: PASS with zero errors

- [ ] **Step 2: Run test suite**

Run: `vendor/bin/phpunit`
Expected: PASS
