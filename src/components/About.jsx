import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about } from '../data';
import AnimatedNumber from './AnimatedNumber';
import { getMonthsSince, formatExperience } from '../utils/dateUtils';
import './About.css';

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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
            let formatter = Math.floor;

            if (stat.id === 'experience') {
              value = totalExperienceMonths;
              formatter = formatExperience;
            } else if (!Number.isInteger(value)) {
              formatter = (val) => val.toFixed(2);
            }

            return (
              <motion.div key={stat.label} className="stat-card" variants={itemVariants}>
                <div className="stat-number">
                  <AnimatedNumber value={value} formatter={formatter} />{stat.suffix}
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
