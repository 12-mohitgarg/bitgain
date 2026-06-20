import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDemoModal } from './DemoModalContext';
import CircuitFrame from './CircuitFrame';
import GameArt from './GameArt';
import './GameCabinet.css';

export default function GameCabinet({ game, index = 0 }) {
  const { openDemo } = useDemoModal();
  const ref = useRef(null);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tiltX', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--tiltY', `${(x * 10).toFixed(2)}deg`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tiltX', '0deg');
    el.style.setProperty('--tiltY', '0deg');
  }

  return (
    <motion.div
      className="cabinet-wrap"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        className={`cabinet cabinet--${game.accent}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CircuitFrame accent={game.accent} className="cabinet__frame">
          <div className="cabinet__glow" />
          <span className="cabinet__tag">{game.tag}</span>
          <div className="cabinet__screen">
            <GameArt id={game.id} />
            <span className="cabinet__online">
              <span className="cabinet__online-dot" />
              {game.online.toLocaleString()} online
            </span>
          </div>
          <h3 className="cabinet__name">{game.name}</h3>
          <p className="cabinet__blurb">{game.blurb}</p>
          <div className="cabinet__meta">
            <span>{game.players}</span>
            <span className="cabinet__dot">•</span>
            <span>{game.avgTime}</span>
            <span className="cabinet__dot">•</span>
            <span>{game.difficulty}</span>
          </div>
          <button className="cabinet__play" onClick={() => openDemo(game.id)}>
            Launch Demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1L11 7L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </CircuitFrame>
      </div>
    </motion.div>
  );
}
