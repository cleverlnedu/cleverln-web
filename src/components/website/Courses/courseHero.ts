// Course page hero: every course gets its own headline and description, plus one of ten "looks"
// (a person from the CleverLN landing-page photos, cut out with their outfit recoloured to match the backdrop).
// Backdrops follow 60/30/10: a neutral panel and dots, brand green blocks (about 30% of the visible
// backdrop for every look), and an accent block + doodles that repeat the outfit colour.
import type { HeroPerson } from "./CourseHeroPerson";

export type HeroPalette = {
  panel: string;
  dot: string;
  soft: string;   // light accent block
  accent: string; // doodles
};

export type HeroLayoutName = "A" | "B" | "C";

/** A cut-out landing-page photo (transparent background, cropped at the waist) used instead of the illustrated person. */
export type HeroPhoto = {
  src: string;
  /** Pixel size of the file, for its aspect ratio. */
  width: number;
  height: number;
  /** Height of the person in the 304x308 frame (bottom-anchored). */
  size: number;
};

export type CourseHero = {
  headline: string;
  /** Paragraph under the headline; when missing the course description from the database is used. */
  description?: string;
  palette: HeroPalette;
  layout: HeroLayoutName;
  /** Illustrated person; also the fallback design when a look has a photo. */
  person: HeroPerson;
  photo?: HeroPhoto;
  /** Centre of the person in the 304-wide frame and their size; tuned so green stays near 30% of the visible backdrop. */
  personX: number;
  personScale?: number;
};

type Look = Omit<CourseHero, "headline" | "description">;

// Outfit colours by course family: violet / cobalt for AI (imagination, intelligence), gold / burgundy for finance
// (value, authority), coral / fuchsia for design (creativity, self-expression), azure for tech (clarity, focus),
// rose / plum for HR (empathy, care) and marigold for marketing (optimism, energy).
const LOOKS = {
  violet: {
    layout: "A", personX: 128, palette: { panel: "#fbfbfd", dot: "#edebf3", soft: "#e1d8fc", accent: "#916fd4" },
    person: { skin: "#c98d65", hair: "long", outfit: "top", color: "#6641a5", pose: "books", prop: "#e1d8fc" },
    photo: { src: "/images/course-heroes/violet.webp", width: 979, height: 1200, size: 280 },
  },
  cobalt: {
    layout: "A", personX: 156, palette: { panel: "#fafbfe", dot: "#eaedf4", soft: "#cfdeff", accent: "#6789db" },
    person: { skin: "#a86d48", hair: "short", outfit: "sweatshirt", color: "#4062be", pose: "tablet" },
    photo: { src: "/images/course-heroes/cobalt.webp", width: 1063, height: 1200, size: 280 },
  },
  gold: {
    layout: "B", personX: 174, palette: { panel: "#fcfbf8", dot: "#f0ece5", soft: "#efdcb9", accent: "#e7b551" },
    person: { skin: "#d5a07a", hair: "side", outfit: "blazer", color: "#3b3f46", tie: "#c89937", pose: "crossed" },
    photo: { src: "/images/course-heroes/gold.webp", width: 1014, height: 1200, size: 280 },
  },
  burgundy: {
    layout: "A", personX: 132, palette: { panel: "#fefafb", dot: "#f3eaec", soft: "#fcd1d9", accent: "#bc516f" },
    person: { skin: "#e0ad88", hair: "bun", outfit: "blazer", color: "#862847", pose: "point" },
    photo: { src: "/images/course-heroes/burgundy.webp", width: 1099, height: 1200, size: 280 },
  },
  coral: {
    layout: "A", personX: 132, palette: { panel: "#fefaf9", dot: "#f3ebe8", soft: "#fdd3c7", accent: "#f18664" },
    person: { skin: "#b98058", hair: "curly", outfit: "sweatshirt", color: "#ec7859", pose: "point", mouth: "open" },
    photo: { src: "/images/course-heroes/coral.webp", width: 873, height: 1200, size: 280 },
  },
  fuchsia: {
    layout: "C", personX: 140, personScale: 1.1, palette: { panel: "#fdfafb", dot: "#f3eaed", soft: "#fad1e1", accent: "#d65997" },
    person: { skin: "#9b623f", hair: "ponytail", outfit: "top", color: "#a62b6d", pose: "books", prop: "#fad1e1" },
    photo: { src: "/images/course-heroes/fuchsia.webp", width: 1195, height: 1200, size: 260 },
  },
  azure: {
    layout: "B", personX: 172, palette: { panel: "#f9fbfe", dot: "#e8eef3", soft: "#c4e2fe", accent: "#5b9ed8" },
    person: { skin: "#8a5638", hair: "short", beard: true, outfit: "sweatshirt", color: "#2877b3", pose: "crossed" },
    photo: { src: "/images/course-heroes/azure.webp", width: 953, height: 1200, size: 280 },
  },
  rose: {
    layout: "C", personX: 160, personScale: 1.06, palette: { panel: "#fefafa", dot: "#f3eaeb", soft: "#fed1d3", accent: "#d78d92" },
    person: { skin: "#e3b38f", hair: "long", outfit: "sweatshirt", color: "#b97c7e", pose: "tablet" },
    photo: { src: "/images/course-heroes/rose.webp", width: 1063, height: 1200, size: 280 },
  },
  plum: {
    layout: "B", personX: 176, palette: { panel: "#fdfafc", dot: "#f1eaef", soft: "#f4d2eb", accent: "#9b5a8e" },
    person: { skin: "#b07650", hair: "bun", glasses: true, outfit: "blazer", color: "#4c2544", pose: "wave" },
    photo: { src: "/images/course-heroes/plum.webp", width: 1133, height: 1200, size: 270 },
  },
  marigold: {
    layout: "B", personX: 168, palette: { panel: "#fdfbf8", dot: "#f1ece6", soft: "#f3d9ba", accent: "#fcaf41" },
    person: { skin: "#c48a60", hair: "side", outfit: "sweatshirt", color: "#f7a745", pose: "thumbsUp", mouth: "open" },
    photo: { src: "/images/course-heroes/marigold.webp", width: 873, height: 1200, size: 280 },
  },
} satisfies Record<string, Look>;

