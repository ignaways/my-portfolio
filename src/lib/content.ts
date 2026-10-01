/**
 * Single source of truth for all site content.
 * Anything wrapped in [brackets] is a placeholder — replace it with real data.
 * The <Placeholder> component renders bracketed text with a dashed underline
 * so unfinished content is obvious during review.
 */

export const profile = {
  name: "Ignatius Andri",
  role: "Fullstack Developer / Software Engineer",
  headline: "I Build Systems, Not Just Interfaces.",
  summary:
    "Fullstack Developer focused on building scalable web applications, reliable APIs, and thoughtful user experiences.",
  availability: "Open to interesting opportunities",
  email: "[you@example.com]",
  links: {
    github: "https://github.com/[username]",
    linkedin: "https://www.linkedin.com/in/[username]",
  },
  siteUrl: "https://[your-domain].com",
  /** Put your photo at public/images/ignatius-andri.jpg (portrait 4:5, at least 1000×1250 px). */
  photo: {
    src: "/images/ignatius-andri.jpg",
    alt: "Portrait of Ignatius Andri",
    width: 1000,
    height: 1250,
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
] as const;

/** Every section is an "endpoint" — the nav shows the route of the section in view. */
export const routes: Record<string, string> = {
  top: "/",
  about: "/about",
  stack: "/stack",
  architecture: "/architecture",
  projects: "/projects",
  experience: "/experience",
  journey: "/journey",
  principles: "/principles",
  insights: "/insights",
  contact: "/contact",
};

/* ───────── Hero: one request traced through the stack ───────── */
export const heroLayers = [
  {
    id: "frontend",
    name: "Frontend",
    tech: "React / Next.js",
    detail: "Renders state, handles interaction, and keeps the UI honest about loading and errors.",
    trace: "<ProjectList /> fetches on mount",
  },
  {
    id: "api",
    name: "API",
    tech: "REST API / Services",
    detail: "A stable contract between client and server: typed payloads, clear status codes.",
    trace: "GET /api/projects?limit=6",
  },
  {
    id: "backend",
    name: "Backend",
    tech: "Node.js / Express",
    detail: "Business rules live here, validated once and reused everywhere.",
    trace: "projectService.list({ limit: 6 })",
  },
  {
    id: "database",
    name: "Database",
    tech: "SQL / Data Layer",
    detail: "Indexed, normalised data with queries shaped around how it is read.",
    trace: "SELECT id, name FROM projects ORDER BY updated_at DESC",
  },
] as const;

/* ───────── About ───────── */
export const principlesShort = [
  { title: "Build with purpose.", body: "Every feature should answer a real need, not a hypothetical one." },
  { title: "Think in systems.", body: "A button is also a request, a rule, a query and a record." },
  { title: "Keep it maintainable.", body: "Code is read far more often than it is written." },
  { title: "Solve the real problem.", body: "Understand the business before touching the keyboard." },
];

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
    id: "frontend",
    name: "Frontend",
    role: "What the user touches",
    items: [
      { name: "React.js", years: "[n] yrs", usage: "Component architecture, state management and complex forms for business apps.", example: "POS / Management System" },
      { name: "Next.js", years: "[n] yrs", usage: "Server rendering, routing and API routes for production web apps.", example: "Personal Finance Application" },
      { name: "Vue.js", years: "[n] yrs", usage: "Reactive interfaces and component-driven dashboards.", example: "[Project name]" },
      { name: "TypeScript", years: "[n] yrs", usage: "Typed contracts shared between UI, API and domain logic.", example: "Enterprise Banking System" },
      { name: "JavaScript", years: "[n] yrs", usage: "The foundation under every layer, browser and server.", example: "All projects" },
      { name: "React Native", years: "[n] yrs", usage: "Cross-platform mobile apps sharing logic with the web.", example: "[Project name]" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    role: "Where the rules live",
    items: [
      { name: "Node.js", years: "[n] yrs", usage: "Services, background jobs and tooling.", example: "Personal Finance Application" },
      { name: "Express.js", years: "[n] yrs", usage: "Lean HTTP services with layered routing, validation and error handling.", example: "Personal Finance Application" },
      { name: "REST API", years: "[n] yrs", usage: "Designing and consuming resource-oriented contracts.", example: "Enterprise Banking System" },
    ],
  },
  {
    id: "data",
    name: "Data",
    role: "What must stay correct",
    items: [
      { name: "SQL", years: "[n] yrs", usage: "Querying, joins, aggregates and reading execution plans.", example: "Enterprise Banking System" },
      { name: "Database Design", years: "[n] yrs", usage: "Schemas designed around access patterns and integrity.", example: "Personal Finance Application" },
      { name: "Stored Procedures", years: "[n] yrs", usage: "Transactional business operations close to the data.", example: "Enterprise Banking System" },
      { name: "Data Modeling", years: "[n] yrs", usage: "Turning business language into entities and relationships.", example: "POS / Management System" },
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    role: "How it holds together",
    items: [
      { name: "Git", years: "[n] yrs", usage: "Branching workflows, reviews and clean history.", example: "All projects" },
      { name: "API Architecture", years: "[n] yrs", usage: "Versioning, pagination, error shapes and boundaries.", example: "Enterprise Banking System" },
      { name: "Design Patterns", years: "[n] yrs", usage: "Repository, service and adapter patterns where they pay off.", example: "Personal Finance Application" },
      { name: "OOP", years: "[n] yrs", usage: "Encapsulating domain behaviour behind clear interfaces.", example: "[Project name]" },
      { name: "System Design", years: "[n] yrs", usage: "Reasoning about data flow, failure and scale before building.", example: "Enterprise Banking System" },
    ],
  },
];

/* ───────── Architecture ───────── */
export const systemNodes = [
  { id: "user", name: "User", note: "Starts with intent, not a request.", log: '→ clicks "Pay invoice"' },
  { id: "frontend", name: "Frontend", note: "Validates early, shows pending state, sends a typed payload.", log: "POST /api/payments { invoiceId, amount }" },
  { id: "api", name: "API Layer", note: "Authenticates, validates the schema, and rejects bad input at the edge.", log: "auth ok, schema ok" },
  { id: "logic", name: "Business Logic", note: "Applies the rules the business actually cares about.", log: "rule: amount <= balance, ok" },
  { id: "db", name: "Database", note: "Commits atomically, so the books always balance.", log: "BEGIN; INSERT payment; UPDATE balance; COMMIT" },
  { id: "ext", name: "External Services", note: "Talks to the outside world asynchronously and idempotently.", log: "gateway.notify() 202 Accepted" },
] as const;

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
    company: "[Company name]",
    sector: "Banking",
    role: "[Software Engineer]",
    period: "[20XX] – Present",
    responsibilities: [
      "Build and maintain internal banking applications covering complex operational workflows.",
      "Integrate frontend modules with REST APIs and SQL-backed services.",
      "Work with analysts and business users to translate requirements into system behaviour.",
    ],
    tech: ["React", "TypeScript", "REST API", "SQL"],
    impact: "[Describe a concrete outcome, e.g. a workflow you simplified or a module you shipped]",
  },
  {
    company: "[Company name]",
    sector: "Financial technology / Startup",
    role: "[Frontend → Fullstack Developer]",
    period: "[20XX] – [20XX]",
    responsibilities: [
      "Delivered product features end to end, from UI to API endpoints.",
      "Designed database tables and queries for new product features.",
      "Took part in code review and technical planning in a small, fast-moving team.",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "SQL"],
    impact: "[Describe a concrete outcome]",
  },
  {
    company: "[Company name]",
    sector: "Enterprise applications",
    role: "[Frontend Developer]",
    period: "[20XX] – [20XX]",
    responsibilities: [
      "Built data-heavy interfaces: dashboards, forms and management screens.",
      "Introduced reusable component patterns across modules.",
    ],
    tech: ["Vue.js", "React", "JavaScript"],
    impact: "[Describe a concrete outcome]",
  },
];

