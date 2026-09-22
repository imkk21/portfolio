// All portfolio content lives here. Edit this file to update the site.

export const PROFILE = {
  name: "Kunal Kumar",
  first: "Kunal",
  last: "Kumar",
  role: "Backend Developer",
  company: "Attrivo",
  location: "Bengaluru, India",
  email: "kunalkumar12350@gmail.com",
  phone: "+91 8619045960",
  resume: "/resume/Kunal_Kumar_Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/imkk21" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kunal-kumar-a7176219b" },
    { label: "LeetCode", href: "https://leetcode.com/u/kunalkumar2111/" },
  ],
};

// Words that cycle in the hero: "I build ___"
export const ROTATOR = ["scalable REST APIs.", "ClickHouse analytics pipelines.", "OAuth 2.0 integrations.", "systems that stay up."];

export const MANIFESTO =
  "I'm a backend developer at Attrivo in Bengaluru, building Spring Boot analytics APIs on MySQL and ClickHouse for a mobile attribution platform. I care about query performance, API security and integrations that don't break at 3am. MCA from VIT, with full-stack projects across React, Node.js and LLM APIs.";

export const STATS = [
  { end: 8.9, decimals: 1, suffix: "k", label: "Rows per report — down from 3.27M after moving session aggregation into ClickHouse" },
  { end: 40, prefix: "~", suffix: "%", label: "Less manual monitoring effort through shell-script automation" },
  { end: 25, suffix: "%", label: "Faster feature integration on Angular + Laravel MVC applications" },
  { end: 10, suffix: "+", label: "Linux servers configured, troubleshot and kept online" },
];

