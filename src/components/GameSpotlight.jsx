import { motion } from 'framer-motion';
import CircuitFrame from './CircuitFrame';
import GameArt from './GameArt';
import './GameSpotlight.css';

export default function GameSpotlight({ game, index = 0 }) {
  const reversed = index % 2 === 1;
  return (
    <motion.div
      className={`spotlight ${reversed ? 'spotlight--reversed' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="spotlight__visual">
        <CircuitFrame accent={game.accent} className="spotlight__frame">
          <div className={`spotlight__screen spotlight__screen--${game.accent}`}>
            <GameArt id={game.id} />
          </div>
        </CircuitFrame>
      </div>
      <div className="spotlight__copy">
        <span className={`spotlight__tag spotlight__tag--${game.accent}`}>{game.tag}</span>
        <h3 className="spotlight__name">{game.name}</h3>
        <p className="spotlight__blurb">{game.longBlurb}</p>
        <div className="spotlight__stats">
          <div className="spotlight__stat">
            <span className="spotlight__stat-label">Players</span>
            <span className="spotlight__stat-value">{game.players}</span>
          </div>
          <div className="spotlight__stat">
            <span className="spotlight__stat-label">Round length</span>
            <span className="spotlight__stat-value">{game.avgTime}</span>
          </div>
          <div className="spotlight__stat">
            <span className="spotlight__stat-label">Skill</span>
            <span className="spotlight__stat-value">{game.skillNote}</span>
          </div>
        </div>
        <button className={`btn btn--${game.accent === 'silver' ? 'ghost' : game.accent === 'violet' ? 'violet' : 'gold'}`}>
          Play {game.name}
        </button>
      </div>
    </motion.div>
  );
}
