import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './StatsBar.css';

const STATS = [
  { value: '10,450+', label: 'Active Players' },
  { value: '6', label: 'Skill Games' },
  { value: '2.1M', label: 'Matches Played' },
  { value: '24/7', label: 'Live Matchmaking' },
];

function CountUp({ value }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  function startCountUp() {
    let target = 0;
    let suffix = '';
    let isDecimal = false;
    let isFraction = false;
    let fracTarget = 0;
    
    if (value.includes('+')) {
      target = parseInt(value.replace(/,/g, '').replace('+', ''), 10) || 0;
      suffix = '+';
    } else if (value.includes('M')) {
      target = parseFloat(value.replace('M', '')) || 0;
      suffix = 'M';
      isDecimal = true;
    } else if (value.includes('/')) {
      const parts = value.split('/');
      target = parseInt(parts[0], 10) || 0;
      fracTarget = parseInt(parts[1], 10) || 0;
      isFraction = true;
    } else {
      target = parseInt(value, 10) || 0;
    }

    let start = 0;
    const duration = 1500; // 1.5 seconds counts
    const startTime = performance.now();

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic: f(t) = t(2-t)
      const easeProgress = progress * (2 - progress);

      let current = start + (target - start) * easeProgress;

      if (isDecimal) {
        setDisplayValue(current.toFixed(1) + suffix);
      } else if (isFraction) {
        const curFrac = Math.round(easeProgress * fracTarget);
        setDisplayValue(Math.round(current) + '/' + curFrac);
      } else {
        const rounded = Math.round(current);
        const formatted = rounded.toLocaleString();
        setDisplayValue(formatted + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(value); // Secure final output formatting
      }
    }

    requestAnimationFrame(updateNumber);
  }

  return <span ref={ref}>{displayValue}</span>;
}

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
            whileHover={{ y: -6, scale: 1.03 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 240, damping: 20, delay: i * 0.08 }}
          >
            <span className="stats-bar__pulse" />
            <span className="stats-bar__value">
              <CountUp value={s.value} />
            </span>
            <span className="stats-bar__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
