import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications, education } from '../data';
import { useCarousel } from '../utils/useCarousel';
import { CarouselDots, ChevronLeft, ChevronRight } from './CarouselUI';
import './Carousel.css';
import './Credentials.css';

const spring = { type: 'spring', bounce: 0, duration: 0.6 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};

function CertificationCard({ cert }) {
  return (
    <div className="certification-card">
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
          <a 
            href={cert.badgeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="certification-link"
            onPointerDown={(e) => e.stopPropagation()}
          >
            Verify Badge
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

function EducationCard({ edu }) {
  return (
    <div className="education-card">
      <div className="education-icon">🎓</div>
      <div className="education-info">
        <h3>{edu.university}</h3>
        <p className="education-degree">{edu.degree}</p>
        <div className="education-meta">
          <span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {edu.period}
          </span>
          <span className="education-gpa">DGPA: {edu.gpa}</span>
        </div>
      </div>
    </div>
  );
}

export default function Credentials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Calculate total items for carousel
  const certsCount = certifications ? certifications.length : 0;
  const eduCount = education ? 1 : 0;
  const itemsCount = certsCount + eduCount;

  const { currentIndex, x, handlers, isActive, snapTo } = useCarousel({
    itemCount: itemsCount,
    trackRef,
  });

  return (
    <section className="certifications section" id="credentials">
      <div className="container" ref={sectionRef}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Verified credentials & Academic background</h2>
        </motion.div>

        {isActive && itemsCount > 0 ? (
          <div className="carousel-viewport">
            <div className="carousel-stage">
              <div className="carousel-track-clip" style={{ touchAction: 'pan-y' }}>
                <motion.div
                  ref={trackRef}
                  className="carousel-track"
                  style={{ x }}
                  {...handlers}
                  whileTap={{ cursor: 'grabbing' }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {certifications && certifications.map((cert) => (
                    <div key={cert.title} className="carousel-slide">
                      <CertificationCard cert={cert} />
                    </div>
                  ))}
                  {education && (
                    <div key="education" className="carousel-slide">
                      <EducationCard edu={education} />
                    </div>
                  )}
                </motion.div>
              </div>

              {currentIndex > 0 && (
                <button
                  className="carousel-arrow carousel-arrow--left"
                  onClick={() => snapTo(currentIndex - 1, 0)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Previous slide"
                >
                  <ChevronLeft />
                </button>
              )}
              {currentIndex < itemsCount - 1 && (
                <button
                  className="carousel-arrow carousel-arrow--right"
                  onClick={() => snapTo(currentIndex + 1, 0)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Next slide"
                >
                  <ChevronRight />
                </button>
              )}
            </div>

            <CarouselDots
              count={itemsCount}
              current={currentIndex}
              onDotPress={(i) => snapTo(i, 0)}
            />
          </div>
        ) : (
          <motion.div
            className="certifications-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {certifications && certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <CertificationCard cert={cert} />
              </motion.div>
            ))}

            {education && (
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <EducationCard edu={education} />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
