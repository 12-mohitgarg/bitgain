import './CircuitFrame.css';

/**
 * Decorative circuit-trace frame that draws itself in on mount/hover.
 * Echoes the PCB-trace motif from the Bitg logo. Wrap any card/panel.
 */
export default function CircuitFrame({ children, accent = 'gold', className = '' }) {
  return (
    <div className={`circuit-frame circuit-frame--${accent} ${className}`}>
      <svg className="circuit-frame__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="circuit-frame__path"
          d="M 8,0 L 0,0 L 0,8 M 0,30 L 0,0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="circuit-frame__corner circuit-frame__corner--tl" />
      <span className="circuit-frame__corner circuit-frame__corner--tr" />
      <span className="circuit-frame__corner circuit-frame__corner--bl" />
      <span className="circuit-frame__corner circuit-frame__corner--br" />
      <div className="circuit-frame__content">{children}</div>
    </div>
  );
}
