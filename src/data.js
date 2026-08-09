// ============================================================
// PORTFOLIO DATA — Single source of truth
// Update this file to change all portfolio content.
// ============================================================

import profilePhoto from './assets/IMG_20250422_092237_639.webp';

export const personalInfo = {
  name: "Md Shakib Mondal",
  firstName: "Md Shakib",
  lastName: "Mondal",
  title: "Backend Software Engineer · Microservices Architect",
  tagline: "Backend Software Engineer | Microservices Architect | Open-Source Enthusiast",
  location: "Kolkata, India",
  email: "sakibmondal7@gmail.com",
  phone: "+91-8240618068",
  photo: profilePhoto,
  links: {
    linkedin: "https://www.linkedin.com/in/shakib-mondal/",
    github: "https://github.com/SkeyRahaman",
    leetcode: "https://leetcode.com/sakibmondal7/",
    portfolio: "http://sakibmondal7.pythonanywhere.com/",
  },
};

export const about = {
  paragraphs: [
    "I am a Backend Software Engineer with a deep focus on distributed systems and microservice architecture. My expertise lies in designing resilient infrastructure, managing asynchronous workflows, and tuning system performance to deliver seamless experiences.",
    "From resolving critical security vulnerabilities to re-architecting monolithic services into high-throughput APIs, I take pride in engineering the robust foundation that products rely on. I also bridge the gap between traditional backend systems and artificial intelligence, building autonomous AI agents and integrating language models to automate complex workflows. I don't just solve tickets; I engineer long-term solutions."
  ],
  quote: "An engineer by choice, driven by a lifelong curiosity to understand how things work and the passion to build them better.",
  stats: [
    { id: "experience", value: 43, suffix: "", label: "Experience" },
    { id: "leetcode", value: 3.23, suffix: "%", label: "LeetCode Top Global" },
    { id: "github", value: 26, suffix: "", label: "GitHub Repositories" },
    { id: "throughput", value: 40, suffix: "%", label: "Throughput Boost" },
  ],
};

export const skills = [
  {
    category: "Languages",
    icon: "⟨⟩",
    colorClass: "lang",
    items: ["Python", "SQL", "Bash"],
  },
  {
    category: "Backend & Frameworks",
    icon: "⚙",
    colorClass: "backend",
    items: ["FastAPI", "Django", "Django REST", "Flask", "SQLAlchemy 2.0", "Pydantic v2"],
  },
  {
    category: "Databases",
    icon: "🗄",
    colorClass: "db",
    items: ["PostgreSQL", "MySQL", "SingleStore", "SQLite", "FAISS"],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁",
    colorClass: "cloud",
    items: ["AWS S3", "Docker", "Kubernetes", "Kafka", "GitHub Actions", "pytest", "Grafana", "CI/CD"],
  },
  {
    category: "AI/ML & Agents",
    icon: "🧠",
    colorClass: "ai",
    items: ["LangGraph", "Google ADK", "RAG", "LiteLLM", "Langfuse", "Azure OpenAI", "BM25"],
  },
  {
    category: "Workflow Automation",
    icon: "⚡",
    colorClass: "auto",
    items: ["Pandas", "Rundeck", "ServiceNow"],
  },
];

export const experience = [
  {
    company: "Infosys",
    role: "Specialist Programmer",
    account: "Apple",
    location: "Kolkata, India",
    period: "Mar 2025 – Present",
    startDate: "2025-03",
    endDate: null,
    achievements: [
      "Architected the migration of 3 high-traffic microservices from Django REST to asynchronous FastAPI, increasing system throughput by 40% and reducing p95 latency under peak load.",
      "Optimized application reliability by introducing database connection pooling and tuning Kubernetes resource limits; eliminated OOM crashes across distributed clusters.",
      "Designed a highly concurrent REST backend for a data planning dashboard, engineering an event-driven pipeline to serve SingleStore metrics with sub-second response times.",
      "Implemented a scalable data ingestion architecture using AWS S3, enabling parallel processing of bulk uploads with asynchronous event notifications.",
      "Remediated security vulnerabilities across a 20-node microservice architecture, eliminating SQL injection vectors.",
    ],
  },
  {
    company: "Accenture",
    role: "Software Engineer",
    account: "SAP",
    location: "Kolkata, India",
    period: "Aug 2021 – Mar 2025",
    startDate: "2021-08",
    endDate: "2025-03",
    achievements: [
      "Designed and deployed a scalable FastAPI orchestration service to automate enterprise-wide provisioning workflows, processing 500+ monthly requests and reducing manual overhead by 40%.",
      "Engineered an end-to-end identity management API workflow, handling 1,000+ concurrent state-change requests per month.",
      "Developed an asynchronous data archiving pipeline processing up to 5 GB of remote telemetry logs per batch, utilizing AWS S3 for fault-tolerant storage.",
      "Containerized the application suite using Docker for VPC deployment, reducing post-deployment regressions by 45%.",
      "Streamlined Active Directory user management (reducing manual effort by 60%) and automated log download/storage processes.",
    ],
  },
];

export const manualProjects = [
  {
    name: "Multi-Agent AI Extraction Pipeline",
    description: "Distributed multi-agent architecture using Google ADK & LangGraph with MCP and Agent-to-Agent protocol. Hybrid RAG engine (FAISS + BM25) and enterprise-grade AI guardrails.",
    tech: ["Google ADK", "LangGraph", "FAISS", "Azure OpenAI", "Langfuse"],
    icon: "🤖",
    gradient: "gradient-2",
    github: "https://github.com/SkeyRahaman",
  }
];

export const githubProjectNames = [
  "Polling-Website",
  "Users-Module",
  "URL_Shortner",
  "kharchakhata",
  "Blogit"
];

export const achievements = [
  {
    platform: "LeetCode",
    platformIcon: "LC",
    colorClass: "leetcode",
    stats: [
      { value: 3.23, suffix: "%", label: "Top Global" },
      { value: 1502, suffix: "+", label: "Problems Solved" },
      { value: 1960, suffix: "+", label: "Contest Rating" },
    ],
    description: "Consistently ranked in the top 2% of competitive programmers globally, demonstrating strong algorithmic problem-solving skills.",
    link: "https://leetcode.com/sakibmondal7/",
  },
  {
    platform: "GeeksForGeeks",
    platformIcon: "GfG",
    colorClass: "gfg",
    stats: [
      { value: 250, suffix: "+", label: "Problems Solved" },
    ],
    description: "Extensive practice across data structures, algorithms, and core computer science fundamentals on one of India's leading coding platforms.",
    link: null,
  },
];

export const education = {
  university: "Maulana Abul Kalam Azad University of Technology",
  degree: "BTech in Computer Science",
  period: "July 2017 – June 2021",
  gpa: "8.96 / 10.0",
};

export const certifications = [
  {
    title: "Claude Certified Architect - Foundations",
    issuer: "Anthropic",
    badgeUrl: "https://www.credly.com/badges/6af72369-0620-493b-99ba-321b846ea291",
    issued: "August 2026",
    expires: "August 2027",
    icon: "🏛️",
  },
];
