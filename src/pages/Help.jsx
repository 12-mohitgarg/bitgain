import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Help.css';

const DEPOSIT_ALLOCATIONS = [
  { pool: 'Game Wallet', pct: '71%' },
  { pool: 'Referral Pool', pct: '15%' },
  { pool: 'Business Development Pool', pct: '6%' },
  { pool: 'Operations', pct: '5%' },
  { pool: 'Creator Fund', pct: '2%' },
  { pool: 'Lucky Draw Pool', pct: '1%' },
];

const REFERRAL_COMMISSIONS = [
  { level: 'Level 1 (L1)', deposit: '5%', winning: '5%' },
  { level: 'Level 2 (L2)', deposit: '2%', winning: '2%' },
  { level: 'Levels 3–5 (L3-L5)', deposit: '1%', winning: '1%' },
  { level: 'Levels 6–15 (L6-L15)', deposit: '0.5%', winning: '0.5%' },
];

const PSI_DISTRIBUTION = [
  { level: 'Level 1 (L1)', share: '15%' },
  { level: 'Level 2 (L2)', share: '10%' },
  { level: 'Level 3 (L3)', share: '7%' },
  { level: 'Level 4 (L4)', share: '5%' },
  { level: 'Levels 5–15 (L5-L15)', share: '3% each' },
];

const CLUB_RANKS = [
  { rank: 'Rank 1', volume: '$10,000' },
  { rank: 'Rank 2', volume: '$50,000' },
  { rank: 'Rank 3', volume: '$250,000' },
  { rank: 'Rank 4', volume: '$1,000,000' },
  { rank: 'Rank 5', volume: '$5,000,000' },
  { rank: 'Rank 6', volume: '$10,000,000' },
];

const MILESTONES = [
  { rank: 'Rank 1', reward: '$200' },
  { rank: 'Rank 2', reward: '$400' },
  { rank: 'Rank 3', reward: '$800' },
  { rank: 'Rank 4', reward: '$1,600' },
  { rank: 'Rank 5', reward: '$3,200' },
  { rank: 'Rank 6', reward: '$6,400' },
  { rank: 'Rank 7', reward: '$12,800' },
  { rank: 'Rank 8', reward: '$25,600' },
  { rank: 'Rank 9', reward: '$50,000' },
];

const FAQS = [
  {
    q: 'Do I need an email or password?',
    a: 'No. Bitgain is fully wallet-based and uses signature approvals. Connect your preferred BSC wallet (MetaMask, Trust Wallet, or WalletConnect) to log in instantly.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'The minimum deposit requirement is $1 USDT. Funds are automatically distributed across the ecosystem wallets on deposit.',
  },
  {
    q: 'How many referral levels are available?',
    a: 'Bitgain offers referral rewards extending up to 15 levels deep. Activation plans (Basic and Pro) determine the depth of commissions you can receive.',
  },
  {
    q: 'Can I earn passive income on Bitgain?',
    a: 'Yes, via our Investor Program. You can deposit between $100 and $50,000 USDT to receive a 1% daily return. Returns are split 70% to you and 30% to your referral network.',
  },
  {
    q: 'What token does Bitgain use?',
    a: 'Bitgain uses the BTG token, a BEP-20 token built on the BNB Smart Chain with a fixed supply of 41 Billion BTG. It has burnable, non-mintable, deflationary parameters.',
  },
  {
    q: 'Are withdrawals processed automatically?',
    a: 'Yes, withdrawals are processed automatically. Upon request submission, the system converts your USDT winnings into BTG (minus a 10% fee) and deposits them to your wallet.',
  },
  {
    q: 'How does cashback protection work?',
    a: 'We safeguard players via a 1% daily cashback base. Loss calculation base goes up to $2,000 with a daily limit of $20. Winnings are deposited into your Cashback Wallet.',
  },
];

const TABS = ['Overview', 'Earning Streams', 'Games Guide', 'Withdrawals & FAQ'];

