import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, achievements } from '../data';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';
import './About.css';

function getMonthsSince(startDateStr) {
  const start = new Date(startDateStr);
  const end = new Date();
  return (end.getFullYear() - start.getFullYear()) * 12 - start.getMonth() + end.getMonth();
}

function formatExperience(months) {
  const roundedMonths = Math.floor(months);
  if (roundedMonths <= 0) return '1 mo';
  const y = Math.floor(roundedMonths / 12);
  const m = roundedMonths % 12;
  let res = [];
  if (y > 0) res.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m > 0) res.push(`${m} mo${m > 1 ? 's' : ''}`);
  return res.join(' ');
}

/* §4 Springs: critically damped default — no overshoot for UI reveals */
const cardSpring = { type: 'spring', bounce: 0, duration: 0.6 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: cardSpring },
};

/* Animated counter — counts up when visible */
function AnimatedNumber({ value, suffix = '', formatter = null }) {
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
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const displayValue = formatter 
    ? formatter(count)
    : Number.isInteger(value) 
      ? Math.floor(count) 
      : count.toFixed(2);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const leetcodeData = achievements.find(a => a.platform === 'LeetCode');
  const fallbackStats = leetcodeData ? leetcodeData.stats : [];
  const username = leetcodeData?.link?.split('/').filter(Boolean).pop();
  const { stats: leetcodeStats } = useLeetCodeStats(username, fallbackStats);
  const topGlobalStat = leetcodeStats[0];

  const totalExperienceMonths = getMonthsSince('2021-08-01');

  return (
    <section className="about section" id="about">
      <div className="container" ref={ref}>
        <div className="about-content">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={cardSpring}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Engineering solutions,<br />not just writing code.
            </h2>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...cardSpring, delay: 0.15 }}
          >
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="about-quote">"{about.quote}"</div>
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {about.stats.map((stat) => {
            let value = stat.value;
            let suffix = stat.suffix;
            let formatter = null;

            if (stat.id === 'experience') {
              value = totalExperienceMonths;
              formatter = formatExperience;
            } else if (stat.id === 'leetcode') {
              value = topGlobalStat?.value || stat.value;
              suffix = topGlobalStat?.suffix || stat.suffix;
            }

            return (
              <motion.div key={stat.label} className="stat-card" variants={itemVariants}>
                <div className="stat-number">
                  <AnimatedNumber value={value} suffix={suffix} formatter={formatter} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
