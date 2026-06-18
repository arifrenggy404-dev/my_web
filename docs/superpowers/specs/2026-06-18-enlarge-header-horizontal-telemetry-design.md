# Design Spec: Centering ASCII Header & Horizontal Telemetry Row

This specification details the changes needed to enlarge and center the ASCII Art header "ARIF RENGGY" and align the telemetry info along with the active session info horizontally on the main divider line.

## 1. Requirements

- **ASCII Header**:
  - Centered horizontally in the header container.
  - Font size increased to `text-xs md:text-sm` (approx. 12px - 14px) for prominent branding.
  - No horizontal wrapping/overflow.
- **Telemetry & Active Session Info**:
  - Combined into a single, borderless horizontal metadata row.
  - Located directly above the header's main bottom border.
  - Items separated by a pipe (`|`) character.
  - Includes: `IP`, `NODE`, `BATT` (battery status), `LOAD` (CPU load simulation), `SESSION` (Active status indicator), and `VERSION` (app version).
  - Designed to look like a clean, unified telemetry terminal interface.

## 2. Component Design

### 2.1 AsciiHeader.jsx
- Change alignment/centering: Wrap the `<pre>` tag or place centering classes on it.
- Since `<pre>` contains multiline string with leading spaces, we will trim/adjust the indentation of ASCII art to center properly.
- Update Tailwind classes to: `text-xs md:text-sm text-center leading-[1] text-terminal-primary font-mono select-none opacity-80 hover:opacity-100 transition-opacity mx-auto w-fit`.

### 2.2 TelemetryWidget.jsx
- Refactor props or state to support session information or move session status elements inside it.
- To keep components clean, we will pass session status or version details into `TelemetryWidget` or implement them directly inside it. Let's merge the session display logic into `TelemetryWidget.jsx` so it stays self-contained.
- The new telemetry layout:
  ```jsx
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
          <div className="flex items-center gap-1.5 uppercase">
              <span className="inline-block w-1.5 h-1.5 bg-terminal-primary rounded-full animate-pulse"></span>
              <span className="text-terminal-primary">SESSION:</span> ACTIVE
          </div>
          <div className="text-gray-700">|</div>
          <div><span className="text-terminal-primary">VER:</span> v4.0.1</div>
      </div>
  </div>
  ```

### 2.3 ArsipLayout.jsx
- Modify the `<header>` element:
  - Center `AsciiHeader` container.
  - Clean up old text-right layout for Terminal Session/Node version.
  - Render `TelemetryWidget` horizontally across the bottom with a wrapper that defines the bottom border.
  ```jsx
  <header className="max-w-7xl mx-auto border-b border-terminal/30 pb-2 mb-8 flex flex-col items-center gap-6 relative z-10">
      <h1 className="sr-only">Arif Renggy - Portofolio Developer Laravel & React</h1>
      
      {/* ASCII Art row - centered */}
      <div className="w-full flex justify-center py-2">
          <AsciiHeader />
      </div>
      
      {/* Telemetry/Active session row - sitting horizontally directly on/above the border line */}
      <TelemetryWidget />
  </header>
  ```

## 3. Verification Plan

- Run `npm run build` to verify frontend compilation.
- Ensure that the layout renders cleanly at 800px width.
- Verify that the ASCII header is centered and large.
- Verify that the telemetry elements (IP, Node, Battery, CPU load, Session Status, Node Version) are all on a single line separated by pipes.