export default function Help() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="help-page">
      <section className="help-hero">
        <div className="container">
          <span className="help-hero__eyebrow">Documentation Hub</span>
          <h1 className="help-hero__title">User Guide & FAQ</h1>
          <p className="help-hero__desc">
            Explore allocations, rules, referral networks, and system guidelines for the Bitgain ecosystem.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container help-tabs-container">
        <div className="help-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`help-tab ${activeTab === tab ? 'help-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ position: 'relative' }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeHelpTab"
                  className="help-tab-bg"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="help-tab-txt">{tab}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container help-content">
        <div className="help-tab-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* TAB 1: Overview */}
              {activeTab === 'Overview' && (
                <div className="doc-section">
                  <h2>Welcome to Bitgain</h2>
                  <p className="doc-lead">
                    Bitgain is the ultimate blockchain gaming and earning platform built on the BNB Smart Chain (BSC). 
                    It operates without emails or passwords, securing accounts purely through cryptographic wallets.
                  </p>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>How It Works</h3>
                      <ol className="doc-steps">
                        <li>
                          <strong>Connect Wallet:</strong> Sign in using MetaMask, Trust Wallet, or WalletConnect.
                        </li>
                        <li>
                          <strong>Deposit USDT:</strong> Fund your account with a minimum deposit of $1 USDT.
                        </li>
                        <li>
                          <strong>Play Games:</strong> Compete in prediction and skill cabinets using your Game Wallet.
                        </li>
                        <li>
                          <strong>Earn Rewards:</strong> Generate yields via game winnings, referrals, cashbacks, ROI shares, and draws.
                        </li>
                        <li>
                          <strong>Withdraw Earnings:</strong> Withdraw eligible commissions automatically in BTG tokens to your wallet.
                        </li>
                      </ol>
                    </div>

                    <div className="doc-card">
                      <h3>Deposit Allocations</h3>
                      <p className="doc-sub">Every deposit contributes directly to platform sustainability:</p>
                      <table className="doc-table">
                        <thead>
                          <tr>
                            <th>Allocation Pool</th>
                            <th className="txt-right">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DEPOSIT_ALLOCATIONS.map((row) => (
                            <tr key={row.pool}>
                              <td>{row.pool}</td>
                              <td className="txt-right font-mono txt-gold">{row.pct}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Activation Plans</h3>
                      <div className="activation-plan-box">
                        <div className="plan-item">
                          <strong>Basic Activation</strong>
                          <span className="plan-price">$10 USDT Min</span>
                          <p>Unlocks real-money games, referral commissions for Levels 1–3, and loss cashbacks.</p>
                        </div>
                        <div className="plan-item">
                          <strong>Pro Activation</strong>
                          <span className="plan-price">$100 USDT Min</span>
                          <p>Unlocks the Investor desk program and deep commissions down the full 15 levels.</p>
                        </div>
                      </div>
                    </div>

                    <div className="doc-card">
                      <h3>The Wallet System</h3>
                      <p className="doc-sub">Balances are isolated based on source to maintain maximum auditing transparency:</p>
                      <div className="wallet-categories">
                        <div className="wallet-cat">
                          <strong>Withdrawable Wallets</strong>
                          <span>Winnings Wallet, Referral Wallet, Club Wallet, Lucky Draw Wallet, Investor Wallet</span>
                        </div>
                        <div className="wallet-cat">
                          <strong>Play-Only / Accrual</strong>
                          <span>Cashback Wallet, ROI Wallet, Practice Wallet, Draw Wallets, Compound Wallets</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Earning Streams */}
              {activeTab === 'Earning Streams' && (
                <div className="doc-section">
                  <h2>Income Opportunities</h2>
                  <p className="doc-lead">
                    Bitgain distributes 29% of platform turn-ins back to team builders and community members through multiple passive streams.
                  </p>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Referral Commissions</h3>
                      <p className="doc-sub">Earn commissions when your team deposits and wins games:</p>
                      <table className="doc-table">
                        <thead>
                          <tr>
                            <th>Ecosystem Level</th>
                            <th className="txt-right">Deposit Split</th>
                            <th className="txt-right">Winning Split</th>
                          </tr>
                        </thead>
                        <tbody>
                          {REFERRAL_COMMISSIONS.map((row) => (
                            <tr key={row.level}>
                              <td>{row.level}</td>
                              <td className="txt-right font-mono txt-cyan">{row.deposit}</td>
                              <td className="txt-right font-mono txt-gold">{row.winning}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="doc-card">
                      <h3>Profit Sharing Income (PSI)</h3>
                      <p className="doc-sub">Earn daily ROI yields whenever your referral network receives daily loss cashbacks:</p>
                      <table className="doc-table">
                        <thead>
                          <tr>
                            <th>Referral Tier</th>
                            <th className="txt-right">PSI Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PSI_DISTRIBUTION.map((row) => (
                            <tr key={row.level}>
                              <td>{row.level}</td>
                              <td className="txt-right font-mono txt-violet">{row.share}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Club Turnover Pools</h3>
                      <p className="doc-sub">Qualify to share in <strong>8% of the platform's daily turnover</strong> based on total team volume:</p>
                      <div className="club-ranks-grid">
                        {CLUB_RANKS.map((row) => (
                          <div key={row.rank} className="club-rank-tile">
                            <strong>{row.rank}</strong>
                            <span>{row.volume} Vol</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="doc-card">
                      <h3>Achievement Bonuses</h3>
                      <p className="doc-sub">Unlock massive milestone bonuses paid out in deflationary BTG tokens:</p>
                      <div className="milestones-scroll">
                        <table className="doc-table">
                          <thead>
                            <tr>
                              <th>Milestone Rank</th>
                              <th className="txt-right">Reward (in BTG)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {MILESTONES.map((row) => (
                              <tr key={row.rank}>
                                <td>{row.rank}</td>
                                <td className="txt-right font-mono txt-gold">{row.reward}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Games Guide */}
              {activeTab === 'Games Guide' && (
                <div className="doc-section">
                  <h2>Bitgain Arcade Manual</h2>
                  <p className="doc-lead">
                    Learn game guidelines, payouts, and play parameters to optimize your prediction calls and race tempos.
                  </p>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Hourly Digit Game</h3>
                      <ul className="guide-ul">
                        <li>Runs 24 rounds daily (once every hour).</li>
                        <li>Choose a digit between <strong>0 and 9</strong> to bet.</li>
                        <li>Minimum stake is <strong>$1 USDT</strong>.</li>
                        <li><strong>Payouts:</strong> Early phase pays out <strong>8x reward</strong>; later phase pays out <strong>4x reward</strong> on correct hits.</li>
                      </ul>
                    </div>

                    <div className="doc-card">
                      <h3>Color Prediction</h3>
                      <ul className="guide-ul">
                        <li>New rounds generate every 60 seconds.</li>
                        <li>Stakes bet range is between <strong>$1 and $100 USDT</strong>.</li>
                        <li><strong>Multipliers:</strong> Calling Red or Green awards a <strong>2x payout</strong>. Calling the rarer Violet awards a <strong>4.5x payout</strong>.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Ludo Royale</h3>
                      <ul className="guide-ul">
                        <li>Multiplayer skill cabinet hosting <strong>2–4 players</strong>.</li>
                        <li>Matches range stakes from <strong>$1 to $100 USDT</strong>.</li>
                        <li>Winner receives a <strong>2x payout reward</strong>.</li>
                        <li>Equipped with an automatic turn-resolution system and 30-second clocks.</li>
                      </ul>
                    </div>

                    <div className="doc-card">
                      <h3>Cashback Protection</h3>
                      <ul className="guide-ul">
                        <li>Bitgain protects players from severe losses with <strong>1% Daily Cashback</strong>.</li>
                        <li>Minimum daily loss requirement is <strong>$100</strong> to qualify.</li>
                        <li>Daily loss base base calculation caps at <strong>$2,000</strong>.</li>
                        <li>Maximum daily cashback is capped at <strong>$20</strong>, deposited to the Cashback Wallet.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Practice Mode</h3>
                      <p>
                        All new players receive a free promotional balance. Practice mode lets you study cabinet paces, 
                        understand dice-roll calculations, and practice risk-free.
                      </p>
                    </div>

                    <div className="doc-card">
                      <h3>Lucky Draw Jackpots</h3>
                      <div className="lucky-box">
                        <div>
                          <strong>Golden Draw ($10 ticket)</strong>
                          <p>1st: $10,000 | 2nd: $5,000 | 3rd: $4,000</p>
                        </div>
                        <div>
                          <strong>Silver Draw ($1 ticket)</strong>
                          <p>Top jackpot reward: $1,000. 10,000 tickets per draw with 1,000 winners.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Withdrawals & FAQ */}
              {activeTab === 'Withdrawals & FAQ' && (
                <div className="doc-section">
                  <h2>Withdrawals & FAQ</h2>
                  <p className="doc-lead">
                    Understand how withdrawals are processed into BTG tokens and search for answers to common questions.
                  </p>

                  <div className="doc-grid">
                    <div className="doc-card">
                      <h3>Withdrawal Rules</h3>
                      <ul className="guide-ul">
                        <li><strong>Minimum Withdrawal:</strong> $5 USDT</li>
                        <li><strong>Daily Limits:</strong> $5,000 USDT</li>
                        <li><strong>Processing Fee:</strong> 10%</li>
                        <li><strong>Payout Token:</strong> Sent in BTG (Bitgain Token) BEP-20</li>
                      </ul>
                    </div>

                    <div className="doc-card">
                      <h3>Automatic Conversion Process</h3>
                      <div className="process-box">
                        <div className="process-step"><span>1</span> Submit Request</div>
                        <div className="process-arrow">➔</div>
                        <div className="process-step"><span>2</span> Fee Deducted</div>
                        <div className="process-arrow">➔</div>
                        <div className="process-step"><span>3</span> USDT Converted</div>
                        <div className="process-arrow">➔</div>
                        <div className="process-step"><span>4</span> BTG Sent</div>
                      </div>
                      <p className="process-note">
                        Your USDT balance is automatically calculated, converted to BEP-20 BTG, and sent directly to your connected wallet.
                      </p>
                    </div>
                  </div>

                  {/* FAQ Search Section */}
                  <div className="faq-search-card">
                    <h3>Frequently Asked Questions</h3>
                    <div className="help-search">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <div className="faq-list">
                      {filteredFaqs.map((f, i) => {
                        const isOpen = openIndex === i;
                        return (
                          <div className="faq-item" key={f.q}>
                            <button
                              className="faq-question"
                              onClick={() => setOpenIndex(isOpen ? -1 : i)}
                              aria-expanded={isOpen}
                            >
                              <span>{f.q}</span>
                              <span className={`faq-icon ${isOpen ? 'faq-icon--open' : ''}`}>+</span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  className="faq-answer-wrap"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                >
                                  <p className="faq-answer">{f.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                      {filteredFaqs.length === 0 && (
                        <p className="faq-empty">No results for "{query}". Try another query.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="help-aside">
          <div className="help-aside-card">
            <h3>Still stuck?</h3>
            <p>Our support team replies within a day.</p>
            <Link to="/contact" className="btn btn--gold btn--block">Contact Us</Link>
          </div>
          <div className="help-aside-card">
            <h3>Play Responsibly</h3>
            <p>Real-money gaming and crypto products carry risk. Start with practice mode and only play with what you can afford.</p>
          </div>
          <div className="help-aside-card">
            <h3>BTG BEP-20 Contract</h3>
            <p>
              Bitgain (BTG) runs with a fixed supply of 41 Billion BTG. Burnable, deflationary, non-mintable code parameters protect token values.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
