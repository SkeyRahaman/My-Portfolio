import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data';
import './Experience.css';

/* §4: critically damped spring — graceful, no bounce for static UI */
const spring = { type: 'spring', bounce: 0, duration: 0.6 };

function computeDuration(startStr, endStr) {
  if (!startStr) return null;
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date();
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  
  if (months <= 0) return '1 mo';
  
  const y = Math.floor(months / 12);
  const m = months % 12;
  
  let res = [];
  if (y > 0) res.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m > 0) res.push(`${m} mo${m > 1 ? 's' : ''}`);
  
  return res.join(' ');
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="experience section" id="experience">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">Where I've built things</h2>
          <p className="section-subtitle">
            Delivering production-grade backend systems at enterprise scale.
          </p>
        </motion.div>

        <div className="timeline">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              /* §7 Spatial consistency: all items enter from same direction (bottom) */
              transition={{ ...spring, delay: i * 0.2 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-company">{job.company}</h3>
                    <p className="timeline-role">{job.role}</p>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-date">
                      {job.period} {job.startDate && `· ${computeDuration(job.startDate, job.endDate)}`}
                    </span>
                    <span className="timeline-account">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 7h-3a2 2 0 01-2-2V2" />
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                      </svg>
                      {job.account}
                    </span>
                  </div>
                </div>
                <div className="timeline-achievements">
                  {job.achievements.map((text, j) => (
                    <p key={j} className="timeline-achievement">{text}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