type LookName = keyof typeof LOOKS;

// Looks a course added later can get, by category.
const CATEGORY_LOOKS: Record<string, LookName[]> = {
  "Next-Gen AI": ["violet", "cobalt"],
  Finance: ["gold", "burgundy"],
  DesignX: ["coral", "fuchsia"],
  "Tech Pro": ["azure"],
  "HR Skills": ["rose", "plum"],
  Business: ["marigold", "fuchsia", "gold", "burgundy"],
};

const COURSES: Record<string, { headline: string; description: string; look: LookName }> = {
  // Next-Gen AI
  "agentic-ai": { headline: "Learn Agentic AI and build AI agents that get real work done.",
    description: "Learn Agentic AI through a practical, hands-on approach focused on real-world use that helps you design AI agents, connect them to tools, and work with frameworks like LangChain and CrewAI.",
    look: "violet" },
  "prompt-engineering": { headline: "Learn Prompt Engineering and get better results from AI.",
    description: "Learn Prompt Engineering through a practical, hands-on approach focused on everyday use that helps you write clear prompts, get reliable results, and work with ChatGPT, Claude and Gemini.",
    look: "cobalt" },
  mlops: { headline: "Learn MLOps and take ML models all the way to production.",
    description: "Learn MLOps through a practical, hands-on approach focused on real deployments that helps you deploy, monitor and scale ML models, and work with industry tools like Docker and MLflow.",
    look: "cobalt" },
  "generative-ai": { headline: "Learn Generative AI and turn ideas into everyday tools.",
    description: "Learn Generative AI through a practical, hands-on approach focused on creative projects that helps you generate text, images and code, and work with models like GPT, Gemini and Stable Diffusion.",
    look: "violet" },
  // Finance
  "financial-analytics": { headline: "Learn Financial Analytics and make smarter decisions.",
    description: "Learn Financial Analytics through a practical, hands-on approach focused on real business data that helps you build forecasts and dashboards, and work with tools like Excel, Power BI and Python.",
    look: "gold" },
  "financial-risk-management": { headline: "Learn Financial Risk Management the practical way.",
    description: "Learn Financial Risk Management through a practical, hands-on approach focused on real market cases that helps you measure and manage risk, and work with tools like Excel, Python and VaR models.",
    look: "burgundy" },
  "fin-tech-engineering": { headline: "Learn Fin-Tech Engineering and build the future of money.",
    description: "Learn Fin-Tech Engineering through a practical, hands-on approach focused on real payment systems that helps you build secure financial apps, and work with UPI, Razorpay, Python and SQL.",
    look: "gold" },
  // DesignX
  "ui-ux-design": { headline: "Learn UI/UX and build your skills in a unique, modern way.",
    description: "Learn UI/UX design through a practical, hands-on approach focused on applications and helps you understand user behavior, design intuitive interfaces, and work with industry tools like Figma.",
    look: "coral" },
  "product-designer": { headline: "Become a Product Designer and shape products people love.",
    description: "Learn Product Design through a practical, hands-on approach focused on real products that helps you research user needs, prototype apps end to end, and work with tools like Figma and Maze.",
    look: "fuchsia" },
  "motion-graphics": { headline: "Learn Motion Graphics and bring your designs to life.",
    description: "Learn Motion Graphics through a practical, hands-on approach focused on real projects that helps you animate logos and type, tell stories with motion, and work with After Effects and Premiere Pro.",
    look: "coral" },
  "fashion-designing": { headline: "Learn Fashion Designing and make style your career.",
    description: "Learn Fashion Designing through a practical, hands-on approach focused on real collections that helps you understand fabrics, sketch your designs, and work with tools like Illustrator and CLO 3D.",
    look: "fuchsia" },
  // Tech Pro
  "java-full-stack-developer": { headline: "Become a Java Full Stack Developer and build apps end to end.",
    description: "Learn Java Full Stack Development through a practical, hands-on approach focused on real apps that helps you build back ends and front ends, and work with Spring Boot, React and MySQL.",
    look: "azure" },
  "automation-testing": { headline: "Learn Automation Testing and ship bug-free software.",
    description: "Learn Automation Testing through a practical, hands-on approach focused on real projects that helps you write reliable test scripts, catch bugs early, and work with Selenium, TestNG and Postman.",
    look: "azure" },
  "devops-engineering": { headline: "Learn DevOps Engineering and ship software faster.",
    description: "Learn DevOps Engineering through a practical, hands-on approach focused on real pipelines that helps you automate deployments, manage the cloud, and work with Git, Docker, Kubernetes and AWS.",
    look: "azure" },
  "python-developer": { headline: "Become a Python Developer for today’s most in-demand roles.",
    description: "Learn Python Development through a practical, hands-on approach focused on real projects that helps you write clean code, build APIs and scripts, and work with Django, Flask and PostgreSQL.",
    look: "azure" },
  // HR Skills
  "hr-analytics-specialist": { headline: "Become an HR Analytics Specialist who leads with data.",
    description: "Learn HR Analytics through a practical, hands-on approach focused on real workforce data that helps you track hiring and attrition, make better people decisions, and work with Excel and Power BI.",
    look: "plum" },
  "talent-acquisition-lead": { headline: "Become a Talent Acquisition Lead who hires the right people.",
    description: "Learn Talent Acquisition through a practical, hands-on approach focused on real hiring drives that helps you source and assess candidates, and work with LinkedIn Recruiter and ATS tools.",
    look: "rose" },
  "people-operations-manager": { headline: "Become a People Operations Manager teams love.",
    description: "Learn People Operations through a practical, hands-on approach focused on real workplaces that helps you manage onboarding and employee experience, and work with tools like Zoho People and Keka.",
    look: "plum" },
  "internal-recruitment-coordinator": { headline: "Become an Internal Recruitment Coordinator.",
    description: "Learn Internal Recruitment through a practical, hands-on approach focused on real hiring processes that helps you match employees to new roles, and work with applicant tracking and HR systems.",
    look: "rose" },
  // Business
  "digital-marketing": { headline: "Learn Digital Marketing and grow brands online.",
    description: "Learn Digital Marketing through a practical, hands-on approach focused on real campaigns that helps you grow brands with SEO, social and paid ads, and work with Google Ads and Google Analytics.",
    look: "marigold" },
  "performance-marketing": { headline: "Learn Performance Marketing and turn ad spend into growth.",
    description: "Learn Performance Marketing through a practical, hands-on approach focused on real ad budgets that helps you plan high-ROI campaigns, and work with Google Ads, Meta Ads Manager and GA4.",
    look: "marigold" },
  "social-media-manager": { headline: "Become a Social Media Manager and build loyal communities.",
    description: "Learn Social Media Management through a practical, hands-on approach focused on real brands that helps you plan content, grow communities, and work with tools like Meta Business Suite and Canva.",
    look: "fuchsia" },
  "hotel-management": { headline: "Learn Hotel Management and run world-class hotels.",
    description: "Learn Hotel Management through a practical, hands-on approach focused on real hospitality operations that helps you run front office and guest services, and work with hotel management systems.",
    look: "gold" },
  "corporate-event-management": { headline: "Learn Corporate Event Management, from plan to stage.",
    description: "Learn Corporate Event Management through a practical, hands-on approach focused on real events that helps you plan budgets, manage vendors and venues, and deliver events that run smoothly.",
    look: "burgundy" },
};

const ALL_LOOKS = Object.keys(LOOKS) as LookName[];

// Stable pick for courses added later, so a new course still gets a look from its family.
function hash(text: string) {
  let value = 0;
  for (const char of text) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  return value;
}

export function getCourseHero(course?: { slug?: string; category?: string | null; title?: string } | null): CourseHero {
  const slug = course?.slug ?? "ui-ux-design";
  const known = COURSES[slug];
  if (known) return { headline: known.headline, description: known.description, ...LOOKS[known.look] };
  const choices = CATEGORY_LOOKS[course?.category ?? ""] ?? ALL_LOOKS;
  return { headline: course?.title || COURSES["ui-ux-design"].headline, ...LOOKS[choices[hash(slug) % choices.length]] };
}
