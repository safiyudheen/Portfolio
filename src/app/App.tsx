import { useState, useEffect, useRef } from "react";
import grabgoImg from "@/imports/grabgo.jpg";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Download,
  Menu,
  X,
  ChevronDown,
  Send,
  Mail,
  ArrowUpRight,
} from "lucide-react";

// ─── Types & Data ──────────────────────────────────────────────────────────────

const DISC_CATEGORIES = ["Product Design", "Marketing & Branding", "Motion Design", "Architecture"] as const;
const TABS = ["Featured Projects", ...DISC_CATEGORIES] as const;
type DisciplineCategory = typeof DISC_CATEGORIES[number];
type Tab = typeof TABS[number];

interface Project {
  id: number;
  title: string;
  subtitle: string;
  industry: string;
  discipline: string;
  role: string;
  year: string;
  outcome: string;
  category: DisciplineCategory;
  featured: boolean;
  featuredSpan: "large" | "medium";
  image: string;
  tags: string[];
}

// ─── Real projects from Behance (behance.net/safiyudheen) ────────────────────

const PROJECTS: Project[] = [
  // ── Product Design (6) ──────────────────────────────────────────────────────
  {
    id: 1,
    title: "GrubGo — Food Truck App",
    subtitle: "End-to-end UX case study for a food truck discovery and ordering experience.",
    industry: "Food & Beverage",
    discipline: "UX / Product Design",
    role: "UX Designer",
    year: "2023",
    outcome: "Full case study — research, wireframes, high-fidelity prototype and usability testing",
    category: "Product Design",
    featured: true,
    featuredSpan: "large",
    image: grabgoImg,
    tags: ["Case Study", "UX Research", "Prototyping", "Figma"],
  },
  {
    id: 3,
    title: "RUB Bank",
    subtitle: "Mobile banking app — account management, transfers and transaction history.",
    industry: "Financial Technology",
    discipline: "UX / Product Design",
    role: "UX Designer",
    year: "2023",
    outcome: "Complete app design with design system and component library",
    category: "Product Design",
    featured: true,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=560&fit=crop&auto=format",
    tags: ["FinTech", "Mobile App", "Design System"],
  },
  {
    id: 4,
    title: "EGfin — Predict-a-Day",
    subtitle: "Gamified stock-prediction feature prototype for a fintech trading app.",
    industry: "Financial Technology",
    discipline: "UX / Product Design",
    role: "UX Designer",
    year: "2023",
    outcome: "Interactive Figma prototype demonstrating the gamified prediction flow",
    category: "Product Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=560&fit=crop&auto=format",
    tags: ["Gamification", "FinTech", "Prototype"],
  },
  {
    id: 5,
    title: "NxtBank Dashboard",
    subtitle: "Responsive online banking dashboard for a digital-first neobank.",
    industry: "Financial Technology",
    discipline: "UX / Product Design",
    role: "UX Designer",
    year: "2022",
    outcome: "Responsive desktop and mobile dashboard with multi-account overview",
    category: "Product Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=560&fit=crop&auto=format",
    tags: ["Dashboard", "Responsive Design", "FinTech"],
  },
  {
    id: 6,
    title: "Puffy Website Redesign",
    subtitle: "UI redesign for a premium sleep brand's e-commerce website.",
    industry: "E-Commerce / Retail",
    discipline: "UI / Product Design",
    role: "UI Designer",
    year: "2022",
    outcome: "Full UI overhaul with improved hierarchy, typography and conversion flow",
    category: "Product Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=560&fit=crop&auto=format",
    tags: ["UI Redesign", "E-Commerce", "Web Design"],
  },

  // ── Marketing & Branding (6) ─────────────────────────────────────────────────
  {
    id: 7,
    title: "Craft Peedika",
    subtitle: "Logo and brand identity for a handmade crafts and gifting business.",
    industry: "Retail / Handmade",
    discipline: "Brand Identity",
    role: "Brand Designer",
    year: "2021",
    outcome: "Full logo system, colour palette and brand collateral package",
    category: "Marketing & Branding",
    featured: true,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=560&fit=crop&auto=format",
    tags: ["Logo Design", "Brand Identity", "Collateral"],
  },
  {
    id: 8,
    title: "Fresh Now — Dubai Expo",
    subtitle: "Promotional video for Fresh Now's presence at Dubai Expo 2022.",
    industry: "Food & Beverage",
    discipline: "Video Production",
    role: "Motion Designer",
    year: "2022",
    outcome: "Promo video produced for international exhibition audience",
    category: "Marketing & Branding",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=560&fit=crop&auto=format",
    tags: ["Promo Video", "Motion", "Brand Campaign"],
  },
  {
    id: 9,
    title: "Fresh Now — Celebrate",
    subtitle: "#CelebrateWithFreshNow brand promo video campaign.",
    industry: "Food & Beverage",
    discipline: "Video Production",
    role: "Motion Designer",
    year: "2022",
    outcome: "Social-first promo video for festive brand campaign",
    category: "Marketing & Branding",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=560&fit=crop&auto=format",
    tags: ["Brand Film", "Social Campaign", "After Effects"],
  },
  {
    id: 10,
    title: "Fresh Now — Happy Times",
    subtitle: "Feel-good brand film capturing Fresh Now's summer campaign.",
    industry: "Food & Beverage",
    discipline: "Video Production",
    role: "Motion Designer",
    year: "2022",
    outcome: "Lifestyle brand video for digital and social distribution",
    category: "Marketing & Branding",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=560&fit=crop&auto=format",
    tags: ["Brand Film", "Lifestyle", "Video Production"],
  },
  {
    id: 11,
    title: "NSS NIT Calicut",
    subtitle: "Website design for the National Service Scheme chapter at NIT Calicut.",
    industry: "Education / Non-profit",
    discipline: "Web Design",
    role: "UI Designer",
    year: "2021",
    outcome: "Full website UI designed and handed off to the development team",
    category: "Marketing & Branding",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=560&fit=crop&auto=format",
    tags: ["Web Design", "Non-profit", "UI Design"],
  },
  {
    id: 12,
    title: "NITC — Dept. of Architecture",
    subtitle: "Brand materials and print collateral for NIT Calicut's Architecture department.",
    industry: "Education",
    discipline: "Graphic Design",
    role: "Graphic Designer",
    year: "2021",
    outcome: "Department identity materials including print and digital assets",
    category: "Marketing & Branding",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=560&fit=crop&auto=format",
    tags: ["Print Design", "Brand Collateral", "Graphic Design"],
  },

  // ── Motion Design / Motion & Learning (6) ────────────────────────────────────
  {
    id: 13,
    title: "Tynker Explainer Video",
    subtitle: "2D motion explainer introducing Tynker's K–5 coding platform to young learners.",
    industry: "Education Technology",
    discipline: "Motion Graphics",
    role: "Motion Designer at BYJU'S",
    year: "2022",
    outcome: "Produced end-to-end — storyboard, animation, sound coordination and QC",
    category: "Motion Design",
    featured: true,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=560&fit=crop&auto=format",
    tags: ["2D Animation", "After Effects", "EdTech"],
  },
  {
    id: 14,
    title: "Willow — Know Challenge",
    subtitle: "Test platform UI for gamified general knowledge challenges.",
    industry: "Education Technology",
    discipline: "Learning Experience Design",
    role: "UX / LX Designer",
    year: "2023",
    outcome: "Fully interactive prototype with onboarding, quiz and results flows",
    category: "Motion Design",
    featured: true,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=560&fit=crop&auto=format",
    tags: ["EdTech", "Gamification", "UX Prototype"],
  },
  {
    id: 15,
    title: "Willow — Learn with Cards",
    subtitle: "Swipeable card-based learning prototype for bite-sized topic mastery.",
    industry: "Education Technology",
    discipline: "Learning Experience Design",
    role: "UX / LX Designer",
    year: "2023",
    outcome: "Interactive prototype exploring micro-learning via card mechanics",
    category: "Motion Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=560&fit=crop&auto=format",
    tags: ["Micro-Learning", "Interactive", "Figma"],
  },
  {
    id: 16,
    title: "Willow — AI Tutor Chatbot",
    subtitle: "Conversational AI tutor interface for subject-specific learning dialogues.",
    industry: "Education Technology",
    discipline: "AI Interface Design",
    role: "UX Designer",
    year: "2023",
    outcome: "Chat interface designed for AI-powered maths and science tutoring",
    category: "Motion Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=560&fit=crop&auto=format",
    tags: ["AI Interface", "Chatbot UX", "EdTech"],
  },
  {
    id: 17,
    title: "Aakash BYJU'S — Motion Graphics",
    subtitle: "Animated visual explainers for Maths, Physics and Chemistry concepts.",
    industry: "Education Technology",
    discipline: "Motion Graphics",
    role: "Creative Associate at BYJU'S",
    year: "2022",
    outcome: "Style guides, content boards and motion animations for live class platform",
    category: "Motion Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=800&h=560&fit=crop&auto=format",
    tags: ["Motion Graphics", "Education", "After Effects"],
  },
  {
    id: 18,
    title: "HighRadius Digital Learning",
    subtitle: "LMS experience design for internal corporate training at scale.",
    industry: "B2B SaaS / FinTech",
    discipline: "Learning Experience Design",
    role: "Senior Graphic Designer at HighRadius",
    year: "2024",
    outcome: "15+ in-house courses designed; Highflyer Award H1 2024",
    category: "Motion Design",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=560&fit=crop&auto=format",
    tags: ["LMS Design", "Articulate Storyline", "Instructional Design"],
  },

  // ── Architecture (6) — NIT Calicut thesis & studio work ──────────────────────
  {
    id: 19,
    title: "Angel Lini Memorial Hospital",
    subtitle: "Multi-specialty hospital design integrating healing environments and efficient clinical flow.",
    industry: "Healthcare / Architecture",
    discipline: "Architecture",
    role: "Architectural Designer",
    year: "2020",
    outcome: "Comprehensive design proposal with site plan, floor plans and 3D renders",
    category: "Architecture",
    featured: true,
    featuredSpan: "large",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=560&fit=crop&auto=format",
    tags: ["Healthcare Design", "3D Rendering", "Revit"],
  },
  {
    id: 20,
    title: "Tale of Three Cities",
    subtitle: "Urban design study comparing spatial, social and cultural patterns across three Indian cities.",
    industry: "Urban Design",
    discipline: "Architecture",
    role: "Architectural Designer",
    year: "2019",
    outcome: "Research-led urban design proposal with analysis, mapping and intervention strategies",
    category: "Architecture",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=560&fit=crop&auto=format",
    tags: ["Urban Design", "Research", "Spatial Analysis"],
  },
  {
    id: 21,
    title: "Aashrayam — Low Cost Residence",
    subtitle: "Affordable residential design balancing cost efficiency with dignified living quality.",
    industry: "Residential / Social Housing",
    discipline: "Architecture",
    role: "Architectural Designer",
    year: "2020",
    outcome: "Design proposal with material strategy, construction drawings and renders",
    category: "Architecture",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=560&fit=crop&auto=format",
    tags: ["Affordable Housing", "AutoCAD", "Sustainable Design"],
  },
  {
    id: 22,
    title: "Ozolini Tea Makers Guest House",
    subtitle: "Guest house design for a tea estate — nestled in landscape with vernacular references.",
    industry: "Hospitality / Architecture",
    discipline: "Architecture",
    role: "Architectural Designer",
    year: "2020",
    outcome: "Full architectural design with site integration, plans, sections and 3D renders",
    category: "Architecture",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=560&fit=crop&auto=format",
    tags: ["Hospitality", "Landscape", "SketchUp"],
  },
  {
    id: 23,
    title: "Biodiversity Research Institute",
    subtitle: "Campus design for a research institute focused on Kerala's biodiversity and ecology.",
    industry: "Civic / Research",
    discipline: "Architecture",
    role: "Architectural Designer",
    year: "2021",
    outcome: "Master plan, building design and landscape strategy with environmental response",
    category: "Architecture",
    featured: false,
    featuredSpan: "large",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=560&fit=crop&auto=format",
    tags: ["Campus Design", "Environmental Design", "Lumion"],
  },
  {
    id: 24,
    title: "MAJULI — Flood Resilient Housing",
    subtitle: "Volunteer-built flood-resilient home on Majuli island — design, planning and construction.",
    industry: "Social / Rural Architecture",
    discipline: "Architecture",
    role: "Volunteer Architect — JNVAA",
    year: "2020",
    outcome: "Designed and built 1 of 3 homes in the pilot programme on Majuli island",
    category: "Architecture",
    featured: false,
    featuredSpan: "medium",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=560&fit=crop&auto=format",
    tags: ["Social Architecture", "Flood Resilience", "Built Work"],
  },
];

