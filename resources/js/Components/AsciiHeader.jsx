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
        <pre 
            role="img" 
            aria-label="ASCII Art Header - ARIF RENGGY" 
            className="text-xs md:text-sm text-center leading-[1] text-terminal-primary font-mono select-none opacity-80 hover:opacity-100 transition-opacity mx-auto w-fit"
        >
            {ASCII_ART}
        </pre>
    );
}
