import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';
import './Achievements.css';

const spring = { type: 'spring', bounce: 0, duration: 0.6 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};

function AnimatedNumber({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const leetcodeData = achievements.find(a => a.platform === 'LeetCode');
  const fallbackStats = leetcodeData ? leetcodeData.stats : [];
  const username = leetcodeData?.link?.split('/').filter(Boolean).pop();
  
  const { stats: leetcodeLiveStats, isLive } = useLeetCodeStats(username, fallbackStats);

  return (
    <section className="achievements section" id="achievements">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Coding metrics & milestones</h2>
        </motion.div>

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {achievements.map((ach) => {
            const isLeetCode = ach.platform === 'LeetCode';
            const currentStats = isLeetCode ? leetcodeLiveStats : ach.stats;

            return (
              <motion.div
                key={ach.platform}
                className={`achievement-card ${ach.colorClass}`}
                variants={cardVariants}
                whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <div className="achievement-platform">
                  <div className="achievement-platform-icon">{ach.platformIcon}</div>
                  <span className="achievement-platform-name">{ach.platform}</span>
                  {isLeetCode && isLive && (
                    <span className="live-indicator">
                      <span className="live-dot"></span> Live
                    </span>
                  )}
                </div>
                <div className="achievement-stats">
                  {currentStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="achievement-stat-value">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="achievement-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="achievement-desc">{ach.description}</p>
                {ach.link && (
                  <a href={ach.link} target="_blank" rel="noopener noreferrer" className="achievement-link">
                    View Profile →
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
