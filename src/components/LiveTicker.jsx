import './LiveTicker.css';

const FEED = [
  { name: 'Wallet 8F2A', action: 'activated', game: 'Practice Mode', score: '$100 demo' },
  { name: 'A. Khan', action: 'won', game: 'Ludo Royale', score: '2x payout' },
  { name: 'S. Patel', action: 'called Violet in', game: 'Color Prediction', score: '4.5x result' },
  { name: 'D. Verma', action: 'claimed from', game: 'Investor Wallet', score: '1% daily' },
  { name: 'J. Roy', action: 'entered', game: 'Golden Draw', score: 'hourly pool' },
  { name: 'M. Singh', action: 'unlocked', game: 'Referral Network', score: '15 levels' },
];

export default function LiveTicker() {
  const loop = [...FEED, ...FEED];
  return (
    <div className="ticker">
      <div className="ticker__label">
        <span className="ticker__dot" />
        Live
      </div>
      <div className="ticker__track">
        <div className="ticker__rail">
          {loop.map((item, i) => (
            <span className="ticker__item" key={i}>
              <strong>{item.name}</strong> {item.action} <em>{item.game}</em>
              <span className="ticker__score">{item.score}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
