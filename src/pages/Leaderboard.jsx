import { motion } from 'framer-motion';
import { LEADERBOARD } from '../data/leaderboard';
import './Leaderboard.css';

const PODIUM_ORDER = [2, 1, 3]; // visual order: 2nd, 1st, 3rd

export default function Leaderboard() {
  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);
  const byRank = (r) => top3.find((p) => p.rank === r);

  return (
    <div className="lb-page">
      <section className="lb-hero">
        <div className="container">
          <span className="lb-hero__eyebrow">Season 4</span>
          <h1 className="lb-hero__title">Leaderboard</h1>
          <p className="lb-hero__sub">Ranked by total season score across all games. Resets every quarter.</p>
        </div>
      </section>

      <section className="container">
        <div className="podium">
          {PODIUM_ORDER.map((rank, i) => {
            const p = byRank(rank);
            return (
              <motion.div
                key={rank}
                className={`podium__col podium__col--${rank}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="podium__avatar">{p.name.charAt(0)}</div>
                <span className="podium__name">{p.name}</span>
                <span className="podium__score">{p.score.toLocaleString()}</span>
                <div className="podium__bar">
                  <span className="podium__rank">{p.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container lb-table-wrap">
        <div className="lb-table">
          <div className="lb-row lb-row--head">
            <span>Rank</span>
            <span>Player</span>
            <span>Top Game</span>
            <span>Streak</span>
            <span className="lb-align-right">Score</span>
          </div>
          {rest.map((p, i) => (
            <motion.div
              className="lb-row"
              key={p.rank}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <span className="lb-rank">#{p.rank}</span>
              <span className="lb-name">{p.name}</span>
              <span className="lb-game">{p.game}</span>
              <span className="lb-streak">{p.streak}🔥</span>
              <span className="lb-score lb-align-right">{p.score.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
