import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data';
import './Skills.css';

/* §4: critically damped spring for card reveals */
const cardSpring = { type: 'spring', bounce: 0, duration: 0.5 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: cardSpring },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="skills section" id="skills">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={cardSpring}
        >
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-subtitle">
            A curated set of tools for building scalable backend systems,
            cloud-native architectures, and AI-powered pipelines.
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {skills.map((cat) => (
            <motion.div
              key={cat.category}
              className="skill-category"
              variants={cardVariants}
              /* §3 Interruptibility: whileHover springs are interruptible by default */
              whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
            >
              <div className="skill-category-header">
                <div className={`skill-icon ${cat.colorClass}`}>{cat.icon}</div>
                <span className="skill-category-name">{cat.category}</span>
              </div>
              <div className="skill-tags">
                {cat.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
