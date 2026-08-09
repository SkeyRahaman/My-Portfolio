import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data';
import './Education.css';

const spring = { type: 'spring', bounce: 0, duration: 0.6 };

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="education section" id="education">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic background</h2>
        </motion.div>

        <motion.div
          className="education-card"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.15 }}
        >
          <div className="education-icon">🎓</div>
          <div className="education-info">
            <h3>{education.university}</h3>
            <p className="education-degree">{education.degree}</p>
            <div className="education-meta">
              <span>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {education.period}
              </span>
              <span className="education-gpa">DGPA: {education.gpa}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
