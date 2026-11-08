// Per-course content for the course page's "What this program is about" section and the
// "Work with Industry Tools" row. Copy is drawn from each course's own description (courseHero.ts);
// nothing here adds placement promises. The figures in that section (course duration, students
// registered, jobs listed) are set below in SHARED_STATS / COURSE_STATS.
//
// Tool logos live in /public/tools/icons: brand marks from Simple Icons (CC0) and Devicon (MIT).
// Tools with no freely licensed logo (ChatGPT, Stable Diffusion, Excel, Power BI, CLO 3D, TestNG, Keka)
// use a neutral initials tile; drop an official logo file in with the same name to replace one.

export type CourseTool = {
  /** file name in /public/tools/icons (without .svg) */
  icon: string;
  /** accessible name */
  name: string;
  /** text shown next to the logo; defaults to `name`, empty for logos that already spell the name */
  label?: string;
  /** a wordmark wider than it is tall: its height relative to the square icons (natural width) */
  wide?: number;
};

export type CourseImpact = {
  /** heading as [before, highlighted, after] */
  heading: [string, string, string];
  description: string;
  steps: [Step, Step, Step];
  casesTitle: string;
  casesFooter: string;
  /** second line on the green jobs card */
  jobsLine: string;
};

type Step = { title: string; text: string };

/** The three figures in the section. */
export type CourseStats = {
  /** "Course duration" card */
  duration: string;
  /** "Students registered" card */
  students: string;
  /** green card: jobs listed this year */
  jobs: string;
};

// CleverLN-wide figures, shown for any course that has no figures of its own yet.
// Every course runs for 3 months.
const SHARED_STATS: CourseStats = { duration: "3 Months", students: "2K+", jobs: "20000+" };

// Per-course figures. PLACEHOLDERS: chosen to be plausible and to add up to the CleverLN-wide
// figures (students ~2.4K in total, at least 60+ per course; jobs ~21K in total). Replace each with the real number when known;
// a course left out (or a field removed) falls back to the CleverLN-wide figure above.
const COURSE_STATS: Record<string, Partial<CourseStats>> = {
  "agentic-ai": { students: "140+", jobs: "900+" },
  "generative-ai": { students: "180+", jobs: "1100+" },
  "prompt-engineering": { students: "210+", jobs: "800+" },
  "mlops": { students: "60+", jobs: "700+" },
  "financial-analytics": { students: "110+", jobs: "1200+" },
  "fin-tech-engineering": { students: "65+", jobs: "650+" },
  "financial-risk-management": { students: "60+", jobs: "500+" },
  "hotel-management": { students: "70+", jobs: "950+" },
  "corporate-event-management": { students: "60+", jobs: "400+" },
  "ui-ux-design": { students: "260+", jobs: "1300+" },
  "motion-graphics": { students: "75+", jobs: "600+" },
  "product-designer": { students: "90+", jobs: "750+" },
  "fashion-designing": { students: "65+", jobs: "450+" },
  "social-media-manager": { students: "95+", jobs: "1000+" },
  "java-full-stack-developer": { students: "120+", jobs: "1800+" },
  "devops-engineering": { students: "70+", jobs: "1100+" },
  "python-developer": { students: "150+", jobs: "1900+" },
  "automation-testing": { students: "70+", jobs: "900+" },
  "talent-acquisition-lead": { students: "65+", jobs: "850+" },
  "internal-recruitment-coordinator": { students: "60+", jobs: "350+" },
  "hr-analytics-specialist": { students: "60+", jobs: "400+" },
  "people-operations-manager": { students: "60+", jobs: "450+" },
  "digital-marketing": { students: "130+", jobs: "1500+" },
  "performance-marketing": { students: "70+", jobs: "700+" },
};

type CourseDetails = {
  impact: CourseImpact;
  /** brand wordmark images (the UI/UX course), or logo + name tools */
  tools: { wordmarks: { src: string; alt: string }[] } | { list: CourseTool[] };
};

const t = (icon: string, name: string, extra: Partial<CourseTool> = {}): CourseTool => ({ icon, name, ...extra });

// wordmarks are sized by shape so they carry the same visual weight as the square icons
const ZOOM = t("zoom", "Zoom", { label: "", wide: 0.55 });
const AWS = t("aws", "AWS", { label: "", wide: 0.9 });
const zoho = (product: string) => t("zoho", `Zoho ${product}`, { label: product, wide: 0.72 });