const TIMELINE = [
  {
    id: 1,
    era: "Architecture",
    company: "NIT Calicut + Amar Architecture & Designs",
    role: "B.Arch Student → Architectural Intern",
    period: "2016 – 2021",
    description: "Five years studying architecture at one of India's premier design institutions, graduating with a 7.52 CGPA. Applied learning hands-on as an architectural intern — handling client briefs, design concepts, 3D modelling, and technical drawings.",
    contributions: [
      "Bachelor of Architecture, NIT Calicut — CGPA 7.52",
      "Internship at Amar Architecture & Designs Pvt. Ltd — proposals, drawings, 3D rendering",
      "Volunteer architect on the MAJULI Flood Resilient Housing Project (JNVAA), 2019–2020",
      "Designed and built 1 of 3 houses in the MAJULI volunteer programme",
    ],
  },
  {
    id: 2,
    era: "Motion Graphics & Learning Design",
    company: "BYJU'S, The Learning App",
    role: "Creative Associate — Animation & Editing",
    period: "June 2021 – March 2023",
    description: "Joined BYJU's straight out of architecture school, diving deep into motion graphics, instructional design, and visual storytelling for one of the world's largest EdTech platforms. Worked across Tynker (K–5) and Aakash BYJU's verticals.",
    contributions: [
      "Pre- and post-production for Tynker K–5: storyboarding, design systems, 2D motion graphics",
      "Created visual content boards, style guides, and animated explainers for Maths, Physics, and Chemistry",
      "Coordinated sound design, quality checks, and cross-team production workflows",
      "Recognised with the Persevere Award 2021",
    ],
  },
  {
    id: 3,
    era: "Digital Learning & LX Design",
    company: "HighRadius",
    role: "Senior Graphic Designer",
    period: "October 2023 – March 2025",
    description: "Spearheaded the transformation of internal corporate training into immersive, results-driven LMS experiences at HighRadius — a global B2B fintech SaaS leader. Owned the full design pipeline from concept to delivery.",
    contributions: [
      "Designed 15+ in-house courses and provided creative oversight for 25+ vendor-produced courses",
      "Developed interactive learning journeys, instructional videos, and motion graphics",
      "Built and maintained LMS experiences on Cluso and Skilljar platforms",
      "Recognised with the Highflyer Award for H1 2024",
    ],
  },
  {
    id: 4,
    era: "UX & Product Marketing Design",
    company: "HighRadius",
    role: "Senior UX Designer",
    period: "March 2025 – Present",
    description: "Promoted to Senior UX Designer within HighRadius's central Marketing Design team. Now leading UI/UX design for product websites, digital campaigns, and marketing assets — bridging design craft with business strategy at scale.",
    contributions: [
      "Designing user-centred interfaces and interaction flows for product marketing websites",
      "Ensuring seamless, engaging digital experiences aligned with HighRadius brand guidelines",
      "Collaborating across marketing, product, and engineering to deliver impactful digital touchpoints",
    ],
  },
];

