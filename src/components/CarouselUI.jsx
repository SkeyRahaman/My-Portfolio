import { motion } from 'framer-motion';

export const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export function CarouselDots({ count, current, onDotPress }) {
  return (
    <div className="carousel-dots" role="tablist" aria-label="Slides">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
          onClick={() => onDotPress(i)}
          animate={{
            scale:   i === current ? 1 : 0.8,
            opacity: i === current ? 1 : 0.3,
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        />
      ))}
    </div>
  );
}

