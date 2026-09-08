export type CleverLNCourse = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  premium: boolean;
  category: string;
};

export const cleverLNCourses: CleverLNCourse[] = [
  /* =========================================================
     NEXT-GEN AI
  ========================================================= */

  {
    id: 1,
    slug: "ai-genai-engineer",
    title:
      "The Complete AI & GenAI Engineer Bootcamp 2026: Zero to Hero",
    description:
      "Master AI, Generative AI and modern engineering skills through practical learning.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: true,
    category: "Next-Gen AI",
  },

  {
    id: 2,
    slug: "generative-ai-masterclass",
    title:
      "Generative AI Masterclass: Build Real-World AI Applications",
    description:
      "Learn modern Generative AI tools and techniques through practical projects.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: false,
    category: "Next-Gen AI",
  },

  {
    id: 3,
    slug: "agentic-ai",
    title:
      "Agentic AI: Build Intelligent AI Agents From Scratch",
    description:
      "Learn how to design and build intelligent AI agents for real-world use cases.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: true,
    category: "Next-Gen AI",
  },

  {
    id: 4,
    slug: "prompt-engineering",
    title:
      "Advanced Prompt Engineering With Practical AI Workflows",
    description:
      "Build powerful prompts and AI workflows for professional applications.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: false,
    category: "Next-Gen AI",
  },

  {
    id: 5,
    slug: "machine-learning",
    title:
      "Machine Learning Complete Career Program",
    description:
      "Learn machine learning concepts and practical implementation.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: false,
    category: "Next-Gen AI",
  },

  {
    id: 6,
    slug: "deep-learning",
    title:
      "Deep Learning & Neural Networks Professional Program",
    description:
      "Build a strong foundation in deep learning and neural networks.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: true,
    category: "Next-Gen AI",
  },

  {
    id: 7,
    slug: "ai-automation",
    title:
      "AI Automation & Productivity Master Program",
    description:
      "Learn how to automate repetitive workflows using modern AI tools.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 787,
    premium: false,
    category: "Next-Gen AI",
  },


  /* =========================================================
     FINANCE
  ========================================================= */

  {
    id: 8,
    slug: "financial-analysis",
    title:
      "Financial Analysis & Investment Banking Program",
    description:
      "Develop practical financial analysis and investment skills.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 562,
    premium: true,
    category: "Finance",
  },

  {
    id: 9,
    slug: "financial-modeling",
    title:
      "Financial Modeling & Valuation Complete Course",
    description:
      "Learn professional financial modeling and valuation techniques.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 421,
    premium: false,
    category: "Finance",
  },

  {
    id: 10,
    slug: "stock-market",
    title:
      "Stock Market & Investment Fundamentals",
    description:
      "Understand the fundamentals of markets, investing and financial planning.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 378,
    premium: false,
    category: "Finance",
  },

  {
    id: 11,
    slug: "fintech",
    title:
      "FinTech & Digital Finance Professional Program",
    description:
      "Explore modern financial technology and digital finance.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 299,
    premium: true,
    category: "Finance",
  },

  {
    id: 12,
    slug: "business-finance",
    title:
      "Business Finance & Corporate Strategy",
    description:
      "Build practical knowledge of corporate finance and strategy.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 245,
    premium: false,
    category: "Finance",
  },


  /* =========================================================
     DESIGNX
  ========================================================= */

  {
    id: 13,
    slug: "ui-ux-design",
    title:
      "UI/UX Design Professional Career Program",
    description:
      "Learn user research, interface design and professional UX workflows.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 635,
    premium: true,
    category: "DesignX",
  },

  {
    id: 14,
    slug: "graphic-design",
    title:
      "Graphic Design Complete Professional Program",
    description:
      "Develop practical graphic design skills for modern creative work.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 482,
    premium: false,
    category: "DesignX",
  },

  {
    id: 15,
    slug: "product-design",
    title:
      "Product Design & Design Thinking Program",
    description:
      "Learn product design thinking and real-world design processes.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 356,
    premium: true,
    category: "DesignX",
  },

  {
    id: 16,
    slug: "motion-design",
    title:
      "Motion Graphics & Visual Design",
    description:
      "Create engaging motion graphics and visual experiences.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 287,
    premium: false,
    category: "DesignX",
  },

  {
    id: 17,
    slug: "canva-design",
    title:
      "Canva & Digital Design Masterclass",
    description:
      "Create professional designs and social media assets.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 218,
    premium: false,
    category: "DesignX",
  },


  /* =========================================================
     TECH PRO
  ========================================================= */

  {
    id: 18,
    slug: "full-stack-development",
    title:
      "Full Stack Development Professional Program",
    description:
      "Build modern websites and applications using full-stack technologies.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 721,
    premium: true,
    category: "Tech Pro",
  },

  {
    id: 19,
    slug: "frontend-development",
    title:
      "Frontend Development With Modern Technologies",
    description:
      "Build responsive and interactive modern web interfaces.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 543,
    premium: false,
    category: "Tech Pro",
  },

  {
    id: 20,
    slug: "backend-development",
    title:
      "Backend Development & API Engineering",
    description:
      "Learn backend architecture, APIs and database integration.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 412,
    premium: true,
    category: "Tech Pro",
  },

  {
    id: 21,
    slug: "python-development",
    title:
      "Python Programming & Application Development",
    description:
      "Master Python programming through practical application development.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 389,
    premium: false,
    category: "Tech Pro",
  },

  {
    id: 22,
    slug: "cloud-computing",
    title:
      "Cloud Computing & DevOps Professional Program",
    description:
      "Learn cloud infrastructure and modern DevOps workflows.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 302,
    premium: false,
    category: "Tech Pro",
  },


  /* =========================================================
     ENTREPRENEUR PRO
  ========================================================= */

  {
    id: 23,
    slug: "entrepreneurship",
    title:
      "Entrepreneurship & Startup Building Program",
    description:
      "Learn how to validate, build and grow a startup.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 287,
    premium: true,
    category: "Entrepreneur Pro",
  },

  {
    id: 24,
    slug: "digital-business",
    title:
      "Digital Business & Growth Strategy",
    description:
      "Learn how to build and scale modern digital businesses.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 245,
    premium: false,
    category: "Entrepreneur Pro",
  },

  {
    id: 25,
    slug: "marketing-strategy",
    title:
      "Marketing Strategy & Brand Growth Program",
    description:
      "Develop practical marketing and brand growth strategies.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 321,
    premium: false,
    category: "Entrepreneur Pro",
  },

  {
    id: 26,
    slug: "sales-business",
    title:
      "Sales & Business Development Masterclass",
    description:
      "Build professional sales and business development skills.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 276,
    premium: true,
    category: "Entrepreneur Pro",
  },


  /* =========================================================
     HR SKILLS
  ========================================================= */

  {
    id: 27,
    slug: "human-resources",
    title:
      "Human Resource Management Professional Program",
    description:
      "Build practical HR skills for modern workplaces.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 392,
    premium: true,
    category: "HR Skills",
  },

  {
    id: 28,
    slug: "talent-acquisition",
    title:
      "Talent Acquisition & Recruitment Program",
    description:
      "Learn modern recruitment and talent acquisition strategies.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 328,
    premium: false,
    category: "HR Skills",
  },

  {
    id: 29,
    slug: "hr-analytics",
    title:
      "HR Analytics & People Data Program",
    description:
      "Use data and analytics to make better people decisions.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 216,
    premium: false,
    category: "HR Skills",
  },

  {
    id: 30,
    slug: "learning-development",
    title:
      "Learning & Development Professional Program",
    description:
      "Build employee learning and professional development programs.",
    image: "/images/search-section/ai.webp",
    rating: 4.5,
    reviews: 189,
    premium: true,
    category: "HR Skills",
  },
];


export const cleverLNCategories = [
  "Next-Gen AI",
  "Finance",
  "DesignX",
  "Tech Pro",
  "Entrepreneur Pro",
  "HR Skills",
];