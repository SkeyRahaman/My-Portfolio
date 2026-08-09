import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../data';
import './Certifications.css';

const spring = { type: 'spring', bounce: 0, duration: 0.6 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="certifications section" id="certifications">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Certifications</span>
          <h2 className="section-title">Verified credentials</h2>
        </motion.div>

        <motion.div
          className="certifications-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              className="certification-card"
              variants={cardVariants}
              whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
            >
              <div className="certification-icon">{cert.icon}</div>
              
              <div className="certification-info">
                <h3 className="certification-title">{cert.title}</h3>
                <div className="certification-issuer">{cert.issuer}</div>
                <div className="certification-meta">
                  <span>Issued: {cert.issued}</span>
                  {cert.expires && <span>Expires: {cert.expires}</span>}
                </div>
              </div>

              <div className="certification-action">
                {cert.badgeUrl && (
                  <a href={cert.badgeUrl} target="_blank" rel="noopener noreferrer" className="certification-link">
                    Verify Badge
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
