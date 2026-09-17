import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data';
import { useCarousel } from '../utils/useCarousel';
import { CarouselDots, ChevronLeft, ChevronRight } from './CarouselUI';
import './Carousel.css';
import './Projects.css';

const spring = { type: 'spring', bounce: 0, duration: 0.5 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const GithubIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ── Project card — shared between carousel and grid ────────────────── */
function ProjectCard({ proj, isCarousel }) {
  return (
    <div className="project-card">
      <div className="project-hero">
        {proj.image && (
          <img src={proj.image} alt={proj.name} draggable={false} />
        )}
        <div className="project-icon">{proj.icon}</div>
      </div>
      <div className="project-body">
        <h3 className="project-name">{proj.name}</h3>
        <p className="project-desc">{proj.description}</p>
        <div className="project-tech">
          {proj.tech.map((t) => (
            <span key={t} className="project-tech-tag">{t}</span>
          ))}
        </div>
        <a
          href={proj.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          {...(isCarousel ? { onPointerDown: (e) => e.stopPropagation() } : {})}
        >
          <GithubIcon /> Source Code
        </a>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const { currentIndex, x, handlers, isActive, snapTo } = useCarousel({
    itemCount: projects.length,
    trackRef,
  });

  return (
    <section className="projects section" id="projects">
      <div className="container" ref={sectionRef}>
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I&apos;ve built</h2>
          <p className="section-subtitle">
            Open-source projects and production-grade systems exploring distributed
            architecture, AI agents, and full-stack development.
          </p>
        </motion.div>

        {/* ── Mobile carousel ── */}
        {isActive ? (
          <div className="carousel-viewport">
            <div className="carousel-stage">
              <div
                className="carousel-track-clip"
                style={{ touchAction: 'pan-y' }}
              >
                <motion.div
                  ref={trackRef}
                  className="carousel-track"
                  style={{ x }}
                  {...handlers}
                  whileTap={{ cursor: 'grabbing' }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {projects.map((proj) => (
                    <div key={proj.name} className="carousel-slide">
                      <ProjectCard proj={proj} isCarousel />
                    </div>
                  ))}
                </motion.div>
              </div>

              {currentIndex > 0 && (
                <button
                  className="carousel-arrow carousel-arrow--left"
                  onClick={() => snapTo(currentIndex - 1, 0)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Previous project"
                >
                  <ChevronLeft />
                </button>
              )}
              {currentIndex < projects.length - 1 && (
                <button
                  className="carousel-arrow carousel-arrow--right"
                  onClick={() => snapTo(currentIndex + 1, 0)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Next project"
                >
                  <ChevronRight />
                </button>
              )}
            </div>

            <CarouselDots
              count={projects.length}
              current={currentIndex}
              onDotPress={(i) => snapTo(i, 0)}
            />
          </div>
        ) : (
          /* ── Desktop grid (unchanged) ── */
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {projects.map((proj) => (
              <motion.div
                key={proj.name}
                className="project-card-wrapper"
                variants={cardVariants}
                whileHover={{ y: -4, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <ProjectCard proj={proj} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
