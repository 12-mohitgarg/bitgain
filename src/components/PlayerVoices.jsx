import { motion } from 'framer-motion';
import './PlayerVoices.css';

const VOICES = [
  {
    name: 'ArjunV',
    rank: '#1 Season 4',
    quote: 'Reflex Grid is the first game that actually made me better at reacting under pressure. The leaderboard resets keep it fair every quarter.',
    game: 'Reflex Grid',
  },
  {
    name: 'PriyaR',
    rank: '#3 Season 4',
    quote: 'Number Sprint scratches an itch nothing else does. Sixty seconds, no mercy, and I can see exactly where I rank against everyone else.',
    game: 'Number Sprint',
  },
  {
    name: 'NightFalcon',
    rank: '#2 Season 4',
    quote: 'Hex Tactics rewards actually thinking ahead instead of just clicking fast. Every match against a top-10 player teaches me something.',
    game: 'Hex Tactics',
  },
];

export default function PlayerVoices() {
  return (
    <div className="voices">
      {VOICES.map((v, i) => (
        <motion.div
          className="voice-card"
          key={v.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: i * 0.1 }}
        >
          <span className="voice-card__quote-mark">"</span>
          <p className="voice-card__quote">{v.quote}</p>
          <div className="voice-card__footer">
            <div className="voice-card__avatar">{v.name.charAt(0)}</div>
            <div>
              <span className="voice-card__name">{v.name}</span>
              <span className="voice-card__rank">{v.rank} · {v.game}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
