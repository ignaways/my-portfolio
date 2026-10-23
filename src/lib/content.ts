/**
 * Single source of truth for all site content.
 * Anything wrapped in [brackets] is a placeholder — replace it with real data.
 * The <Placeholder> component renders bracketed text with a dashed underline
 * so unfinished content is obvious during review.
 */

export const profile = {
  name: "Ignatius Andri",
  brand: "Ignaway",
  role: "Fullstack Developer / Software Engineer",
  headline: "A Fullstack Developer & Software Engineer",
  aboutHeadline: "Building systems that make a difference.",
  location: "Indonesia",
  /** Put your CV at public/cv.pdf and set this to "/cv.pdf" to show the Download CV button. */
  cv: "",
  careerStart: 2018,
  aboutBody:
    "From banking platforms to startup products, I enjoy turning complex business rules into software that is clear for users and maintainable for the teams who build it.",
  summary:
    "I'm Ignaway, a Fullstack Developer focused on building scalable applications, reliable APIs, and thoughtful user experiences.",
  availability: "Open to interesting opportunities",
  email: "ignaway@example.com",
  phone: "+62 851-58015-223",
  links: {
    github: "https://github.com/ignaways",
    linkedin: "https://www.linkedin.com/in/ignatius-andri",
  },
  siteUrl: "https://www.ignaway.com",
  photo: {
    src: "/images/ignatius-andri.png",
    alt: "Portrait of Ignatius Andri",
    width: 1000,
    height: 1250,
  },
  aboutPhoto: {
    src: "/images/ignatius-andri-about.png",
    alt: "Ignatius Andri in a plaid shirt and bucket hat",
    width: 1035,
    height: 2033,
  },
};

export const yearsOfExperience = new Date().getFullYear() - profile.careerStart;
export const whatsappUrl = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;

export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "insights", label: "Blog" },
  { id: "contact", label: "Contact" },
];

/* ───────── What I Do ───────── */
export type Service = { icon: "layout" | "server" | "database" | "puzzle"; title: string; body: string };
export const services: Service[] = [
  { icon: "layout", title: "Frontend Development", body: "Building responsive, accessible interfaces with React, Next.js and Angular." },
  { icon: "server", title: "Backend & APIs", body: "Designing reliable REST APIs and services with Node.js and Express." },
  { icon: "database", title: "Database Design", body: "Modelling data and writing queries that stay fast as data grows." },
  { icon: "puzzle", title: "Problem Solving", body: "Understanding the business first, then finding simple solutions to complex problems." },
];

