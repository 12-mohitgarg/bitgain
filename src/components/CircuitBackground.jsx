import './CircuitBackground.css';

// Ambient PCB-trace background, pulled directly from the logo's visual language.
export default function CircuitBackground() {
  return (
    <svg className="circuit-bg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="circuit-bg__group circuit-bg__group--gold">
        <path d="M -50,120 L 180,120 L 220,160 L 420,160" />
        <path d="M 60,260 L 60,400 L 140,480" />
        <path d="M -50,540 L 160,540 L 200,580 L 380,580" />
        <circle cx="220" cy="160" r="4" />
        <circle cx="420" cy="160" r="3" />
        <circle cx="140" cy="480" r="4" />
        <circle cx="200" cy="580" r="3" />
        <circle cx="60" cy="260" r="3" />
      </g>
      <g className="circuit-bg__group circuit-bg__group--silver">
        <path d="M 1250,140 L 1020,140 L 980,180 L 800,180" />
        <path d="M 1140,300 L 1140,440 L 1060,520" />
        <path d="M 1250,560 L 1040,560 L 1000,600 L 840,600" />
        <circle cx="980" cy="180" r="4" />
        <circle cx="800" cy="180" r="3" />
        <circle cx="1060" cy="520" r="4" />
        <circle cx="1000" cy="600" r="3" />
        <circle cx="1140" cy="300" r="3" />
      </g>
    </svg>
  );
}