export const EXPERIENCE = [
  {
    role: "Backend Developer",
    company: "Attrivo",
    location: "Bengaluru",
    period: "Aug 2026 — Present",
    current: true,
    tech: ["Java", "Spring Boot", "MySQL", "ClickHouse", "OAuth 2.0", "AWS"],
    bullets: [
      "Build and optimize Spring Boot analytics REST APIs (MySQL + ClickHouse) for a mobile attribution platform, with server-side pagination, segment breakdowns and ROAS/ARPU/CTR metrics.",
      "Cut rows pulled to the API tier from 3.27M to ~8.9k by moving session aggregation into ClickHouse, removing an AWS CPU spike and speeding up reports.",
      "Implemented Meta OAuth 2.0 integration with MySQL token storage, shipped same-day production hotfixes, and wrote API specs for frontend and client teams.",
    ],
  },
  {
    role: "Trainee, Networking",
    company: "Global AI",
    location: "Noida",
    period: "Oct 2023 — Jun 2024",
    tech: ["Linux", "Shell Scripting", "Networking"],
    bullets: [
      "Configured and troubleshot Linux systems and network infrastructure for 10+ internal servers, resolving connectivity issues and reducing downtime.",
      "Automated routine monitoring with shell scripts, cutting manual inspection effort by ~40%.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Webanix",
    location: "Udaipur",
    period: "Jun 2023 — Aug 2023",
    tech: ["Angular", "Laravel (PHP)", "MVC"],
    bullets: [
      "Built and maintained 3+ full-stack web applications with Angular and Laravel (PHP) using MVC architecture, reducing feature integration time by 25%.",
      "Developed 15+ reusable Angular components, cutting front-end development time for new features by 20%.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "Insightify",
    tagline: "AI-Powered Developer Intelligence Dashboard",
    description: "Developer productivity portal unifying GitHub analytics, live weather and tech news. Full React frontend with Firebase Auth, Node.js/MongoDB Atlas backend, and Gemini API for personalized weekly insights.",
    stack: ["React", "Node.js", "MongoDB Atlas", "Firebase Auth", "Gemini API"],
    live: "https://insightifyweb.vercel.app",
    github: "https://github.com/imkk21/Insightify",
    hue: 265,
  },
  {
    name: "DevSync",
    tagline: "Real-Time Collaborative Cloud IDE",
    description: "Real-time collaborative code editor on Supabase live data. Judge0 integration for sandboxed execution in 10+ languages with sub-2-second feedback, so multiple developers can edit and run code together in the browser.",
    stack: ["JavaScript", "Supabase", "Judge0 API", "Docker"],
    live: "https://devsyncide.vercel.app",
    github: "https://github.com/imkk21/DevSync",
    hue: 200,
  },
  {
    name: "DocFlow",
    tagline: "Async Document Processing Pipeline",
    description: "Backend pipeline using Redis Pub/Sub and Celery task queues to orchestrate asynchronous document extraction and analysis over PostgreSQL.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    github: "https://github.com/imkk21/docflow",
    hue: 20,
  },
  {
    name: "AI Code Reviewer",
    tagline: "LLM-Assisted Pull Request Review",
    description: "Fuses static rules (SQL injection, hardcoded secrets) with Gemini structured output, returning validated JSON with severity, explanation and suggested fixes.",
    stack: ["Python", "FastAPI", "Gemini API", "Pydantic", "Docker"],
    live: "https://code-review-agent-six.vercel.app/",
    github: "https://github.com/imkk21/AI-Code-Reviewer",
    hue: 300,
  },
  {
    name: "ShareItz",
    tagline: "Instant Text Sharing",
    description: "Zero sign-up, TypeScript-first platform for instant copy-paste text sharing using Firebase real-time sync.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    live: "https://shareitz.vercel.app",
    github: "https://github.com/imkk21/shareitz",
    hue: 330,
  },
  {
    name: "CityShop",
    tagline: "Local Marketplace Mobile App",
    description: "Marketplace app for shopkeepers and shoppers to coordinate orders, backed by PostgreSQL/Supabase for low-latency sync.",
    stack: ["React Native", "PostgreSQL", "Supabase"],
    github: "https://github.com/imkk21/cityshop",
    hue: 150,
  },
  {
    name: "Steam Market Analytics",
    tagline: "Tableau Data Visualization",
    description: "Analyzed 125K+ Steam games to surface pricing, engagement and genre trends in an interactive Tableau dashboard.",
    stack: ["Tableau", "Data Analysis"],
    github: "https://github.com/imkk21/Steam-Games-Market-Analytics",
    hue: 45,
  },
];

export const SKILLS = [
  { title: "Backend", span: 4, items: ["Java", "Spring Boot", "Spring Data JPA / Hibernate", "REST API Design", "OAuth 2.0", "API Security", "Node.js", "FastAPI"] },
  { title: "Databases", span: 2, items: ["MySQL", "ClickHouse", "PostgreSQL", "MongoDB", "SQLite", "Supabase"] },
  { title: "Cloud & DevOps", span: 3, items: ["AWS", "Docker", "GitHub Actions", "Linux", "Shell Scripting", "Git", "Maven", "Postman", "Firebase"] },
  { title: "Frontend", span: 3, items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Angular", "HTML / CSS", "Tailwind CSS"] },
  { title: "AI & Other", span: 4, items: ["Python", "Google Gemini API", "LLM API Integration", "Prompt Engineering", "LangChain", "RAG (basics)", "GitHub Copilot"] },
];

export const MARQUEE = ["Java", "Spring Boot", "MySQL", "ClickHouse", "AWS", "REST APIs", "OAuth 2.0", "Docker", "React", "Node.js", "PostgreSQL", "GitHub Actions", "Linux"];

export const EDUCATION = [
  { degree: "Master of Computer Applications", short: "MCA", school: "Vellore Institute of Technology", period: "2024 — 2026" },
  { degree: "Bachelor of Computer Applications", short: "BCA", school: "Mohanlal Sukhadia University, Udaipur", period: "2020 — 2023" },
];

export const CERTIFICATIONS = [
  { name: "CEH v12 Training Certification", org: "GICSEH, Noida" },
  { name: "Introduction to Software Engineering", org: "IBM · Coursera" },
];

export const ACHIEVEMENTS = [
  { name: "TCS CodeVita Season 12", note: "Round 2 Finalist" },
  { name: "TCS CodeVita Season 13", note: "Round 2 Finalist" },
  { name: "TCS HackQuest Season 10", note: "Round 2 Finalist" },
  { name: "Nokia “Accelerate Her in Tech” Hackathon", note: "Round 2 Finalist" },
];