const UI_UX: CourseDetails = {
  impact: {
    heading: ["Turn ideas into ", "real impact", " with CleverLN."],
    description: "Bring your ideas to life with designs that are creative, intuitive, and user-focused. Where creativity meets usability.",
    steps: [
      { title: "Research", text: "Understand users and the problems they face." },
      { title: "Design", text: "Create intuitive interfaces in Figma." },
      { title: "Impact", text: "Ship designs that improve real products." },
    ],
    casesTitle: "Weekly design challenges inspired by real companies.",
    casesFooter: "Learn from those who’ve designed real products and driven measurable growth.",
    jobsLine: "Companies are hiring designers. Are you ready?",
  },
  tools: {
    wordmarks: [
      { src: "/tools/canva.png", alt: "Canva" },
      { src: "/tools/figma.png", alt: "Figma" },
      { src: "/tools/claude.png", alt: "Claude" },
      { src: "/tools/adobe.png", alt: "Adobe XD" },
      { src: "/tools/framer.png", alt: "Framer" },
    ],
  },
};

const DETAILS: Record<string, CourseDetails> = {
  "agentic-ai": {
    impact: {
      heading: ["Build AI agents that ", "get real work done", " with CleverLN."],
      description: "Design agents that plan, use tools and finish tasks on their own. Where AI meets real work.",
      steps: [
        { title: "Design", text: "Plan agents that break goals into clear steps." },
        { title: "Connect", text: "Link agents to tools and data with LangChain and CrewAI." },
        { title: "Automate", text: "Ship agents that finish real tasks end to end." },
      ],
      casesTitle: "Weekly AI agent use cases inspired by real companies.",
      casesFooter: "Learn from those who’ve built real AI systems and driven measurable growth.",
      jobsLine: "AI roles are opening fast. Are you ready?",
    },
    tools: { list: [t("langchain", "LangChain"), t("crewai", "CrewAI"), t("python", "Python"), t("huggingface", "Hugging Face"), t("claude", "Claude")] },
  },
  "generative-ai": {
    impact: {
      heading: ["Turn ideas into ", "everyday AI tools", " with CleverLN."],
      description: "Generate text, images and code with today’s leading models. Where creativity meets AI.",
      steps: [
        { title: "Explore", text: "Learn how GPT, Gemini and Stable Diffusion work." },
        { title: "Create", text: "Generate text, images and code for real projects." },
        { title: "Launch", text: "Turn your creations into tools people use." },
      ],
      casesTitle: "Weekly generative AI projects inspired by real companies.",
      casesFooter: "Learn from those who’ve built real AI products and driven measurable growth.",
      jobsLine: "Every team is adding AI skills. Are you ready?",
    },
    tools: { list: [t("chatgpt", "ChatGPT"), t("gemini", "Gemini"), t("stablediffusion", "Stable Diffusion"), t("huggingface", "Hugging Face"), t("claude", "Claude")] },
  },
  "prompt-engineering": {
    impact: {
      heading: ["Get ", "better results from AI", " with CleverLN."],
      description: "Write clear prompts that give reliable, repeatable answers. Where clear thinking meets AI.",
      steps: [
        { title: "Learn", text: "Understand how AI models read your instructions." },
        { title: "Practise", text: "Write and refine prompts for everyday tasks." },
        { title: "Master", text: "Get reliable results across ChatGPT, Claude and Gemini." },
      ],
      casesTitle: "Weekly prompt challenges inspired by real companies.",
      casesFooter: "Learn from those who use AI every day to save time and do better work.",
      jobsLine: "AI-ready professionals stand out. Are you ready?",
    },
    tools: { list: [t("chatgpt", "ChatGPT"), t("claude", "Claude"), t("gemini", "Gemini"), t("perplexity", "Perplexity"), t("githubcopilot", "GitHub Copilot")] },
  },
  mlops: {
    impact: {
      heading: ["Take ML models ", "all the way to production", " with CleverLN."],
      description: "Deploy, monitor and scale machine learning models with real tools. Where models meet the real world.",
      steps: [
        { title: "Package", text: "Containerise models with Docker and track runs in MLflow." },
        { title: "Deploy", text: "Ship models to production with automated pipelines." },
        { title: "Monitor", text: "Watch accuracy and scale models as usage grows." },
      ],
      casesTitle: "Weekly deployment cases inspired by real companies.",
      casesFooter: "Learn from those who’ve run real ML systems in production.",
      jobsLine: "Teams need ML in production. Are you ready?",
    },
    tools: { list: [t("docker", "Docker"), t("mlflow", "MLflow"), t("kubernetes", "Kubernetes"), t("githubactions", "GitHub Actions"), t("python", "Python")] },
  },
  "financial-analytics": {
    impact: {
      heading: ["Turn numbers into ", "smarter decisions", " with CleverLN."],
      description: "Build forecasts and dashboards from real business data. Where numbers meet strategy.",
      steps: [
        { title: "Analyse", text: "Clean and explore business data in Excel and Python." },
        { title: "Forecast", text: "Build forecasts that show where the business is heading." },
        { title: "Present", text: "Turn insights into Power BI dashboards leaders use." },
      ],
      casesTitle: "Weekly finance case studies inspired by real companies.",
      casesFooter: "Learn from those who’ve turned financial data into real decisions.",
      jobsLine: "Finance teams need data skills. Are you ready?",
    },
    tools: { list: [t("excel", "Excel"), t("powerbi", "Power BI"), t("python", "Python"), t("pandas", "pandas"), t("jupyter", "Jupyter")] },
  },
  "fin-tech-engineering": {
    impact: {
      heading: ["Build ", "the future of money", " with CleverLN."],
      description: "Build secure payment and banking apps on systems like UPI. Where finance meets technology.",
      steps: [
        { title: "Learn", text: "Understand how UPI and payment gateways move money." },
        { title: "Build", text: "Create secure financial apps with Python and SQL." },
        { title: "Scale", text: "Make payments fast, safe and reliable." },
      ],
      casesTitle: "Weekly fintech cases inspired by real companies.",
      casesFooter: "Learn from those who’ve built real payment systems.",
      jobsLine: "Fintech teams are hiring engineers. Are you ready?",
    },
    tools: { list: [t("razorpay", "Razorpay"), t("python", "Python"), t("mysql", "MySQL"), t("postman", "Postman"), t("git", "Git")] },
  },
  "financial-risk-management": {
    impact: {
      heading: ["Measure and manage ", "financial risk", " with CleverLN."],
      description: "Measure market, credit and liquidity risk with real models. Where numbers protect the business.",
      steps: [
        { title: "Identify", text: "Spot market, credit and liquidity risks early." },
        { title: "Measure", text: "Calculate risk with Excel, Python and VaR models." },
        { title: "Manage", text: "Keep losses within limits the business can handle." },
      ],
      casesTitle: "Weekly risk case studies inspired by real markets.",
      casesFooter: "Learn from those who’ve managed real risk in real markets.",
      jobsLine: "Banks and firms need risk experts. Are you ready?",
    },
    tools: { list: [t("excel", "Excel"), t("python", "Python"), t("pandas", "pandas"), t("numpy", "NumPy"), t("r", "R")] },
  },
  "hotel-management": {
    impact: {
      heading: ["Run ", "world-class hotels", " with CleverLN."],
      description: "Master front office, guest services and daily hotel operations. Where service meets excellence.",
      steps: [
        { title: "Learn", text: "Understand front office and guest service routines." },
        { title: "Practise", text: "Handle bookings, check-ins and guest requests." },
        { title: "Lead", text: "Run smooth operations guests remember." },
      ],
      casesTitle: "Weekly hospitality cases inspired by real hotels.",
      casesFooter: "Learn from those who’ve run real hotels and delighted real guests.",
      jobsLine: "Hospitality is hiring. Are you ready?",
    },
    tools: { list: [t("bookingdotcom", "Booking.com"), t("expedia", "Expedia"), t("airbnb", "Airbnb"), t("tripadvisor", "Tripadvisor"), t("googlesheets", "Google Sheets")] },
  },
  "corporate-event-management": {
    impact: {
      heading: ["Take events ", "from plan to stage", " with CleverLN."],
      description: "Plan budgets, manage vendors and venues, and deliver events that run smoothly. Where planning meets performance.",
      steps: [
        { title: "Plan", text: "Set budgets, timelines and goals for each event." },
        { title: "Coordinate", text: "Manage vendors, venues and clients in one plan." },
        { title: "Deliver", text: "Run events that go smoothly on the day." },
      ],
      casesTitle: "Weekly event case studies inspired by real companies.",
      casesFooter: "Learn from those who’ve delivered real corporate events.",
      jobsLine: "Companies need event professionals. Are you ready?",
    },
    tools: { list: [t("canva", "Canva"), t("trello", "Trello"), ZOOM, t("googlesheets", "Google Sheets"), t("notion", "Notion")] },
  },
  "ui-ux-design": UI_UX,
  "motion-graphics": {
    impact: {
      heading: ["Bring your designs ", "to life", " with CleverLN."],
      description: "Animate logos, type and stories that grab attention. Where design meets motion.",
      steps: [
        { title: "Design", text: "Plan scenes, type and visual style." },
        { title: "Animate", text: "Bring them to life in After Effects." },
        { title: "Edit", text: "Cut and finish videos in Premiere Pro." },
      ],
      casesTitle: "Weekly motion projects inspired by real brands.",
      casesFooter: "Learn from those who’ve made motion work for real brands.",
      jobsLine: "Brands need motion designers. Are you ready?",
    },
    tools: { list: [t("aftereffects", "After Effects"), t("premierepro", "Premiere Pro"), t("illustrator", "Illustrator"), t("blender", "Blender"), t("davinciresolve", "DaVinci Resolve")] },
  },
  "product-designer": {
    impact: {
      heading: ["Shape ", "products people love", " with CleverLN."],
      description: "Research user needs, prototype end to end and test what works. Where users meet business.",
      steps: [
        { title: "Research", text: "Find out what users need and why." },
        { title: "Prototype", text: "Design and prototype apps end to end in Figma." },
        { title: "Validate", text: "Test with users in Maze and improve." },
      ],
      casesTitle: "Weekly product challenges inspired by real companies.",
      casesFooter: "Learn from those who’ve shaped real products used every day.",
      jobsLine: "Product teams are hiring designers. Are you ready?",
    },
    tools: { list: [t("figma", "Figma"), t("maze", "Maze"), t("miro", "Miro"), t("notion", "Notion"), t("jira", "Jira")] },
  },
  "fashion-designing": {
    impact: {
      heading: ["Make ", "style your career", " with CleverLN."],
      description: "Understand fabrics, sketch your designs and build real collections. Where creativity meets craft.",
      steps: [
        { title: "Sketch", text: "Turn ideas into fashion sketches and mood boards." },
        { title: "Create", text: "Choose fabrics and design in Illustrator and CLO 3D." },
        { title: "Showcase", text: "Build a collection you can show the world." },
      ],
      casesTitle: "Weekly design briefs inspired by real fashion brands.",
      casesFooter: "Learn from those who’ve designed real collections.",
      jobsLine: "Fashion brands need fresh talent. Are you ready?",
    },
    tools: { list: [t("illustrator", "Illustrator"), t("photoshop", "Photoshop"), t("clo3d", "CLO 3D"), t("canva", "Canva"), t("pinterest", "Pinterest")] },
  },
  "social-media-manager": {
    impact: {
      heading: ["Build ", "loyal communities", " with CleverLN."],
      description: "Plan content, grow audiences and measure what works. Where creativity meets strategy.",
      steps: [
        { title: "Plan", text: "Build content calendars that fit each platform." },
        { title: "Create", text: "Design posts and reels with Canva." },
        { title: "Grow", text: "Grow communities and track results in Meta Business Suite." },
      ],
      casesTitle: "Weekly social campaigns inspired by real brands.",
      casesFooter: "Learn from those who’ve grown real brands on social media.",
      jobsLine: "Brands are hiring social media managers. Are you ready?",
    },
    tools: { list: [t("meta", "Meta Business Suite"), t("instagram", "Instagram"), t("canva", "Canva"), t("buffer", "Buffer"), t("youtube", "YouTube")] },
  },
  "java-full-stack-developer": {
    impact: {
      heading: ["Build ", "apps end to end", " with CleverLN."],
      description: "Build back ends with Java and Spring Boot and front ends with React. Where code meets real products.",
      steps: [
        { title: "Back end", text: "Build APIs and business logic with Spring Boot." },
        { title: "Front end", text: "Create interfaces people enjoy with React." },
        { title: "Ship", text: "Connect MySQL and deploy complete apps." },
      ],
      casesTitle: "Weekly app builds inspired by real companies.",
      casesFooter: "Learn from those who’ve built real apps that people use.",
      jobsLine: "Companies are hiring Java developers. Are you ready?",
    },
    tools: { list: [t("java", "Java"), t("springboot", "Spring Boot"), t("react", "React"), t("mysql", "MySQL"), t("git", "Git")] },
  },
  "devops-engineering": {
    impact: {
      heading: ["Ship software ", "faster", " with CleverLN."],
      description: "Automate deployments and run the cloud with real pipelines. Where code meets production.",
      steps: [
        { title: "Automate", text: "Build CI/CD pipelines with Git and Jenkins." },
        { title: "Containerise", text: "Package and run apps with Docker and Kubernetes." },
        { title: "Operate", text: "Run and scale apps on AWS." },
      ],
      casesTitle: "Weekly pipeline challenges inspired by real companies.",
      casesFooter: "Learn from those who’ve run real systems in the cloud.",
      jobsLine: "Teams need DevOps engineers. Are you ready?",
    },
    tools: { list: [t("git", "Git"), t("docker", "Docker"), t("kubernetes", "Kubernetes"), AWS, t("jenkins", "Jenkins")] },
  },
  "python-developer": {
    impact: {
      heading: ["Write Python for ", "in-demand roles", " with CleverLN."],
      description: "Write clean code, build APIs and automate work with Python. Where code meets real problems.",
      steps: [
        { title: "Code", text: "Write clean, readable Python." },
        { title: "Build", text: "Create APIs and apps with Django and Flask." },
        { title: "Ship", text: "Store data in PostgreSQL and deploy your work." },
      ],
      casesTitle: "Weekly coding projects inspired by real companies.",
      casesFooter: "Learn from those who’ve built real software with Python.",
      jobsLine: "Companies are hiring Python developers. Are you ready?",
    },
    tools: { list: [t("python", "Python"), t("django", "Django"), t("flask", "Flask"), t("postgresql", "PostgreSQL"), t("fastapi", "FastAPI")] },
  },
  "automation-testing": {
    impact: {
      heading: ["Ship ", "bug-free software", " with CleverLN."],
      description: "Write reliable test scripts that catch bugs early. Where quality meets speed.",
      steps: [
        { title: "Plan", text: "Decide what to test and how." },
        { title: "Automate", text: "Write test scripts with Selenium and TestNG." },
        { title: "Catch", text: "Test APIs in Postman and catch bugs before release." },
      ],
      casesTitle: "Weekly testing challenges inspired by real companies.",
      casesFooter: "Learn from those who’ve kept real software reliable.",
      jobsLine: "Teams need QA engineers. Are you ready?",
    },
    tools: { list: [t("selenium", "Selenium"), t("testng", "TestNG"), t("postman", "Postman"), t("cypress", "Cypress"), t("jenkins", "Jenkins")] },
  },
  "talent-acquisition-lead": {
    impact: {
      heading: ["Hire ", "the right people", " with CleverLN."],
      description: "Source, assess and hire great candidates with real tools. Where people meet opportunity.",
      steps: [
        { title: "Source", text: "Find great candidates on LinkedIn and job boards." },
        { title: "Assess", text: "Screen and interview candidates fairly." },
        { title: "Hire", text: "Close offers and track hiring in an ATS." },
      ],
      casesTitle: "Weekly hiring cases inspired by real companies.",
      casesFooter: "Learn from those who’ve led real hiring drives.",
      jobsLine: "Companies need great recruiters. Are you ready?",
    },
    tools: { list: [t("linkedin", "LinkedIn Recruiter"), t("indeed", "Indeed"), t("glassdoor", "Glassdoor"), t("greenhouse", "Greenhouse"), zoho("Recruit")] },
  },
  "internal-recruitment-coordinator": {
    impact: {
      heading: ["Match people to ", "the right roles", " with CleverLN."],
      description: "Run internal hiring and help employees grow into new roles. Where talent meets opportunity.",
      steps: [
        { title: "Discover", text: "Find the right people already inside the company." },
        { title: "Match", text: "Match employees to open roles fairly." },
        { title: "Grow", text: "Help people move up and stay longer." },
      ],
      casesTitle: "Weekly hiring cases inspired by real companies.",
      casesFooter: "Learn from those who’ve built real internal hiring programs.",
      jobsLine: "HR teams are hiring coordinators. Are you ready?",
    },
    tools: { list: [zoho("Recruit"), t("greenhouse", "Greenhouse"), t("linkedin", "LinkedIn"), t("slack", "Slack"), t("googlesheets", "Google Sheets")] },
  },
  "hr-analytics-specialist": {
    impact: {
      heading: ["Make ", "smarter people decisions", " with CleverLN."],
      description: "Track hiring, attrition and engagement with real workforce data. Where people meet data.",
      steps: [
        { title: "Collect", text: "Bring workforce data together in Excel." },
        { title: "Analyse", text: "Track hiring, attrition and engagement." },
        { title: "Report", text: "Share insights in Power BI dashboards." },
      ],
      casesTitle: "Weekly people-data cases inspired by real companies.",
      casesFooter: "Learn from those who’ve used data to make real people decisions.",
      jobsLine: "HR teams need data skills. Are you ready?",
    },
    tools: { list: [t("excel", "Excel"), t("powerbi", "Power BI"), t("googlesheets", "Google Sheets"), zoho("People"), t("python", "Python")] },
  },
  "people-operations-manager": {
    impact: {
      heading: ["Build ", "workplaces teams love", " with CleverLN."],
      description: "Manage onboarding, policies and employee experience with modern HR tools. Where people meet process.",
      steps: [
        { title: "Onboard", text: "Welcome new hires with smooth onboarding." },
        { title: "Support", text: "Run HR processes in Zoho People and Keka." },
        { title: "Engage", text: "Create an employee experience people love." },
      ],
      casesTitle: "Weekly people-ops cases inspired by real companies.",
      casesFooter: "Learn from those who’ve built real workplaces people love.",
      jobsLine: "Growing companies need people ops. Are you ready?",
    },
    tools: { list: [zoho("People"), t("keka", "Keka"), t("slack", "Slack"), t("notion", "Notion"), t("googlesheets", "Google Sheets")] },
  },
  "digital-marketing": {
    impact: {
      heading: ["Grow ", "brands online", " with CleverLN."],
      description: "Grow brands with SEO, social and paid ads, and measure what works. Where creativity meets data.",
      steps: [
        { title: "Attract", text: "Bring visitors in with SEO and social." },
        { title: "Convert", text: "Run Google Ads that turn clicks into customers." },
        { title: "Measure", text: "Track results in Google Analytics and improve." },
      ],
      casesTitle: "Weekly campaign challenges inspired by real brands.",
      casesFooter: "Learn from those who’ve grown real brands online.",
      jobsLine: "Brands need digital marketers. Are you ready?",
    },
    tools: { list: [t("googleads", "Google Ads"), t("googleanalytics", "Google Analytics"), t("meta", "Meta"), t("semrush", "Semrush"), t("wordpress", "WordPress")] },
  },
  "performance-marketing": {
    impact: {
      heading: ["Turn ad spend ", "into growth", " with CleverLN."],
      description: "Plan, run and optimise paid campaigns for real returns. Where every rupee counts.",
      steps: [
        { title: "Plan", text: "Set goals, budgets and audiences." },
        { title: "Launch", text: "Run campaigns on Google Ads and Meta Ads Manager." },
        { title: "Optimise", text: "Track results in GA4 and improve ROAS." },
      ],
      casesTitle: "Weekly ad campaigns inspired by real brands.",
      casesFooter: "Learn from those who’ve managed real ad budgets.",
      jobsLine: "Brands are hiring performance marketers. Are you ready?",
    },
    tools: { list: [t("googleads", "Google Ads"), t("meta", "Meta Ads Manager"), t("googleanalytics", "GA4"), t("googletagmanager", "Google Tag Manager"), t("semrush", "Semrush")] },
  },
};

// A course added later without an entry: neutral copy and no tool logos until one is written.
const GENERIC: CourseDetails = {
  impact: {
    heading: ["Turn ideas into ", "real impact", " with CleverLN."],
    description: "Learn by doing, with real projects, expert mentors and the tools teams use every day.",
    steps: [
      { title: "Build", text: "Learn by building, one real project at a time." },
      { title: "Apply", text: "Work on problems inspired by real companies." },
      { title: "Impact", text: "Turn your skills into measurable growth." },
    ],
    casesTitle: "Weekly use cases inspired by real companies.",
    casesFooter: "Learn from those who’ve built real systems and driven measurable growth.",
    jobsLine: "Don’t wait. Are you ready?",
  },
  tools: { list: [] },
};

export function getCourseDetails(course?: { slug?: string; title?: string }): CourseDetails & { stats: CourseStats } {
  const stats = { ...SHARED_STATS, ...(course?.slug ? COURSE_STATS[course.slug] : undefined) };
  if (course?.slug && DETAILS[course.slug]) return { ...DETAILS[course.slug], stats };
  // the template without a course (the /product page) shows UI/UX
  return { ...(course?.title ? GENERIC : UI_UX), stats };
}
