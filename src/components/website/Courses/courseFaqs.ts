import type { Faq } from "../ProductSections/FaqSection";

// FAQs for each course page: course-specific questions people search for (what it is, who can join, tools,
// jobs, plus one common question per course) and the platform questions answered for that course.
// Platform answers only restate what the site already promises (plan features, mentors, job portal,
// internship + LOR); nothing here invents fees, durations, salaries or placement guarantees.
// The same list renders on the page and as FAQPage structured data (see courses/[slug]/page.tsx).

type CourseFaqInfo = {
  name: string;
  what: string;
  whoFor: string;
  tools: string[];
  /** Replaces the default "You'll work hands-on with …" answer when a course is about skills more than software. */
  toolsAnswer?: string;
  roles: string[];
  projects: string;
  extra: Faq;
};

const COURSE_FAQS: Record<string, CourseFaqInfo> = {
  "agentic-ai": {
    name: "Agentic AI",
    what: "Agentic AI is AI that can plan steps, use tools and act on its own to finish a task, instead of only answering a prompt. More and more teams use AI agents to automate research, support and operations work, so people who can design and manage them are valuable.",
    whoFor: "Students, freshers and working professionals can join. Comfort with basic Python helps when you connect agents to tools; if you're newer to coding, our mentors help you whenever you get stuck.",
    tools: ["LangChain", "CrewAI"],
    roles: ["AI Agent Developer", "AI Automation Engineer", "Applied AI Engineer", "AI Solutions Specialist"],
    projects: "You'll design AI agents, connect them to tools and use them to complete real-world tasks end to end.",
    extra: {
      question: "What is the difference between Agentic AI and Generative AI?",
      answer: "Generative AI creates content such as text, images or code from a prompt. Agentic AI builds on it: an agent breaks a goal into steps, decides which tools to use and keeps acting until the task is done. CleverLN also offers a separate Generative AI course.",
    },
  },
  "generative-ai": {
    name: "Generative AI",
    what: "Generative AI is AI that creates new text, images and code from simple instructions. It's now part of everyday work in marketing, design, writing and software, so knowing how to use it well is a valuable skill in almost any role.",
    whoFor: "Anyone curious about AI can join, from students to working professionals. You don't need a technical background to start creating with generative AI tools, and our mentors help you whenever you get stuck.",
    tools: ["GPT models", "Gemini", "Stable Diffusion"],
    roles: ["Generative AI Specialist", "AI Content Creator", "Prompt Engineer", "AI Product Associate"],
    projects: "You'll work on creative projects where you generate text, images and code for real use cases.",
    extra: {
      question: "Is Generative AI only for people from a tech background?",
      answer: "No. Generative AI is used by marketers, designers, writers, HR teams and founders as much as by developers. The course focuses on practical, everyday use, so you can apply it in whichever field you work in.",
    },
  },
  "prompt-engineering": {
    name: "Prompt Engineering",
    what: "Prompt engineering is the skill of writing clear instructions so AI tools like ChatGPT, Claude and Gemini give you accurate, reliable results. Better prompts save time and lead to better work, which is why teams in every field value it.",
    whoFor: "Prompt engineering is open to everyone: students, freshers and professionals from any background. You don't need to know how to code to start, and our mentors are there whenever you get stuck.",
    tools: ["ChatGPT", "Claude", "Gemini"],
    roles: ["Prompt Engineer", "AI Content Specialist", "AI Operations Associate", "Conversational AI Designer"],
    projects: "You'll write and refine prompts for everyday tasks and learn how to get reliable, repeatable results.",
    extra: {
      question: "Do I need to know coding to learn prompt engineering?",
      answer: "No. Prompt engineering is mostly about clear thinking and clear writing, so you can learn it without coding. If you later want to build AI apps that act on their own, the Agentic AI course is a natural next step.",
    },
  },
  mlops: {
    name: "MLOps",
    what: "MLOps (machine learning operations) is the practice of taking machine learning models from a notebook to production and keeping them reliable there: deploying them, monitoring how they perform and scaling them as usage grows.",
    whoFor: "MLOps suits developers, data scientists and engineers who want to work on real deployments. Familiarity with Python and basic machine learning ideas helps, and our mentors support you whenever you get stuck.",
    tools: ["Docker", "MLflow"],
    roles: ["MLOps Engineer", "Machine Learning Engineer", "ML Platform Engineer", "AI Infrastructure Engineer"],
    projects: "You'll deploy, monitor and scale machine learning models through real deployment projects.",
    extra: {
      question: "What is the difference between MLOps and DevOps?",
      answer: "DevOps automates how software is built, tested and released. MLOps applies the same ideas to machine learning and adds what models need on top: tracking experiments, versioning data and models, and watching model accuracy after release. CleverLN also offers a DevOps Engineering course.",
    },
  },
  "financial-analytics": {
    name: "Financial Analytics",
    what: "Financial analytics uses data to understand how a business is performing and where it's heading: building forecasts, tracking key numbers and turning them into dashboards that help leaders make better decisions.",
    whoFor: "Commerce, finance, MBA and engineering students, freshers and working professionals can all join. Basic comfort with numbers is enough to start, and our mentors help whenever you get stuck.",
    tools: ["Excel", "Power BI", "Python"],
    roles: ["Financial Analyst", "FP&A Analyst", "Business Analyst", "Finance Data Analyst"],
    projects: "You'll work with real business data to build forecasts and dashboards.",
    extra: {
      question: "Is Excel enough for a career in financial analytics?",
      answer: "Excel is the foundation and you'll use it every day, but most finance teams now expect more. That's why the course also covers Power BI for dashboards and Python for working with larger data sets.",
    },
  },
  "fin-tech-engineering": {
    name: "Fin-Tech Engineering",
    what: "Fin-tech engineering is building the software behind modern money: payment systems, digital wallets, lending and banking apps. In India that means working with systems like UPI and payment gateways that must be fast, secure and reliable.",
    whoFor: "Engineering and computer science students, developers and working professionals interested in finance can join. Some programming experience helps, and our mentors support you whenever you get stuck.",
    tools: ["UPI", "Razorpay", "Python", "SQL"],
    roles: ["Fintech Software Engineer", "Payments Developer", "Backend Developer (Fintech)", "Fintech Product Analyst"],
    projects: "You'll work on real payment-system projects and build secure financial apps.",
    extra: {
      question: "Do I need a finance background for fin-tech engineering?",
      answer: "No. The course is built for people with a technology background, and you pick up the finance and payments ideas you need, like how UPI and payment gateways work, as you build.",
    },
  },
  "financial-risk-management": {
    name: "Financial Risk Management",
    what: "Financial risk management is identifying, measuring and controlling the risks a business or bank faces, such as market, credit and liquidity risk, so losses stay within limits the organisation can handle.",
    whoFor: "Finance, commerce, economics and MBA students, freshers and working professionals can join. Comfort with numbers helps, and our mentors support you whenever you get stuck.",
    tools: ["Excel", "Python", "VaR models"],
    roles: ["Risk Analyst", "Credit Risk Analyst", "Market Risk Analyst", "Risk Management Associate"],
    projects: "You'll study real market cases and learn to measure and manage risk.",
    extra: {
      question: "What is VaR (Value at Risk)?",
      answer: "Value at Risk estimates how much a portfolio could lose over a set period at a given confidence level, for example the most you'd expect to lose in a day, 95% of the time. It's one of the standard risk measures, and you'll learn to calculate it in Excel and Python.",
    },
  },
  "hotel-management": {
    name: "Hotel Management",
    what: "Hotel management is running a hotel day to day: front office, guest services and the operations that make every stay go smoothly. It's a people-focused career with opportunities in hotels, resorts and the wider hospitality industry.",
    whoFor: "Anyone who enjoys working with people can join, whether you're a student, a graduate or already working in hospitality. You don't need prior hotel experience to start, and our mentors support you throughout.",
    tools: ["hotel management systems"],
    toolsAnswer: "You'll learn to work with hotel management systems, the software hotels use for reservations, check-ins, guest records and billing, along with the front office and guest service routines used in real hotels.",
    roles: ["Front Office Executive", "Guest Relations Executive", "Hotel Operations Executive", "Guest Services Associate"],
    projects: "You'll learn through real hospitality operations, running front office and guest services.",
    extra: {
      question: "Is hotel management a good career choice?",
      answer: "Yes, for people who enjoy service and teamwork. Hotels, resorts, airlines, cruise lines and event companies all hire people with hospitality skills, and front office and guest service experience carries across all of them.",
    },
  },
  "corporate-event-management": {
    name: "Corporate Event Management",
    what: "Corporate event management is planning and running events for businesses, such as conferences, product launches, offsites and award nights, from the first budget to the last guest leaving.",
    whoFor: "Students, graduates and working professionals who are organised and enjoy working with people can join. You don't need event experience to start, and our mentors support you throughout.",
    tools: [],
    toolsAnswer: "The course focuses on the core skills of the job: planning event budgets, managing vendors and venues, and coordinating everything so events run smoothly on the day.",
    roles: ["Event Coordinator", "Corporate Event Planner", "Event Operations Executive", "Client Servicing Executive"],
    projects: "You'll work on real events, planning budgets and managing vendors and venues.",
    extra: {
      question: "What skills does a corporate event manager need?",
      answer: "Planning and budgeting, negotiating with vendors, managing venues, communicating with clients and staying calm when plans change on the day. The course builds these through real events, not just theory.",
    },
  },
  "ui-ux-design": {
    name: "UI/UX Design",
    what: "UI/UX design is designing digital products that are easy and enjoyable to use. UX (user experience) is about understanding users and their journeys; UI (user interface) is the look and layout of each screen.",
    whoFor: "Anyone can learn UI/UX, regardless of degree or background, whether you're from Development, Arts, Sales, MBA, BCA or any other field. Our mentors help you whenever you get stuck.",
    tools: ["Figma"],
    roles: ["UI Designer", "UX Designer", "Product Designer", "UX Researcher", "Interaction Designer", "Visual Designer"],
    projects: "You'll design real applications, studying user behaviour and building intuitive interfaces.",
    extra: {
      question: "Do I need drawing or coding skills to learn UI/UX?",
      answer: "No. UI/UX is about solving problems for users, not about drawing or code. Figma gives you everything you need to design screens, and you learn the visual basics step by step.",
    },
  },
  "motion-graphics": {
    name: "Motion Graphics",
    what: "Motion graphics is animated graphic design: moving logos, titles, explainer videos and social content that bring brands and stories to life.",
    whoFor: "Designers, video editors, students and creative professionals can join. Some design sense helps, but you don't need animation experience to start, and our mentors help whenever you get stuck.",
    tools: ["After Effects", "Premiere Pro"],
    roles: ["Motion Graphics Designer", "Video Editor", "Animator", "Content Designer"],
    projects: "You'll animate logos and type and tell stories with motion through real projects.",
    extra: {
      question: "What is the difference between motion graphics and animation?",
      answer: "Animation is the broad craft of making things move, including character animation. Motion graphics focuses on animating graphic design (text, logos, shapes and icons) for brands, ads, videos and social media.",
    },
  },
  "product-designer": {
    name: "Product Design",
    what: "Product design is shaping a digital product end to end: researching what users need, defining the problem, and designing and testing the experience until it works for both users and the business.",
    whoFor: "Designers, developers, students and professionals from any background can join. You don't need a design degree, and our mentors help whenever you get stuck.",
    tools: ["Figma", "Maze"],
    roles: ["Product Designer", "UX Designer", "UI/UX Designer", "UX Researcher"],
    projects: "You'll work on real products, researching user needs and prototyping apps end to end.",
    extra: {
      question: "What is the difference between a product designer and a UI/UX designer?",
      answer: "A UI/UX designer focuses on a product's experience and screens. A product designer covers that too, and also works on where the product is going: user research, business goals and measuring results with tools like Maze. CleverLN also offers a UI/UX Design course.",
    },
  },
  "fashion-designing": {
    name: "Fashion Designing",
    what: "Fashion designing is creating clothing and accessories, from the first idea and sketch to choosing fabrics, making patterns and building a finished collection.",
    whoFor: "Anyone with a passion for style can join, from students to working professionals. You don't need prior design training, and our mentors guide you throughout.",
    tools: ["Illustrator", "CLO 3D"],
    roles: ["Fashion Designer", "Assistant Designer", "Fashion Illustrator", "Textile Designer"],
    projects: "You'll work on real collections, learning about fabrics and sketching your own designs.",
    extra: {
      question: "What is CLO 3D used for in fashion design?",
      answer: "CLO 3D lets you design garments in 3D, see how fabric drapes and fits on a virtual model, and make changes before anything is sewn. It saves samples and time, which is why many fashion brands now use it alongside Illustrator.",
    },
  },
  "social-media-manager": {
    name: "Social Media Management",
    what: "Social media management is planning, creating and running a brand's presence on platforms like Instagram, Facebook and LinkedIn: deciding what to post, growing the community and measuring what works.",
    whoFor: "Students, freshers, creators and working professionals can join. You don't need marketing experience to start, and our mentors help whenever you get stuck.",
    tools: ["Meta Business Suite", "Canva"],
    roles: ["Social Media Manager", "Social Media Executive", "Content Strategist", "Community Manager"],
    projects: "You'll work with real brands to plan content and grow communities.",
    extra: {
      question: "Can I work as a freelance social media manager?",
      answer: "Yes. Many brands hire freelancers to manage their social media, and the skills you build (content planning, community growth and reporting) are exactly what clients look for. CleverLN Opportunities also lists freelancing work.",
    },
  },
  "java-full-stack-developer": {
    name: "Java Full Stack Development",
    what: "A Java full stack developer builds complete web applications: the back end (server, business logic and database) with Java and Spring Boot, and the front end users see, with React.",
    whoFor: "Engineering, BCA and MCA students, freshers and professionals switching to tech can join. Some programming basics help, and our mentors support you whenever you get stuck.",
    tools: ["Java", "Spring Boot", "React", "MySQL"],
    roles: ["Java Full Stack Developer", "Java Developer", "Backend Developer", "Software Engineer"],
    projects: "You'll build real apps, working on both the back end and the front end.",
    extra: {
      question: "Is Java still worth learning for full stack development?",
      answer: "Yes. Java with Spring Boot runs the back end of many banks, product companies and large enterprises, so Java developers remain widely hired. Pairing it with React means you can build and own complete applications.",
    },
  },
  "devops-engineering": {
    name: "DevOps Engineering",
    what: "DevOps engineering is automating how software is built, tested and released, and running the cloud infrastructure it lives on, so teams can ship faster and more reliably.",
    whoFor: "Developers, system administrators, IT support professionals and engineering students can join. Basic Linux and programming knowledge helps, and our mentors support you whenever you get stuck.",
    tools: ["Git", "Docker", "Kubernetes", "AWS"],
    roles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer (SRE)", "Build and Release Engineer"],
    projects: "You'll build real pipelines that automate deployments and manage the cloud.",
    extra: {
      question: "Do I need to know coding for DevOps?",
      answer: "You need some scripting, but not the depth of a full-time developer. Most DevOps work is writing pipelines, automation scripts and configuration files, which you'll practise on real pipelines in the course.",
    },
  },
  "python-developer": {
    name: "Python Development",
    what: "Python is one of the most widely used programming languages, powering web apps, automation, data and AI. A Python developer writes clean code to build APIs, scripts and back-end systems.",
    whoFor: "Python is a great first language, so beginners can join along with students and professionals switching to tech. Our mentors support you whenever you get stuck.",
    tools: ["Python", "Django", "Flask", "PostgreSQL"],
    roles: ["Python Developer", "Backend Developer", "Django Developer", "Software Engineer"],
    projects: "You'll work on real projects, building APIs and scripts with clean code.",
    extra: {
      question: "Is Python good for beginners?",
      answer: "Yes. Python's syntax is simple and readable, so you can focus on solving problems instead of fighting the language. It also opens doors to web development, automation, data and AI as you grow.",
    },
  },
  "automation-testing": {
    name: "Automation Testing",
    what: "Automation testing is writing scripts that test software automatically, so bugs are caught early and every release can be checked quickly instead of testing everything by hand.",
    whoFor: "Manual testers, freshers, students and developers can join. Some programming basics help when writing test scripts, and our mentors support you whenever you get stuck.",
    tools: ["Selenium", "TestNG", "Postman"],
    roles: ["Automation Test Engineer", "QA Engineer", "SDET (Software Development Engineer in Test)", "API Test Engineer"],
    projects: "You'll write reliable test scripts on real projects and learn to catch bugs early.",
    extra: {
      question: "What is the difference between manual and automation testing?",
      answer: "In manual testing a person runs each test by hand. In automation testing, scripts run the tests, so they can be repeated on every release in minutes. Teams use both; automation skills let you test faster and at a bigger scale.",
    },
  },
  "talent-acquisition-lead": {
    name: "Talent Acquisition",
    what: "Talent acquisition is the strategic side of hiring: finding, attracting and assessing the right people, building a strong employer brand and planning hiring for the business's future needs.",
    whoFor: "HR students, MBA graduates, recruiters and professionals moving into HR can join. You don't need recruitment experience to start, and our mentors support you throughout.",
    tools: ["LinkedIn Recruiter", "applicant tracking systems (ATS)"],
    roles: ["Talent Acquisition Specialist", "Talent Acquisition Lead", "Technical Recruiter", "HR Recruiter"],
    projects: "You'll learn through real hiring drives, sourcing and assessing candidates.",
    extra: {
      question: "What is the difference between recruitment and talent acquisition?",
      answer: "Recruitment fills open roles as they come up. Talent acquisition is longer term: it plans future hiring and builds talent pipelines and an employer brand, so the right people are ready when the business needs them.",
    },
  },
  "internal-recruitment-coordinator": {
    name: "Internal Recruitment",
    what: "Internal recruitment is filling open roles with people who already work at the company, through transfers and promotions. An internal recruitment coordinator runs that process and matches employees to new roles.",
    whoFor: "HR students, MBA graduates and HR or admin professionals can join. You don't need recruitment experience to start, and our mentors support you throughout.",
    tools: ["applicant tracking systems (ATS)", "HR systems"],
    roles: ["Internal Recruitment Coordinator", "Recruitment Coordinator", "HR Coordinator", "Talent Mobility Associate"],
    projects: "You'll learn through real hiring processes, matching employees to new roles.",
    extra: {
      question: "Why do companies hire internally?",
      answer: "Internal hiring is usually faster and less costly, and it keeps knowledge inside the company. It also gives employees a clear path to grow, which helps them stay, so many organisations now have people dedicated to internal mobility.",
    },
  },
  "hr-analytics-specialist": {
    name: "HR Analytics",
    what: "HR analytics uses workforce data, such as hiring, attrition, performance and engagement, to understand what's happening with people in an organisation and make better decisions about them.",
    whoFor: "HR professionals, MBA students and analysts interested in people data can join. Comfort with numbers helps, and our mentors support you whenever you get stuck.",
    tools: ["Excel", "Power BI"],
    roles: ["HR Analytics Specialist", "People Analytics Analyst", "HR Data Analyst", "HR Business Partner"],
    projects: "You'll work with real workforce data, tracking hiring and attrition.",
    extra: {
      question: "Do I need coding for HR analytics?",
      answer: "No. Most HR analytics work is done in Excel and Power BI, which is what the course focuses on. The key skills are asking the right questions about people data and presenting the answers clearly.",
    },
  },
  "people-operations-manager": {
    name: "People Operations",
    what: "People operations is the modern way of running HR: managing onboarding, employee experience, policies and HR processes so people can do their best work.",
    whoFor: "HR students, MBA graduates and HR or admin professionals can join. You don't need people-ops experience to start, and our mentors support you throughout.",
    tools: ["Zoho People", "Keka"],
    roles: ["People Operations Manager", "People Operations Specialist", "HR Operations Executive", "HR Generalist"],
    projects: "You'll learn from real workplaces, managing onboarding and employee experience.",
    extra: {
      question: "What is the difference between HR and people operations?",
      answer: "Traditional HR is often focused on administration and compliance. People operations covers that too, but treats employees more like customers, designing smooth processes and a good employee experience, often with HR software like Zoho People and Keka.",
    },
  },
  "digital-marketing": {
    name: "Digital Marketing",
    what: "Digital marketing is promoting a brand online through search engines, social media, ads, email and content, and measuring the results so you can keep improving.",
    whoFor: "Students, freshers, business owners and professionals from any background can join. You don't need marketing experience to start, and our mentors support you throughout.",
    tools: ["Google Ads", "Google Analytics"],
    roles: ["Digital Marketing Executive", "SEO Specialist", "Social Media Marketer", "PPC Specialist"],
    projects: "You'll work on real campaigns, growing brands with SEO, social and paid ads.",
    extra: {
      question: "Can I start freelancing after a digital marketing course?",
      answer: "Yes. Small businesses often hire freelancers for SEO, social media and ads, and the real campaigns you work on give you results to show clients. CleverLN Opportunities also lists freelancing work.",
    },
  },
  "performance-marketing": {
    name: "Performance Marketing",
    what: "Performance marketing is paid advertising focused on measurable results, such as leads, sales and app installs, where every rupee of ad spend is tracked and optimised for return.",
    whoFor: "Digital marketers, students, freshers and business owners can join. Basic comfort with numbers helps, and our mentors support you whenever you get stuck.",
    tools: ["Google Ads", "Meta Ads Manager", "GA4"],
    roles: ["Performance Marketing Executive", "Paid Media Specialist", "PPC Specialist", "Growth Marketer"],
    projects: "You'll work with real ad budgets, planning high-ROI campaigns.",
    extra: {
      question: "What is the difference between digital marketing and performance marketing?",
      answer: "Digital marketing covers everything a brand does online, including SEO, content and social media. Performance marketing is the paid, results-driven part, where you pay for clicks or conversions and optimise campaigns against numbers like ROAS and cost per lead.",
    },
  },
};

