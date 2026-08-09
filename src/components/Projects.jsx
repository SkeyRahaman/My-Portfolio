import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { manualProjects, githubProjectNames } from '../data';
import { useGithubProjects } from '../hooks/useGithubProjects';
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

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { projects: fetchedProjects, loading } = useGithubProjects('SkeyRahaman', githubProjectNames);

  // Combine manual projects with the fetched GitHub projects
  const allProjects = useMemo(() => {
    const dynamicProjects = fetchedProjects.map((repo, idx) => ({
      name: repo.name.replace(/-/g, ' '),
      description: repo.description || 'An open-source repository.',
      tech: repo.language ? [repo.language] : ['Various'],
      icon: '💻', // Default icon for GitHub repos
      gradient: `gradient-${(idx % 6) + 1}`, // Cycle through available gradients (1-6)
      github: repo.html_url
    }));

    return [...manualProjects, ...dynamicProjects];
  }, [fetchedProjects]);

  return (
    <section className="projects section" id="projects">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            Open-source projects and production-grade systems exploring distributed
            architecture, AI agents, and full-stack development.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {loading ? (
            <div style={{ color: 'var(--text-tertiary)' }}>Loading live repositories...</div>
          ) : (
            allProjects.map((proj) => (
              <motion.div
                key={proj.name}
                className="project-card"
                variants={cardVariants}
                whileHover={{ y: -4, transition: { type: 'spring', bounce: 0, duration: 0.3 } }}
              >
                <div className={`project-hero ${proj.gradient}`}>
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
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <GithubIcon /> Source Code
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