/* ───────── Tools I Use ───────── */
const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}`;
export const tools = [
  { name: "React", icon: devicon("react/react-original.svg") },
  { name: "Next.js", icon: devicon("nextjs/nextjs-original.svg") },
  { name: "TypeScript", icon: devicon("typescript/typescript-original.svg") },
  { name: "Angular", icon: devicon("angular/angular-original.svg") },
  { name: "Node.js", icon: devicon("nodejs/nodejs-original.svg") },
  { name: "PostgreSQL", icon: devicon("postgresql/postgresql-original.svg") },
  { name: "MongoDB", icon: devicon("mongodb/mongodb-original.svg") },
  { name: "Git", icon: devicon("git/git-original.svg") },
] as const;

/* ───────── Technologies I work with (hero marquee) ───────── */
export const heroTech = [
  { name: "JavaScript", icon: devicon("javascript/javascript-original.svg") },
  { name: "TypeScript", icon: devicon("typescript/typescript-original.svg") },
  { name: "React", icon: devicon("react/react-original.svg") },
  { name: "Next.js", icon: devicon("nextjs/nextjs-original.svg") },
  { name: "Angular", icon: devicon("angular/angular-original.svg") },
  { name: "Vue", icon: devicon("vuejs/vuejs-original.svg") },
  { name: "Node.js", icon: devicon("nodejs/nodejs-original.svg") },
  { name: "Express.js", icon: devicon("express/express-original.svg") },
  { name: "PostgreSQL", icon: devicon("postgresql/postgresql-original.svg") },
  { name: "Docker", icon: devicon("docker/docker-original.svg") },
  { name: "Git", icon: devicon("git/git-original.svg") },
] as const;

/* ───────── Stack ───────── */
export type Tech = {
  name: string;
  years: string; // placeholder until real data is filled in
  usage: string;
  example: string;
};
export type StackLayer = { id: string; name: string; role: string; items: Tech[] };

export const stack: StackLayer[] = [
  {
    id: "language",
    name: "Language",
    role: "How to communicate",
    items: [
      { name: "JavaScript", years: "8 yrs", usage: "Powering full-stack web applications, from interactive user interfaces to backend services.", example: "All projects" },
      { name: "TypeScript", years: "5 yrs", usage: "Writing scalable, type-safe code to ensure reliable and maintainable applications.", example: "All projects" },
      { name: "HTML", years: "8 yrs", usage: "Structuring semantic and accessible content for web interfaces.", example: "All projects" },
      { name: "CSS", years: "8 yrs", usage: "Crafting responsive layouts and modern visual styling systems.", example: "All projects" },
      { name: "Java", years: "1 yrs", usage: "Building robust REST APIs and enterprise backend services.", example: "Learning" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    role: "What the user touches",
    items: [
      { name: "React", years: "8 yrs", usage: "Component architecture, state management and complex forms for business apps.", example: "POS / Management System" },
      { name: "Next", years: "1 yrs", usage: "Server rendering, routing and API routes for production web apps.", example: "Personal Finance Application" },
      { name: "Vue", years: "1 yrs", usage: "Reactive interfaces and component-driven dashboards.", example: "[Project name]" },
      { name: "Angular", years: "2 yrs", usage: "", example: "[Project name]" },
      { name: "React Native", years: "1 yrs", usage: "Cross-platform mobile apps sharing logic with the web.", example: "[Project name]" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    role: "Where the rules live",
    items: [
      { name: "Node.js", years: "6 yrs", usage: "Services, background jobs and tooling.", example: "Personal Finance Application" },
      { name: "Express", years: "1 yrs", usage: "Lean HTTP services with layered routing, validation and error handling.", example: "Personal Finance Application" },
      { name: "REST API", years: "8 yrs", usage: "Designing and consuming resource-oriented contracts.", example: "Enterprise Banking System" },
      { name: "Sequelize", years: "1 yrs", usage: "Managing relational databases through data models, relationships, and schema migrations.", example: "" },
      { name: "PostgreSQL", years: "1 yrs", usage: "Designing robust relational database schemas and optimizing complex queries for high performance.", example: "" },
      { name: "MongoDB", years: "1 yrs", usage: "Structuring flexible, document-oriented data models for scalable and fast-paced applications.", example: "" },
    ],
  },
  {
    id: "data",
    name: "Data",
    role: "What must stay correct",
    items: [
      { name: "SQL", years: "8 yrs", usage: "Querying, joins, aggregates and reading execution plans.", example: "Enterprise Banking System" },
      { name: "Database Design", years: "5 yrs", usage: "Schemas designed around access patterns and integrity.", example: "Personal Finance Application" },
      { name: "Stored Procedures", years: "5 yrs", usage: "Transactional business operations close to the data.", example: "Enterprise Banking System" },
      { name: "Data Modeling", years: "5 yrs", usage: "Turning business language into entities and relationships.", example: "POS / Management System" },
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    role: "How it holds together",
    items: [
      { name: "Git", years: "8 yrs", usage: "Branching workflows, reviews and clean history.", example: "All projects" },
      { name: "API Architecture", years: "5 yrs", usage: "Versioning, pagination, error shapes and boundaries.", example: "Enterprise Banking System" },
      { name: "Design Patterns", years: "3 yrs", usage: "Repository, service and adapter patterns where they pay off.", example: "Personal Finance Application" },
      { name: "OOP", years: "3 yrs", usage: "Encapsulating domain behaviour behind clear interfaces.", example: "[Project name]" },
      { name: "System Design", years: "3 yrs", usage: "Reasoning about data flow, failure and scale before building.", example: "Enterprise Banking System" },
    ],
  },
];

/* ───────── Projects ───────── */
export type Project = {
  id: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  decisions: string[];
  architecture: string[];
  github?: string;
  demo?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "banking",
    name: "Enterprise Banking System",
    category: "Enterprise / Financial services",
    summary:
      "Internal web application supporting multi-step banking workflows across operations teams.",
    problem:
      "Banking operations run on long, rule-heavy workflows: approvals, validations and audit trails that span many screens and services. The interface has to stay consistent with backend rules that change often.",
    solution:
      "A modular frontend driven by workflow definitions, a typed API layer that mirrors backend contracts, and transactional logic kept close to the data in SQL.",
    role: "[Your role, e.g. Software Engineer, frontend and API integration]",
    stack: ["React", "TypeScript", "REST API", "SQL", "Stored Procedures"],
    decisions: [
      "Business rules stay on the server; the UI only reflects them, so rules never drift between layers.",
      "Transactional operations run inside stored procedures to guarantee atomicity.",
      "Server-side pagination and filtering for large record sets instead of loading everything client-side.",
      "Role-aware views derived from a single permission map rather than scattered conditionals.",
    ],
    architecture: ["Web client", "REST API", "Service layer", "SQL database", "Core banking"],
    note: "Enterprise codebase, repository is private.",
  },
  {
    id: "finance",
    name: "Personal Finance Application",
    category: "Product / Fintech",
    summary: "Budgeting, expense tracking and cashflow overview for individuals.",
    problem:
      "Most budgeting tools either demand too much manual work or hide how numbers are calculated, so people stop trusting them.",
    solution:
      "A transaction ledger as the single source of truth, with budgets and cashflow computed from it, so every number on screen can be traced back to real entries.",
    role: "Fullstack, design to deployment",
    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "SQL"],
    decisions: [
      "Money stored as integer minor units to avoid floating-point rounding errors.",
      "Aggregates computed in SQL views, not in the browser.",
      "Optimistic UI for new expenses with server reconciliation on failure.",
      "Clear separation between routes, services and repositories in the Express API.",
    ],
    architecture: ["Next.js app", "Express API", "Service layer", "SQL ledger"],
    github: "https://github.com/[username]/[repo]",
    demo: "https://[demo-url]",
  },
  {
    id: "pos",
    name: "POS / Management System",
    category: "Frontend architecture",
    summary: "Point-of-sale and back-office management interface with inventory and sales flows.",
    problem:
      "POS screens are used under time pressure: every extra click or confusing state costs the cashier time and the business money.",
    solution:
      "A frontend built around predictable state: the cart is a pure reducer, catalogue data is normalised, and every CRUD screen shares the same form and table primitives.",
    role: "Frontend developer, UI architecture and state management",
    stack: ["React", "TypeScript", "State management", "REST API"],
    decisions: [
      "Cart logic as a pure, unit-testable reducer, independent of UI components.",
      "Normalised client-side entities so product edits reflect everywhere instantly.",
      "Reusable data-table and form primitives across all CRUD modules.",
      "Keyboard-first interactions for the checkout flow.",
    ],
    architecture: ["POS client", "State store", "REST API", "Database"],
    github: "https://github.com/[username]/[repo]",
  },
];

/* ───────── Experience ───────── */
export const experience = [
  {
    company: "Loan Management System BNI | PT Inti Corpora Teknologi",
    sector: "Banking",
    role: "Software Engineer",
    period: "Oct 2024 – Present",
    responsibilities: [
      "Develop customer and admin interfaces using React and Flowable Work",
      "Integrate frontend, backend, and external APIs, and maintain technical documentation covering APIs, database structures, and development guides.",
      "Work with business analysts to translate requirements into system behaviour.",
    ],
    tech: ["React", "TypeScript", "REST API", "SQL", "Apache Groovy", "Flowable"],
    impact: "Delivered frontend-backend and external API integrations for end-to-end loan workflows",
  },
  {
    company: "Kopra Bank Mandiri | PT Inti Corpora Teknologi",
    sector: "Banking",
    role: "Frontend Developer",
    period: "Jun 2022 – Oct 2024",
    responsibilities: [
      "Developed and maintained React and Angular features for Kopra, focusing on business requirements, usability, stability, and performance.",
      "Collaborated with backend and QA teams on integration, testing, deployments, bug fixing, clean code, design patterns, and performance optimization.",
    ],
    tech: ["React", "Angular", "TypeScript", "HTML", "CSS"],
    impact: "Improved existing frontend implementations through performance optimization, clean code, and design patterns.",
  },
  {
    company: "Sportees.id",
    sector: "Startup",
    role: "Fullstack Developer",
    period: "Jan 2021 – Dec 2021",
    responsibilities: [
      "Designed and maintained web applications using Next.js, Node.js, and MongoDB, including responsive features developed with product owners.",
      "Built RESTful APIs and third-party integrations, while improving application performance through code optimization and webpack implementation.",
    ],
    tech: ["JavaScript", "Next.js", "Node.js","Postgresql", "MongoDB"],
    impact: "Improved application performance through code optimization and webpack configuration.",
  },
  {
    company: "Tokome.id",
    sector: "Enterprise applications",
    role: "Frontend → Fullstack Developer",
    period: "Feb 2018 – Jan 2021",
    responsibilities: [
      "Developed responsive web interfaces and supported frontend-backend integration for product features.",
      "Identified and fixed bugs in ASP.NET applications and contributed to development using SQL.",
    ],
    tech: ["ASP.NET", "HTML", "CSS", "JavaScript", "C#", "mySQL"],
    impact: "Shipped responsive web features and connected them with backend functionality.",
  },
];

/* ───────── Insights ───────── */
export type Insight = { slug: string; title: string; dek: string; topic: string; tone: "blue" | "dark" | "violet" | "gray" | "green"; featured?: boolean };
export const insights: Insight[] = [
  { slug: "table-scan-vs-index-seek", title: "Table Scan vs Index Seek", dek: "Reading an execution plan to understand why the same query can take 4 ms or 4 seconds.", topic: "Databases", tone: "blue", featured: true },
  { slug: "why-queries-get-slow", title: "Why a database query becomes slow", dek: "Missing indexes, non-sargable predicates, parameter sniffing and other usual suspects.", topic: "Databases", tone: "blue" },
  { slug: "better-rest-apis", title: "Designing better REST APIs", dek: "Resource naming, error shapes, pagination and the small decisions that age well.", topic: "API design", tone: "dark" },
  { slug: "frontend-state", title: "Where should state live?", dek: "Server state, UI state and URL state, and why mixing them causes most frontend bugs.", topic: "Frontend", tone: "violet" },
  { slug: "clean-architecture", title: "Clean architecture without the ceremony", dek: "Keeping business rules independent of frameworks, pragmatically.", topic: "Architecture", tone: "gray" },
  { slug: "fullstack-performance", title: "Common fullstack performance problems", dek: "N+1 queries, waterfalls, oversized payloads and re-render storms.", topic: "Performance", tone: "green" },
  { slug: "maintainable-react", title: "Building maintainable React applications", dek: "Boundaries, colocation and components that are easy to delete.", topic: "Frontend", tone: "violet" },
];

/** Everything that changes with the language; see content.id.ts for the Indonesian version. */
export const content = { profile, nav, services, projects, experience, insights };
export type Content = typeof content;
