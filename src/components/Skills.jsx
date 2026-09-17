import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data';
import { useCarousel } from '../utils/useCarousel';
import { CarouselDots, ChevronLeft, ChevronRight } from './CarouselUI';
import './Carousel.css';
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

function SkillCard({ cat }) {
  return (
    <div className={`skill-category ${cat.colorClass}`}>
      <div className="skill-category-header">
        <div className="skill-icon">{cat.icon}</div>
        <span className="skill-category-name">{cat.category}</span>
      </div>
      <div className="skill-tags">
        {cat.items.map((item) => (
          <span key={item} className="skill-tag">{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { currentIndex, x, handlers, isActive, snapTo } = useCarousel({
    itemCount: skills.length,
    trackRef,
  });

  return (
    <section className="skills section" id="skills">
      <div className="container" ref={sectionRef}>
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
                  {skills.map((cat) => (
                    <div key={cat.category} className="carousel-slide">
                      <SkillCard cat={cat} />
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
              {currentIndex < skills.length - 1 && (
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
              count={skills.length}
              current={currentIndex}
              onDotPress={(i) => snapTo(i, 0)}
            />
          </div>
        ) : (
          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {skills.map((cat) => (
              <motion.div
                key={cat.category}
                variants={cardVariants}
                whileHover={{ y: -2, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <SkillCard cat={cat} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
