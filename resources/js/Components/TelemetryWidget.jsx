import React, { useEffect, useState } from 'react';

export default function TelemetryWidget() {
    const [ip, setIp] = useState('127.0.0.1');
    const [node, setNode] = useState('UNKNOWN_NODE');
    const [battery, setBattery] = useState({ level: 100, charging: true, supported: false });
    const [cpuLoad, setCpuLoad] = useState('1.00%');

    // Efek pembacaan data sensor
    useEffect(() => {
        // Fetch IP dari Laravel API
        fetch('/api/ip')
            .then(res => res.json())
            .then(data => {
                if (data.ip) setIp(data.ip);
            })
            .catch(() => {});

        // Parsing User Agent sederhana
        const ua = navigator.userAgent;
        let os = 'UNKNOWN_OS';
        let browser = 'UNKNOWN_BROWSER';

        if (ua.indexOf('Win') !== -1) os = 'WIN';
        else if (ua.indexOf('Mac') !== -1) os = 'MAC';
        else if (ua.indexOf('Linux') !== -1) os = 'LINUX';
        else if (ua.indexOf('Android') !== -1) os = 'ANDR';
        else if (ua.indexOf('like Mac') !== -1) os = 'IOS';

        if (ua.indexOf('Firefox') !== -1) browser = 'FF';
        else if (ua.indexOf('Chrome') !== -1) browser = 'CHROME';
        else if (ua.indexOf('Safari') !== -1) browser = 'SAFARI';
        else if (ua.indexOf('Edge') !== -1) browser = 'EDGE';
        else if (ua.indexOf('Opera') !== -1) browser = 'OPERA';

        setNode(`${os}_${browser}`);

        // Membaca Battery Status API
        if (navigator.getBattery) {
            navigator.getBattery().then(batt => {
                const updateBattery = () => {
                    setBattery({
                        level: Math.round(batt.level * 100),
                        charging: batt.charging,
                        supported: true
                    });
                };
                updateBattery();
                batt.addEventListener('levelchange', updateBattery);
                batt.addEventListener('chargingchange', updateBattery);
            });
        }

        // Simulasi fluktuasi beban CPU
        const interval = setInterval(() => {
            const load = (Math.random() * 3.5 + 1.0).toFixed(2);
            setCpuLoad(`${load}%`);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const renderBatteryBar = () => {
        if (!battery.supported) return '[UNAVAILABLE]';
        const blocks = Math.round(battery.level / 20);
        const bar = '='.repeat(blocks) + ' '.repeat(5 - blocks);
        return `[${bar}] ${battery.level}% ${battery.charging ? '⚡' : ''}`;
    };

    return (
        <div className="flex flex-row flex-wrap items-center justify-between w-full font-mono text-[9px] text-gray-500 select-none pb-2">
            <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
                <div><span className="text-terminal-primary">IP:</span> {ip}</div>
                <div className="text-gray-700">|</div>
                <div><span className="text-terminal-primary">NODE:</span> {node}</div>
                <div className="text-gray-700">|</div>
                <div><span className="text-terminal-primary">BATT:</span> {renderBatteryBar()}</div>
                <div className="text-gray-700">|</div>
                <div><span className="text-terminal-primary">LOAD:</span> {cpuLoad}</div>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-1.5 uppercase text-terminal-primary">
                    <span className="inline-block w-1.5 h-1.5 bg-terminal-primary rounded-full animate-pulse"></span>
                    SESSION: ACTIVE
                </div>
                <div className="text-gray-700">|</div>
                <div><span className="text-terminal-primary">VER:</span> v4.0.1</div>
            </div>
        </div>
    );
}
