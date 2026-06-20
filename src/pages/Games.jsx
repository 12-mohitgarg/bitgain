import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GameCabinet from '../components/GameCabinet';
import StatsBar from '../components/StatsBar';
import { GAMES } from '../data/games';
import './Games.css';

const CATEGORIES = ['All', ...new Set(GAMES.map((g) => g.tag))];
const TRENDING = [...GAMES].sort((a, b) => b.online - a.online).slice(0, 3);

export default function Games() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? GAMES : GAMES.filter((g) => g.tag === active)),
    [active]
  );

  return (
    <div className="games-page">
      <section className="games-hero">
        <div className="container">
          <span className="games-hero__eyebrow">Full Catalog</span>
          <h1 className="games-hero__title">All Games</h1>
          <p className="games-hero__sub">
            Every cabinet on the floor. Filter by category, jump into practice mode, or go straight for rank.
          </p>
        </div>
      </section>

      <StatsBar />

      <section className="container trending-strip">
        <h2 className="trending-strip__heading">Trending Right Now</h2>
        <div className="trending-strip__list">
          {TRENDING.map((g, i) => (
            <div className="trending-chip" key={g.id}>
              <span className="trending-chip__rank">{i + 1}</span>
              <span className="trending-chip__name">{g.name}</span>
              <span className="trending-chip__online">{g.online.toLocaleString()} online</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container games-filter">
        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${active === cat ? 'filter-pill--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container games-grid-wrap">
        <motion.div layout className="cabinet-grid">
          {filtered.map((g, i) => (
            <GameCabinet key={g.id} game={g} index={i} />
          ))}
        </motion.div>
        {filtered.length === 0 && (
          <p className="games-empty">No games in this category yet.</p>
        )}
      </section>
    </div>
  );
}
