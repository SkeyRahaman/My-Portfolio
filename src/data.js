// ============================================================
// PORTFOLIO DATA - Single source of truth
// Update this file to change all portfolio content.
// ============================================================

import profilePhoto from './assets/shakib-profile.webp';

// Certification Badges
import certClaudeFoundations from './assets/cert-claude-foundations.png';
import certClaudeProfessional from './assets/cert-claude-professional.png';

// Project Images
import imgAiExtraction from './assets/projects/ai-extraction-pipeline.jpg';
import imgPolling from './assets/projects/polling-website.jpg';
import imgUsersModule from './assets/projects/users-module.jpg';
import imgUrlShortner from './assets/projects/url-shortner.jpg';
import imgKharchaKhata from './assets/projects/kharchakhata.jpg';
import imgBlogit from './assets/projects/blogit.jpg';

export const personalInfo = {
  name: "Md Shakib Mondal",
  firstName: "Md Shakib",
  lastName: "Mondal",
  title: "Backend Software Engineer",
  tagline: "Backend Software Engineer · Open-Source Contributor",
  location: "Kolkata, India",
  openTo: "Backend Developer / SDE / AI Engineering roles",
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
    items: ["PostgreSQL", "MySQL", "SingleStore", "SQLite", "FAISS 🐛"],
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
    items: ["Pandas", "Rundeck", "ServiceNow", "Reading Error Logs at 3 AM"],
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
      "Architected the migration of <strong>3 high-traffic microservices</strong> from Django REST to asynchronous FastAPI, increasing system throughput by <strong>40%</strong> and reducing p95 latency under peak load.",
      "Optimized application reliability by introducing database connection pooling and tuning Kubernetes resource limits; <strong>eliminated OOM crashes</strong> across distributed clusters.",
      "Designed a highly concurrent REST backend for a data planning dashboard, engineering an event-driven pipeline to serve SingleStore metrics with <strong>sub-second response times</strong>.",
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
      "Designed and deployed a scalable FastAPI orchestration service to automate enterprise-wide provisioning workflows, processing <strong>500+ monthly requests</strong> and reducing manual overhead by <strong>40%</strong>.",
      "Engineered an end-to-end identity management API workflow, handling <strong>1,000+ concurrent state-change requests</strong> per month.",
      "Developed an asynchronous data archiving pipeline processing up to <strong>5 GB</strong> of remote telemetry logs per batch, utilizing AWS S3 for fault-tolerant storage.",
    ],
  },
];

export const projects = [
  {
    name: "Multi-Agent AI Extraction Pipeline",
    problem: "Extracting structured data from unstructured documents required manual review and multiple tool handoffs.",
    built: "Distributed multi-agent architecture using Google ADK & LangGraph with MCP and Agent-to-Agent protocol. Hybrid RAG engine (FAISS + BM25) with enterprise-grade AI guardrails.",
    result: "Fully automated extraction pipeline with built-in traceability via Langfuse and multi-model fallback through LiteLLM.",
    tech: ["Google ADK", "LangGraph", "FAISS", "Azure OpenAI", "Langfuse"],
    image: imgAiExtraction,
    github: "https://github.com/SkeyRahaman",
  },
  {
    name: "Polling Website",
    problem: "Vote recording under traffic spikes caused request timeouts and dropped writes.",
    built: "Kafka-driven event pipeline decoupling votes from the request path, with Django REST serving the frontend and FastAPI handling async vote processing.",
    result: "Asynchronous vote pipeline that shields the request path from spikes with zero dropped writes.",
    tech: ["Django REST", "FastAPI", "Kafka", "PostgreSQL"],
    image: imgPolling,
    github: "https://github.com/SkeyRahaman/Polling-Website",
  },
  {
    name: "Users Module",
    problem: "Every new project needed authentication boilerplate from scratch — JWT setup, OAuth2 flows, role management.",
    built: "Plug-and-play user authentication & authorization microservice stack featuring JWT, OAuth2, and Role-Based Access Control (RBAC).",
    result: "Reusable auth microservice that plugs into any FastAPI project with zero boilerplate.",
    tech: ["FastAPI", "PostgreSQL", "Docker", "JWT", "RBAC"],
    image: imgUsersModule,
    github: "https://github.com/SkeyRahaman/Users-Module",
  },
  {
    name: "URL Shortener",
    problem: "Needed a fast, self-hosted URL shortener with customizable slugs and API key auth.",
    built: "FastAPI service with customizable short URLs, built-in API authentication, and persistent SQL storage.",
    result: "Lightweight, deployable service with sub-50ms redirect latency.",
    tech: ["FastAPI", "Python", "SQL", "CRUD"],
    image: imgUrlShortner,
    github: "https://github.com/SkeyRahaman/URL_Shortner",
  },
  {
    name: "KharchaKhata",
    problem: "Tracking personal expenses across categories with no visual insight into spending patterns.",
    built: "Expense manager with dynamic data visualizations, cloud storage via AWS S3, and secure OAuth login.",
    result: "Full-stack expense tracker with category breakdowns and cloud-synced data.",
    tech: ["Python", "Flask", "PostgreSQL", "S3", "OAuth"],
    image: imgKharchaKhata,
    github: "https://github.com/SkeyRahaman/kharchakhata",
  },
  {
    name: "Blogit",
    problem: "Wanted a full-featured blogging platform with social features — not just a static site generator.",
    built: "Django blogging platform with bookmarks, likes, user subscriptions, and complete CRUD operations.",
    result: "Multi-user blog with subscription feeds and interaction features.",
    tech: ["Django", "SQLite", "CSS"],
    image: imgBlogit,
    github: "https://github.com/SkeyRahaman/Blogit",
  },
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
    description: "Consistently ranked in the top 3.23% of competitive programmers globally, demonstrating strong algorithmic problem-solving skills.",
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
    title: "Claude Certified Architect - Professional",
    issuer: "Anthropic",
    badgeUrl: "https://www.credly.com/badges/b6dc32f3-7428-47a6-94f2-20cfcc173efd/public_url",
    issued: "November 2026",
    expires: "November 2027",
    icon: certClaudeProfessional,
  },{
    title: "Claude Certified Architect - Foundations",
    issuer: "Anthropic",
    badgeUrl: "https://www.credly.com/badges/6af72369-0620-493b-99ba-321b846ea291/public_url",
    issued: "August 2026",
    expires: "August 2027",
    icon: certClaudeFoundations,
  },
];
