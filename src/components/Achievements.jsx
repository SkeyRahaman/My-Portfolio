import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data';
import AnimatedNumber from './AnimatedNumber';
import { useCarousel } from '../utils/useCarousel';
import { CarouselDots, ChevronLeft, ChevronRight } from './CarouselUI';
import './Carousel.css';
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

function AchievementCard({ ach }) {
  return (
    <div className={`achievement-card ${ach.colorClass}`}>
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
        <a 
          href={ach.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="achievement-link"
          onPointerDown={(e) => e.stopPropagation()}
        >
          View Profile →
        </a>
      )}
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { currentIndex, x, handlers, isActive, snapTo } = useCarousel({
    itemCount: achievements.length,
    trackRef,
  });

  return (
    <section className="achievements section" id="achievements">
      <div className="container" ref={sectionRef}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Coding metrics & milestones</h2>
        </motion.div>

        {isActive ? (
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
                  {achievements.map((ach) => (
                    <div key={ach.platform} className="carousel-slide">
                      <AchievementCard ach={ach} />
                    </div>
                  ))}
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
              {currentIndex < achievements.length - 1 && (
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
              count={achievements.length}
              current={currentIndex}
              onDotPress={(i) => snapTo(i, 0)}
            />
          </div>
        ) : (
          <motion.div
            className="achievements-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {achievements.map((ach) => (
              <motion.div
                key={ach.platform}
                variants={cardVariants}
                whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <AchievementCard ach={ach} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