/* ───────── Journey ───────── */
export const journey = [
  { stage: "Frontend", story: "It started with interfaces: making things people can see, click and understand." },
  { stage: "Application logic", story: "Complex screens forced better questions: where does state live, and who owns a rule?" },
  { stage: "API", story: "Consuming APIs led to designing them, and to caring about contracts, errors and versioning." },
  { stage: "Database", story: "Slow screens led to slow queries, then to indexes, execution plans and data modelling." },
  { stage: "Architecture", story: "Now the focus is the whole system: how the parts fit, fail and evolve together." },
];

/* ───────── Philosophy ───────── */
export const philosophy = [
  { title: "Think in Systems", body: "Understand how components interact rather than solving isolated problems.", code: "// a button is also a request, a rule and a row" },
  { title: "Build for Change", body: "Write software that can evolve without becoming fragile.", code: "// depend on interfaces, not implementations" },
  { title: "Solve the Root Cause", body: "Don't only fix the symptom. Understand why the problem exists.", code: "// why was the query slow? missing index on (account_id, created_at)" },
  { title: "Keep It Simple", body: "Good engineering isn't about making systems unnecessarily complicated.", code: "// the best abstraction is the one you didn't need" },
];

/* ───────── Insights ───────── */
export const insights = [
  { slug: "table-scan-vs-index-seek", title: "Table Scan vs Index Seek", dek: "Reading an execution plan to understand why the same query can take 4 ms or 4 seconds.", topic: "Databases", featured: true },
  { slug: "why-queries-get-slow", title: "Why a database query becomes slow", dek: "Missing indexes, non-sargable predicates, parameter sniffing and other usual suspects.", topic: "Databases" },
  { slug: "better-rest-apis", title: "Designing better REST APIs", dek: "Resource naming, error shapes, pagination and the small decisions that age well.", topic: "API design" },
  { slug: "frontend-state", title: "Where should state live?", dek: "Server state, UI state and URL state, and why mixing them causes most frontend bugs.", topic: "Frontend" },
  { slug: "clean-architecture", title: "Clean architecture without the ceremony", dek: "Keeping business rules independent of frameworks, pragmatically.", topic: "Architecture" },
  { slug: "fullstack-performance", title: "Common fullstack performance problems", dek: "N+1 queries, waterfalls, oversized payloads and re-render storms.", topic: "Performance" },
  { slug: "maintainable-react", title: "Building maintainable React applications", dek: "Boundaries, colocation and components that are easy to delete.", topic: "Frontend" },
];
