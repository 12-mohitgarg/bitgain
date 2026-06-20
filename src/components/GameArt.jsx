// Hand-built SVG scenes for each game screen. Keeps everything on-brand
// (gold/silver/violet circuit aesthetic) with zero stock-image / IP risk.

function LudoArt() {
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      <rect x="35" y="10" width="50" height="50" rx="4" className="ga-fill-gold" opacity="0.18" />
      <rect x="115" y="10" width="50" height="50" rx="4" className="ga-fill-violet" opacity="0.18" />
      <rect x="35" y="70" width="50" height="50" rx="4" className="ga-fill-silver" opacity="0.18" />
      <rect x="115" y="70" width="50" height="50" rx="4" className="ga-fill-win" opacity="0.18" />
      <path d="M85 35 H115 M100 10 V120 M85 95 H115" className="ga-stroke" strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="35" r="8" className="ga-fill-gold" />
      <circle cx="140" cy="35" r="8" className="ga-fill-violet" />
      <circle cx="60" cy="95" r="8" className="ga-fill-silver" />
      <circle cx="140" cy="95" r="8" className="ga-fill-win" />
      <rect x="92" y="55" width="16" height="16" rx="3" className="ga-die" />
      <circle cx="100" cy="63" r="2" className="ga-die-pip" />
    </svg>
  );
}

function SpectrumArt() {
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      <circle cx="100" cy="65" r="46" className="ga-ring" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="65" r="46" className="ga-ring-progress" strokeWidth="3" />
      <circle cx="100" cy="65" r="30" className="ga-fill-violet" opacity="0.16" />
      <text x="100" y="72" textAnchor="middle" className="ga-text-mono">04:8</text>
      <rect x="36" y="108" width="30" height="10" rx="5" className="ga-fill-gold" opacity="0.7" />
      <rect x="86" y="108" width="30" height="10" rx="5" className="ga-fill-win" opacity="0.7" />
      <rect x="136" y="108" width="30" height="10" rx="5" className="ga-fill-violet" opacity="0.7" />
    </svg>
  );
}

function ReflexArt() {
  const cells = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      {cells.map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const lit = [1, 3, 7].includes(i);
        return (
          <rect
            key={i}
            x={56 + col * 32}
            y={18 + row * 32}
            width="24"
            height="24"
            rx="5"
            className={lit ? 'ga-fill-silver' : 'ga-cell-dim'}
            opacity={lit ? 0.9 : 0.25}
          />
        );
      })}
    </svg>
  );
}

function TacticsArt() {
  const hexes = [
    [60, 30], [100, 30], [140, 30],
    [40, 60], [80, 60], [120, 60], [160, 60],
    [60, 90], [100, 90], [140, 90],
  ];
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      {hexes.map(([cx, cy], i) => (
        <polygon
          key={i}
          points={hexPoints(cx, cy, 16)}
          className={i % 4 === 0 ? 'ga-fill-gold' : 'ga-hex-dim'}
          opacity={i % 4 === 0 ? 0.55 : 0.22}
        />
      ))}
      <circle cx="100" cy="60" r="6" className="ga-fill-gold" />
      <circle cx="140" cy="30" r="6" className="ga-fill-violet" />
    </svg>
  );
}

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    })
    .join(' ');
}

function CascadeArt() {
  const cols = 5;
  const rows = 4;
  const colors = ['ga-fill-gold', 'ga-fill-violet', 'ga-fill-win', 'ga-fill-silver'];
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const c = colors[(col + row) % colors.length];
        return (
          <circle
            key={i}
            cx={36 + col * 32}
            cy={20 + row * 28}
            r="9"
            className={c}
            opacity={row === 1 && (col === 1 || col === 2) ? 0.95 : 0.32}
          />
        );
      })}
    </svg>
  );
}

function SprintArt() {
  return (
    <svg viewBox="0 0 200 130" className="game-art">
      <text x="100" y="55" textAnchor="middle" className="ga-text-equation">
        47 + 18 = ?
      </text>
      <rect x="60" y="75" width="80" height="28" rx="6" className="ga-input" />
      <text x="100" y="94" textAnchor="middle" className="ga-text-mono">65</text>
      <rect x="20" y="115" width="160" height="3" rx="1.5" className="ga-track" opacity="0.3" />
      <rect x="20" y="115" width="96" height="3" rx="1.5" className="ga-fill-win" />
    </svg>
  );
}

const ART = {
  ludo: LudoArt,
  spectrum: SpectrumArt,
  reflex: ReflexArt,
  tactics: TacticsArt,
  cascade: CascadeArt,
  sprint: SprintArt,
};

export default function GameArt({ id }) {
  const Component = ART[id];
  if (!Component) return null;
  return <Component />;
}
