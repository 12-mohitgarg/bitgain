import './LiveTicker.css';

const FEED = [
  { name: 'R. Mehta', action: 'topped the board in', game: 'Reflex Grid', score: '4,820 pts' },
  { name: 'A. Khan', action: 'won', game: 'Ludo Royale', score: '3-game streak' },
  { name: 'S. Patel', action: 'called it right in', game: 'Spectrum Call', score: '6 in a row' },
  { name: 'D. Verma', action: 'cleared', game: 'Cascade Match', score: '12x combo' },
  { name: 'J. Roy', action: 'set a new best in', game: 'Number Sprint', score: '38 solved' },
  { name: 'M. Singh', action: 'outplayed a rival in', game: 'Hex Tactics', score: 'flawless win' },
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