// "A, B and C"
function list(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

// Platform questions, the same promises for every course.
function platformFaqs(name: string, projects: string): Faq[] {
  return [
    {
      question: `Will I work on real ${name} projects?`,
      answer: `Yes. ${projects} Every plan includes 2+ real-time projects, and the Advantage + plan adds a real-time internship with a letter of recommendation (LOR).`,
    },
    {
      question: `Are the ${name} classes live or recorded?`,
      answer: "You learn on the CleverLN LMS with interactive live sessions, so you can ask questions as you learn. Dedicated mentors also help with your doubts after class, so you never feel stuck.",
    },
    {
      question: `Will I get a certificate after the ${name} course?`,
      answer: "Yes. You earn a CleverLN certificate when you complete the course. With the Advantage + plan you earn the CleverLN Pro certificate.",
    },
    {
      question: `Does CleverLN help with jobs after the ${name} course?`,
      answer: "Yes. Every plan includes access to the CleverLN job portal. The Advantage + plan adds a dedicated growth mentor, weekly AI interviews, tests and reports, and a real-time internship with an LOR. We don't leave you after the course: our team keeps supporting you with career opportunities.",
    },
    {
      question: `Which plan should I choose for ${name}: Standard or Advantage +?`,
      answer: "Choose Standard if you want flexible, self-paced learning with live sessions, the CleverLN certificate, job portal access and 2+ real-time projects. Choose Advantage + if you also want a real-time internship with an LOR, a dedicated growth mentor, weekly AI interviews and the CleverLN Pro certificate.",
    },
  ];
}

export function getCourseFaqs(course?: { slug?: string; title?: string }): { name: string; faqs: Faq[] } {
  // the template without a course (the /product page) shows UI/UX, so it gets the UI/UX questions
  const info = COURSE_FAQS[course?.slug ?? ""] ?? (course?.title ? undefined : COURSE_FAQS["ui-ux-design"]);

  if (!info) {
    // a course added later that has no FAQ entry yet: platform questions only
    const name = course?.title?.trim() || "this course";
    return {
      name,
      faqs: [
        {
          question: `Who can join the ${name} course?`,
          answer: "Students, freshers and working professionals from any background can join, and our mentors support you whenever you get stuck.",
        },
        ...platformFaqs(name, "You'll learn through a practical, hands-on approach focused on real work."),
      ],
    };
  }

  const { name } = info;
  return {
    name,
    faqs: [
      { question: `What is ${name}, and why should I learn it?`, answer: info.what },
      { question: `Who can join the ${name} course? Do I need prior experience?`, answer: info.whoFor },
      info.extra,
      {
        question: `Which tools will I learn in the ${name} course?`,
        answer: info.toolsAnswer ?? `You'll work hands-on with ${list(info.tools)}, practising each one through real assignments so you're comfortable using them on the job.`,
      },
      {
        question: `What jobs can I get after the ${name} course?`,
        answer: `You can apply for roles such as ${list(info.roles)}. The projects you build during the course become a portfolio you can show employers.`,
      },
      ...platformFaqs(name, info.projects),
    ],
  };
}

// FAQPage structured data (schema.org) for search engines, from the same questions shown on the page.
export function faqJsonLd(faqs: Faq[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }).replace(/</g, "\\u003c");
}
