import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data';
import AnimatedNumber from './AnimatedNumber';
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

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
                </div>
                <div className="achievement-stats">
                  {ach.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="achievement-stat-value">
                        <AnimatedNumber value={stat.value} />{stat.suffix}
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
