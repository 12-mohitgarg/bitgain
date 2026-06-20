import { motion } from 'framer-motion';
import './StatsBar.css';

const STATS = [
  { value: '10,450+', label: 'Active Players' },
  { value: '6', label: 'Skill Games' },
  { value: '2.1M', label: 'Matches Played' },
  { value: '24/7', label: 'Live Matchmaking' },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container stats-bar__grid">
        {STATS.map((s, i) => (
          <motion.div
            className="stats-bar__item"
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="stats-bar__value">{s.value}</span>
            <span className="stats-bar__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