const PHILOSOPHY = [
  {
    title: "Space shapes behaviour",
    body: "Architecture taught me that design is never neutral. Every layout, hierarchy, and flow either invites or resists the people inside it.",
  },
  {
    title: "Learning is the product",
    body: "Years in EdTech sharpened my belief that great design doesn't just look good — it transfers understanding and changes behaviour.",
  },
  {
    title: "Motion adds meaning",
    body: "Animation is not decoration. Used with intention, it guides attention, signals relationships, and makes complex ideas feel intuitive.",
  },
  {
    title: "Empathy before pixels",
    body: "I conduct user interviews and contextual research before touching a design tool. The best solutions come from listening, not guessing.",
  },
];

const TOOLS = [
  { category: "Design", items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"] },
  { category: "Motion", items: ["After Effects", "Premiere Pro", "Articulate Storyline", "Lumion"] },
  { category: "LMS & LX", items: ["Cluso", "Skilljar", "Articulate 360", "HTML / CSS"] },
  { category: "Architecture", items: ["AutoCAD", "Autodesk Revit", "SketchUp", "Lumion"] },
  { category: "AI", items: ["AI Video Generation", "Generative AI Prompting", "Midjourney", "GitHub Copilot"] },
];

const AWARDS = [
  { title: "Highflyer Award — H1 2024", org: "HighRadius", year: "2024", project: "Digital Learning Design Excellence" },
  { title: "Persevere Award", org: "BYJU'S, The Learning App", year: "2021", project: "Tynker K–5 Motion & Animation" },
  { title: "Google UX Design Professional Certificate", org: "Coursera × Google", year: "2023", project: "7-course programme — Figma, Research, Prototyping" },
  { title: "Google AI Essentials", org: "Coursera × Google", year: "2023", project: "Generative AI, Prompting, Responsible AI" },
  { title: "MAJULI Build — Volunteer Architect", org: "JNVAA Flood Resilient Housing", year: "2020", project: "Designed and built 1 of 3 homes in the pilot programme" },
];

const PROCESS = [
  { label: "Understand", desc: "Define the problem space through stakeholder interviews, context mapping, and constraint analysis." },
  { label: "Research", desc: "Synthesize user behaviours, market signals, and competitive landscape into actionable insight." },
  { label: "Explore", desc: "Generate divergent ideas rapidly through sketching, concepting, and provocative reframes." },
  { label: "Prototype", desc: "Build testable artefacts at the appropriate fidelity — from paper to pixel-perfect." },
  { label: "Validate", desc: "Test with real users, gather signal, and iterate quickly on what the data reveals." },
  { label: "Deliver", desc: "Ship production-quality design with thorough documentation, specs, and handoff support." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function ProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-[#F7F7F5]">
      <div
        className="h-full bg-[#3B6FE8] transition-[width] duration-75"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 64;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F7F7F5]/90 backdrop-blur-2xl border-b border-black/[0.07] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-[1.05rem] font-semibold text-[#121212] tracking-tight hover:opacity-60 transition-opacity"
          >
            Safiyudheen
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["Works", "expertise"], ["About", "about"], ["Connect", "contact"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-sm font-medium text-[#121212]/60 hover:text-[#121212] transition-colors group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#3B6FE8] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/Resume_Safiyudheen.pdf"
              download
              className="flex items-center gap-1.5 text-sm font-medium text-[#121212]/55 hover:text-[#121212] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-[#121212] text-[#F7F7F5] text-sm font-semibold rounded-full hover:bg-[#3B6FE8] transition-colors duration-300"
            >
              {"Let's Talk"}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <button
            className="md:hidden p-1.5 text-[#121212]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[66px] z-40 bg-[#F7F7F5]/96 backdrop-blur-2xl border-b border-black/[0.07] px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {[["Works", "expertise"], ["About", "about"], ["Connect", "contact"]].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left py-3.5 text-lg font-medium text-[#121212] border-b border-black/5 last:border-0"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-[#121212] text-[#F7F7F5] font-semibold rounded-full"
              >
                {"Let's Talk"} <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

// ─── Hero Project Stack ────────────────────────────────────────────────────────

function HeroProjectStack() {
  const featured = PROJECTS.filter((p) => p.featured);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(() => setActive((i) => (i + 1) % featured.length), 3000);
    return () => clearInterval(t);
  }, [isHovered, featured.length]);

  const scrollToWorks = () =>
    document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: 460 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-[#3B6FE8]/12 via-indigo-100/30 to-violet-100/20 blur-3xl pointer-events-none" />

      {/* Card stack — render back to front */}
      {[...featured].reverse().map((project, ri) => {
        const i = featured.length - 1 - ri; // original index
        const offset = i - active;
        const isActive = i === active;

        // Cards behind the active one fan out slightly
        const rotate = isActive ? 0 : offset * 3.5;
        const translateX = isActive ? 0 : offset * 14;
        const translateY = isActive ? 0 : Math.abs(offset) * 6;
        const scale = isActive ? 1 : 1 - Math.abs(offset) * 0.055;
        const opacity = Math.abs(offset) > 3 ? 0 : 1 - Math.abs(offset) * 0.18;
        const zIndex = featured.length - Math.abs(offset);

        return (
          <motion.div
            key={project.id}
            animate={{
              rotate,
              x: translateX,
              y: translateY,
              scale,
              opacity,
              zIndex,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => {
              if (!isActive) {
                setActive(i);
              } else {
                scrollToWorks();
              }
            }}
            className="absolute w-[260px] h-[340px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            style={{ transformOrigin: "bottom center" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/25 to-transparent" />

            {/* Card info */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B6FE8] shrink-0" />
                <span className="text-white text-[0.58rem] font-mono tracking-[0.18em] uppercase leading-none">
                  {project.discipline}
                </span>
              </div>
              <p className="text-white font-display font-semibold text-[1rem] leading-snug">
                {project.title}
              </p>
            </div>

            {/* Active card CTA */}
            {isActive && (
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Rim light */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </motion.div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "bg-[#121212] w-5 h-1.5"
                : "bg-[#121212]/20 w-1.5 h-1.5 hover:bg-[#121212]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-x-hidden bg-[#F7F7F5]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #121212 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-[60%_40%] gap-1 lg:gap-2 items-center">

          {/* ── Left copy — 60% on desktop, centered on mobile ───────────── */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Discipline label */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-7 h-[1.5px] bg-[#3B6FE8]" />
              <span className="text-[0.68rem] font-mono tracking-[0.2em] text-[#3B6FE8] uppercase">
                Architect · UX · Motion & Learning
              </span>
            </div>

            {/* Headline — 3 lines */}
            <h1 className="font-display text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[1.06] font-semibold text-[#121212] tracking-[-0.025em] mb-6">
              Designing{" "}
              <em className="not-italic font-light text-[#3B6FE8]">experiences</em>
              <br />
              across products,
              <br />
              brands &amp; learning.
            </h1>

            {/* Sub-copy */}
            <p className="text-[0.93rem] text-[#121212]/50 max-w-[440px] leading-[1.85] mb-9">
              Architect turned UX Designer. Spatial thinking, motion craft, and learning design — Senior UX Designer at HighRadius, Hyderabad.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <button
                onClick={() => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-[#121212] text-[#F7F7F5] text-sm font-semibold rounded-full hover:bg-[#3B6FE8] transition-colors duration-300"
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/Resume_Safiyudheen.pdf"
                download
                className="flex items-center gap-2.5 px-6 py-3.5 border border-[#121212]/[0.18] text-[#121212] text-sm font-semibold rounded-full hover:border-[#121212]/45 transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>

          {/* ── Right: interactive card stack — 40% ─────────────────────── */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-[440px]">
              <HeroProjectStack />
              <p className="text-center text-[0.62rem] font-mono text-[#121212]/25 tracking-[0.18em] uppercase mt-6">
                Click a card to explore · auto-cycles every 3s
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-8 bg-[#121212] animate-pulse" />
        <span className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-[#121212]">Scroll</span>
      </div>
    </section>
  );
}

// ─── Featured Work ────────────────────────────────────────────────────────────

function FeaturedCard({ project, large, index }: { project: Project; large: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#DEDEDC] ${large ? "lg:col-span-7" : "lg:col-span-5"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: large ? "580px" : "270px" }} className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? "scale-[1.04]" : "scale-100"}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/25 to-transparent transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-75"}`} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[0.68rem] font-medium rounded-full">
              {project.discipline}
            </span>
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white/65 text-[0.68rem] rounded-full">
              {project.industry}
            </span>
          </div>
          <h3 className={`font-display font-semibold text-white leading-tight tracking-[-0.02em] ${large ? "text-[2rem]" : "text-xl"}`}>
            {project.title}
          </h3>
          <p className="text-white/65 text-sm mt-2 mb-4 max-w-sm">{project.subtitle}</p>
          <div className={`flex items-center gap-2 text-white text-sm font-medium transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            View Case Study
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Year */}
        <div className="absolute top-5 right-5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full">
          <span className="text-[0.68rem] font-mono text-white">{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedWork() {
  const featured = PROJECTS.filter((p) => p.featured);
  return (
    null
  );
}

// ─── Expertise / Filter ───────────────────────────────────────────────────────

// Best 6 projects, one per discipline + a second product design pick
const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

function ExpertiseSection() {
  const [active, setActive] = useState<Tab>("Featured Projects");

  const filtered =
    active === "Featured Projects"
      ? FEATURED_PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="expertise" className="bg-white" style={{ overflow: "visible" }}>
      {/* ── Sticky section header ─────────────────────────────────────── */}
      <div className="sm:sticky lg:static sm:top-[64px] sm:z-40 bg-white sm:border-b sm:border-[#121212]/[0.06] sm:shadow-sm lg:border-none lg:shadow-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between gap-6 min-h-[48px]">
            {/* Title — fixed width so chips column stays stable */}
            <div style={{ width: "30%", flexShrink: 0 }}>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-[#121212] tracking-[-0.02em] leading-tight">
                {active === "Motion Design" ? "Motion & Learning" : active}
              </h2>
              <p className="text-[#121212]/40 text-xs mt-0.5">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                {active === "Featured Projects" ? " · all disciplines" : ""}
              </p>
            </div>

            {/* Tab chips — wraps to multiple lines if needed */}
            <div className="flex flex-wrap items-center gap-2 shrink min-w-0">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-3.5 py-1.5 text-[0.78rem] font-medium rounded-full border transition-all duration-200 whitespace-nowrap shrink-0 ${
                    active === tab
                      ? "bg-[#121212] text-[#F7F7F5] border-[#121212]"
                      : "bg-transparent text-[#121212]/55 border-[#121212]/15 hover:border-[#121212]/40 hover:text-[#121212]"
                  }`}
                >
                  {tab === "Motion Design" ? "Motion & Learning" : tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-24">

        {/* Mobile: horizontal scroll strip — Desktop: 3-col grid */}
        <div className="sm:hidden overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory scrollbar-none">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group shrink-0 w-[72vw] max-w-[280px] snap-start overflow-hidden rounded-2xl bg-[#F0F0EE] cursor-pointer"
              >
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/55 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/30 backdrop-blur-md text-white/80 text-[0.6rem] rounded-full">{project.discipline}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-[#121212] text-[0.95rem] leading-snug">{project.title}</h3>
                  <p className="text-[#121212]/45 text-[0.72rem] mt-0.5">{project.industry}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#F7F7F5] text-[#121212]/50 text-[0.62rem] rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Swipe hint — mobile only */}
        <p className="sm:hidden text-[0.62rem] font-mono text-[#121212]/25 tracking-[0.18em] uppercase text-center mt-2 mb-6">
          Swipe to browse
        </p>

        <motion.div layout className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group overflow-hidden rounded-2xl bg-[#F0F0EE] cursor-pointer"
              >
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/55 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[0.68rem] font-mono rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-black/30 backdrop-blur-md text-white/80 text-[0.65rem] rounded-full">
                      {project.discipline}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-semibold text-[#121212] text-[1.05rem] leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[#121212]/45 text-[0.78rem] mt-0.5">
                        {project.industry} · {project.role}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#121212]/10 flex items-center justify-center shrink-0 group-hover:bg-[#3B6FE8] group-hover:border-[#3B6FE8] transition-colors duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#121212]/35 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-sm text-[#121212]/55 mt-3 leading-relaxed">{project.outcome}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-[#F7F7F5] text-[#121212]/55 text-[0.68rem] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <p className="text-[#121212]/35 text-sm font-mono tracking-wide">No featured projects in this category yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(5);

  return (
    <section id="about" ref={ref} className="py-24 bg-[#F7F7F5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="About" />

        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* Intro */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold text-[#121212] tracking-[-0.02em] leading-tight mb-6">
              An architect who learned to design for screens — and never looked back.
            </h2>
            <p className="text-[#121212]/55 leading-[1.8] mb-5">
              I graduated from NIT Calicut with a degree in Architecture, then made a deliberate shift into digital design — first through motion graphics and educational content at BYJU'S, then into learning experience design, and now into UX and product marketing at HighRadius.
            </p>
            <p className="text-[#121212]/55 leading-[1.8]">
              Every phase of that journey sharpened a different skill: spatial reasoning, visual storytelling, instructional clarity, and interaction design. I bring all of it to every brief I take on.
            </p>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-xl font-semibold text-[#121212] mb-8">Career Journey</h3>
            <div className="relative">
              <div className="absolute left-[15px] top-3 bottom-3 w-[1px] bg-[#121212]/10" />
              {TIMELINE.map((item) => (
                <div key={item.id} className="relative pl-10 mb-0">
                  <div
                    className={`absolute left-[11px] top-5 w-[9px] h-[9px] rounded-full border-[2px] border-[#F7F7F5] transition-colors duration-300 ${
                      open === item.id ? "bg-[#3B6FE8] shadow-[0_0_0_3px_rgba(59,111,232,0.2)]" : "bg-[#121212]/25"
                    }`}
                  />
                  <button
                    className="w-full text-left py-4 border-b border-[#121212]/[0.06]"
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-display font-semibold text-[#121212]">{item.era}</span>
                          <span className="text-[0.7rem] font-mono text-[#121212]/35 tracking-wide">{item.period}</span>
                        </div>
                        <span className="text-sm text-[#121212]/45">{item.company} · {item.role}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#121212]/35 transition-transform duration-300 shrink-0 mt-1 ${open === item.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {open === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="py-4 pb-6">
                          <p className="text-sm text-[#121212]/55 leading-relaxed mb-4">{item.description}</p>
                          <ul className="space-y-2">
                            {item.contributions.map((c) => (
                              <li key={c} className="flex items-start gap-2.5 text-sm text-[#121212]/55">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3B6FE8] mt-[6px] shrink-0" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-24">
          <SectionLabel text="Design Philosophy" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHILOSOPHY.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 bg-white rounded-2xl border border-[#121212]/[0.06] hover:border-[#3B6FE8]/25 transition-colors duration-300"
              >
                <div className="w-7 h-7 rounded-full bg-[#3B6FE8]/10 flex items-center justify-center mb-5">
                  <div className="w-2 h-2 rounded-full bg-[#3B6FE8]" />
                </div>
                <h4 className="font-display font-semibold text-[#121212] mb-2.5 leading-snug">{p.title}</h4>
                <p className="text-sm text-[#121212]/50 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-24">
          <SectionLabel text="Technology Stack" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {TOOLS.map((group) => (
              <div key={group.category}>
                <h4 className="text-[0.65rem] font-mono tracking-[0.22em] text-[#121212]/35 uppercase mb-4">{group.category}</h4>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-2.5 bg-white border border-[#121212]/[0.07] rounded-xl text-sm text-[#121212]/60 hover:text-[#3B6FE8] hover:border-[#3B6FE8]/25 transition-colors duration-200 cursor-default"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <SectionLabel text="Recognition" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AWARDS.map((award) => (
              <div
                key={award.title}
                className="p-6 bg-white rounded-2xl border border-[#121212]/[0.06] hover:border-[#3B6FE8]/25 transition-colors duration-300"
              >
                <div className="text-[0.7rem] font-mono text-[#3B6FE8] tracking-wide mb-3">{award.year}</div>
                <h4 className="font-display font-semibold text-[#121212] mb-1 leading-snug">{award.title}</h4>
                <p className="text-sm text-[#121212]/45">{award.org}</p>
                <p className="text-[0.72rem] text-[#121212]/30 mt-4 font-mono">Project: {award.project}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-[#121212] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1.5px] bg-[#3B6FE8]" />
          <span className="text-[0.7rem] font-mono tracking-[0.22em] text-[#3B6FE8] uppercase">Process</span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-white tracking-[-0.02em] mb-16">
          How I think through problems.
        </h2>

        {/* Step tabs */}
        <div className="flex gap-0 border-b border-white/10 overflow-x-auto pb-0 mb-12">
          {PROCESS.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-250 -mb-[2px] ${
                active === i
                  ? "border-[#3B6FE8] text-white"
                  : "border-transparent text-white/35 hover:text-white/65"
              }`}
            >
              <span className="font-mono text-[0.65rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {step.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="max-w-2xl"
          >
            <div className="font-display text-[3rem] font-semibold text-white mb-5 tracking-[-0.02em]">
              {PROCESS[active].label}
            </div>
            <p className="text-white/45 text-lg leading-[1.8]">{PROCESS[active].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-14">
          {PROCESS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[3px] rounded-full transition-all duration-400 ${i === active ? "bg-[#3B6FE8] w-8" : "bg-white/15 w-3 hover:bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F7F5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <SectionLabel text="Connect" />
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold text-[#121212] tracking-[-0.02em] leading-tight mb-6">
              {"Let's create something "}
              <em className="not-italic font-light text-[#3B6FE8]">meaningful</em>
              {" together."}
            </h2>
            <p className="text-[#121212]/55 leading-[1.8] mb-10">
              Whether you're building a new product, rethinking a brand, or designing a better learning experience — I would love to hear about the challenge you're working on.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:safiyudheen@gmail.com"
                className="group inline-flex items-center gap-3 text-[#121212]/60 hover:text-[#3B6FE8] transition-colors"
              >
                <div className="w-9 h-9 rounded-full border border-[#121212]/12 flex items-center justify-center group-hover:border-[#3B6FE8] group-hover:bg-[#3B6FE8]/8 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">safiyudheen@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-[#121212]/60 hover:text-[#3B6FE8] transition-colors"
              >
                <div className="w-9 h-9 rounded-full border border-[#121212]/12 flex items-center justify-center group-hover:border-[#3B6FE8] group-hover:bg-[#3B6FE8]/8 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">linkedin.com/in/safiyudheen</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[360px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-[#121212]/[0.06]"
              >
                <div className="w-16 h-16 rounded-full bg-[#3B6FE8]/10 flex items-center justify-center mb-6">
                  <Send className="w-6 h-6 text-[#3B6FE8]" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#121212] mb-3">Message sent.</h3>
                <p className="text-[#121212]/50 max-w-xs leading-relaxed">
                  {"I'll get back to you within 48 hours. Looking forward to the conversation."}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl border border-[#121212]/[0.06] space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[0.65rem] font-mono tracking-[0.22em] text-[#121212]/35 uppercase mb-2">
                        {field.label}
                      </label>
                      <input
                        required
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#121212]/[0.08] rounded-xl text-[#121212] text-sm placeholder:text-[#121212]/25 focus:outline-none focus:border-[#3B6FE8] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[0.65rem] font-mono tracking-[0.22em] text-[#121212]/35 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#121212]/[0.08] rounded-xl text-[#121212] text-sm placeholder:text-[#121212]/25 focus:outline-none focus:border-[#3B6FE8] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2.5 py-4 bg-[#121212] text-[#F7F7F5] font-semibold rounded-xl hover:bg-[#3B6FE8] transition-colors duration-300"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-[#121212]/8" />
                  <span className="text-xs text-[#121212]/25 font-mono">or</span>
                  <div className="flex-1 h-[1px] bg-[#121212]/8" />
                </div>
                <a
                  href="/Resume_Safiyudheen.pdf"
                  download
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-[#121212]/15 text-[#121212] font-semibold rounded-xl hover:border-[#121212]/35 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 bg-[#121212]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-white/30 text-sm">© 2025 Safiyudheen. All rights reserved.</span>
        <div className="flex gap-6">
          {["Works", "About", "Connect"].map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="text-white/25 hover:text-white/60 text-sm transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Action Button ───────────────────────────────────────────────────

function FAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="flex flex-col items-end gap-2.5"
          >
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
              className="flex items-center gap-2.5 px-5 py-3 bg-[#121212] text-white text-sm font-semibold rounded-full shadow-xl hover:bg-[#3B6FE8] transition-colors whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" /> Send Message
            </button>
            <a
              href="/Resume_Safiyudheen.pdf"
              download
              className="flex items-center gap-2.5 px-5 py-3 bg-white text-[#121212] text-sm font-semibold rounded-full shadow-xl hover:bg-[#F7F7F5] transition-colors whitespace-nowrap border border-[#121212]/10"
            >
              <Download className="w-3.5 h-3.5" /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${
          open ? "bg-[#3B6FE8]" : "bg-[#121212]"
        }`}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          {open ? <X className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
        </motion.div>
      </motion.button>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-[1.5px] bg-[#3B6FE8]" />
      <span className="text-[0.7rem] font-mono tracking-[0.22em] text-[#3B6FE8] uppercase">{text}</span>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50%       { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
          75%       { border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%; }
        }
        .hero-blob { animation: morph 14s ease-in-out infinite; }
        body { font-family: 'Manrope', system-ui, sans-serif; }
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        ::selection { background: #3B6FE8; color: #fff; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="bg-[#F7F7F5] text-[#121212]">
        <ProgressBar />
        <Nav />
        <Hero />
        <FeaturedWork />
        <ExpertiseSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
        <FAB />
      </div>
    </>
  );
}
