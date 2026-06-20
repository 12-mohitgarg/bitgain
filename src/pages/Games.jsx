import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GameCabinet from '../components/GameCabinet';
import StatsBar from '../components/StatsBar';
import GamesHeroBackground from '../components/GamesHeroBackground';
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
        <GamesHeroBackground />
        <div className="container games-hero__grid">
          <div>
            <span className="games-hero__eyebrow">Full Catalog</span>
            <h1 className="games-hero__title">All Games</h1>
            <p className="games-hero__sub">
              Every cabinet on the floor. Filter by category, jump into practice mode, or go straight for rank.
            </p>
          </div>

          <motion.div
            className="games-console"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.12 }}
          >
            <div className="games-console__top">
              <span />
              <span />
              <span />
            </div>
            <div className="games-console__meter">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="games-console__rows">
              {TRENDING.map((g, i) => (
                <motion.div
                  className="games-console__row"
                  key={g.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
                >
                  <strong>{g.name}</strong>
                  <span>{g.online.toLocaleString()} live</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <StatsBar />

      <section className="container trending-strip">
        <h2 className="trending-strip__heading">Trending Right Now</h2>
        <div className="trending-strip__list">
          {TRENDING.map((g, i) => (
            <motion.div
              className="trending-chip"
              key={g.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.08 }}
            >
              <span className="trending-chip__rank">{i + 1}</span>
              <span className="trending-chip__name">{g.name}</span>
              <span className="trending-chip__online">{g.online.toLocaleString()} online</span>
            </motion.div>
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
              style={{ position: 'relative' }}
            >
              {active === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="filter-pill-bg"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="filter-pill-txt">{cat}</span>
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
