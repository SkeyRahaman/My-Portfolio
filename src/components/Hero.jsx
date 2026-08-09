import { motion } from 'framer-motion';
import { personalInfo, achievements } from '../data';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';
import './Hero.css';

function getMonthsSince(startDateStr) {
  const start = new Date(startDateStr);
  const end = new Date();
  return (end.getFullYear() - start.getFullYear()) * 12 - start.getMonth() + end.getMonth();
}

function formatExperienceShort(months) {
  if (months <= 0) return '1 mo';
  const y = Math.floor(months / 12);
  const m = months % 12;
  let res = [];
  if (y > 0) res.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m > 0) res.push(`${m} mo${m > 1 ? 's' : ''}`);
  return res.join(' ');
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const floatVariants = {
  animate: (i) => ({
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 2,
    },
  }),
};

export default function Hero() {
  const leetcodeData = achievements.find(a => a.platform === 'LeetCode');
  const fallbackStats = leetcodeData ? leetcodeData.stats : [];
  const username = leetcodeData?.link?.split('/').filter(Boolean).pop();
  const { stats: leetcodeStats } = useLeetCodeStats(username, fallbackStats);
  const totalExperienceMonths = getMonthsSince('2021-08-01');

  return (
    <section className="hero section" id="hero">
      <div className="hero-grid" />
      <div className="container">
        <div className="hero-content">
          <motion.h1
            className="hero-name"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className="gradient-text">{personalInfo.firstName}</span>
            <br />
            {personalInfo.lastName}
          </motion.h1>

          <motion.p
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            I build fast backend systems, design event-driven microservices, and
            experiment with AI agent orchestration. Turning complex problems into
            scalable, automated solutions.
          </motion.p>

          <motion.div
            className="hero-cta"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <a href="#contact" className="btn btn-primary">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
            <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-photo-container">
            <div className="hero-photo-glow" />
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.name} — Backend Software Engineer`}
              className="hero-photo"
            />
            {[
              { value: `${leetcodeStats[1]?.value || 1502}+`, label: 'LeetCode Problems' },
              { value: formatExperienceShort(totalExperienceMonths), label: 'Experience' },
              { value: `Top ${leetcodeStats[0]?.value || 3.23}%`, label: 'Global Ranking' },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                className="floating-card"
                custom={i}
                variants={floatVariants}
                animate="animate"
              >
                <div className="card-value">{card.value}</div>
                <div className="card-label">{card.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
