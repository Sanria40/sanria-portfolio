import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mail, Linkedin, Github, Instagram, MapPin, Download, ArrowRight, ArrowUp,
  Code2, Palette, Users, Lightbulb, Layers, GraduationCap, Sparkles,
  Megaphone, PartyPopper, HeartHandshake, Globe, Music, Plane, BookOpen,
  Network, Mic, Calendar, Sun, Moon, ExternalLink, Database, Briefcase,
  PenTool, MonitorSmartphone, Wrench, Send, CheckCircle2,
} from "lucide-react";
import profileAsset from "@/assets/profile.jpg.asset.json";
const profileImg = profileAsset.url;
import projectImg from "@/assets/project-scm.jpg";
import resumeAsset from "@/assets/resume.docx.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanria Sara Jaison — CS Engineer & Creative Designer" },
      { name: "description", content: "Portfolio of Sanria Sara Jaison — B.Tech CSE student, creative designer, and future tech professional from Kerala, India." },
      { property: "og:title", content: "Sanria Sara Jaison — Portfolio" },
      { property: "og:description", content: "Computer Science Engineer | Creative Designer | Future Tech Professional" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Computer Science Student",
  "Web Developer",
  "Creative Designer",
  "Social Media Manager",
  "Future Tech Leader",
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 50 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) { setTimeout(() => setDel(true), 1400); return; }
      if (del && text === "") { setDel(false); setI(i + 1); return; }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("animate-fade-up");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Portfolio() {
  const { dark, toggle } = useTheme();
  useReveal();
  const typed = useTyping(ROLES);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      let current = "home";
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 shadow-soft">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-primary-foreground">S</span>
            <span className="hidden sm:inline">Sanria</span>
          </button>
          <div className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-lg glass hover:text-primary">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden grid h-9 w-9 place-items-center rounded-lg glass">
              <Layers size={16} />
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl glass p-3 shadow-soft md:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative px-4 pt-24 pb-12 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-soft">
            {/* Animated conic border */}
            <div className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-60"
                 style={{ background: "conic-gradient(from 0deg, transparent 0deg, oklch(0.78 0.19 135) 90deg, transparent 180deg, oklch(0.88 0.18 130) 270deg, transparent 360deg)", animation: "spin 12s linear infinite", padding: 1, WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
            {/* Green radial wash */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-bg)" }} />
            {/* Grid pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                 style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <FloatingParticles />

            <div className="relative px-6 pt-8 pb-2 sm:px-12 sm:pt-12">
              {/* Top badge row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                  </span>
                  Available for opportunities
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur">
                  <MapPin size={12} /> Kerala, India
                </span>
              </div>

              {/* Headline */}
              <div className="mt-10 text-center">
                <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[5.5rem]">
                  Hi, I'm Sanria
                </h1>
                <p className="mt-1 font-serif text-5xl italic leading-[1] text-foreground sm:text-7xl lg:text-[5.5rem]">
                  Future Tech <span className="relative inline-block">
                    Professional
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 8 Q 80 -2, 150 6 T 298 4" stroke="oklch(0.55 0.2 135)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
              </div>

              {/* Portrait + side widgets */}
              <div className="relative mt-10 grid items-end gap-6 sm:mt-14 sm:grid-cols-3">
                {/* Left widget */}
                <div className="order-2 space-y-3 sm:order-1 sm:pb-10">
                  <div className="rounded-2xl border border-border bg-background/80 p-4 shadow-soft backdrop-blur">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[Megaphone, PartyPopper, HeartHandshake].map((Icon, i) => (
                          <span key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-foreground text-background">
                            <Icon size={12} />
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">3 Roles</span>
                    </div>
                    <p className="mt-3 text-xs leading-snug text-muted-foreground">
                      Leading <strong className="text-foreground">media, design & social impact</strong> teams across campus.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-border bg-background/80 p-3 backdrop-blur">
                      <p className="font-display text-xl font-bold text-foreground">2028</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">B.Tech CSE</p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/80 p-3 backdrop-blur">
                      <p className="font-display text-xl font-bold text-foreground">10+</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Projects</p>
                    </div>
                  </div>
                </div>

                {/* Portrait */}
                <div className="order-1 relative mx-auto sm:order-2">
                  <div className="absolute inset-x-4 bottom-0 top-10 rounded-t-full bg-gradient-to-b from-secondary/40 to-transparent blur-2xl" />
                  <img
                    src={profileImg}
                    alt="Sanria Sara Jaison portrait"
                    width={420}
                    height={520}
                    className="relative z-10 h-[280px] w-auto object-cover object-top sm:h-[420px] lg:h-[480px]"
                  />
                  {/* Floating chip */}
                  <div className="absolute right-0 top-6 z-20 hidden rounded-full border border-foreground/10 bg-background/90 px-3 py-1.5 text-[10px] font-semibold shadow-soft backdrop-blur sm:flex sm:items-center sm:gap-1.5">
                    <Sparkles size={10} className="text-secondary" /> Designer
                  </div>
                  <div className="absolute -left-2 bottom-16 z-20 hidden rounded-full border border-foreground/10 bg-background/90 px-3 py-1.5 text-[10px] font-semibold shadow-soft backdrop-blur sm:flex sm:items-center sm:gap-1.5">
                    <Code2 size={10} className="text-secondary" /> Engineer
                  </div>
                </div>

                {/* Right widget */}
                <div className="order-3 space-y-3 sm:pb-10 sm:text-right">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:ml-auto sm:max-w-[16rem]">
                    Blending <span className="font-serif italic text-foreground">code, design & leadership</span> to build experiences that feel intentional.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button
                      onClick={() => scrollTo("contact")}
                      className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:gap-3"
                    >
                      Get in Touch
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-background text-foreground transition group-hover:rotate-45">
                        <ArrowRight size={12} />
                      </span>
                    </button>
                  </div>
                  <div className="flex gap-2 sm:justify-end">
                    {[
                      { i: Github, h: "https://github.com/Sanria40" },
                      { i: Linkedin, h: "https://www.linkedin.com/in/sanria-sara-jaison-24193a276" },
                      { i: Instagram, h: "https://www.instagram.com/sanriiaaaa" },
                    ].map(({ i: Icon, h }, idx) => (
                      <a key={idx} href={h} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:bg-foreground hover:text-background">
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Marquee tech strip */}
              <div className="relative mt-10 overflow-hidden border-t border-border pt-5">
                <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
                  {[...Array(2)].map((_, loop) => (
                    <div key={loop} className="flex shrink-0 items-center gap-10 text-sm font-medium text-muted-foreground">
                      {["Python", "Java", "C", "HTML", "CSS", "SQL", "Canva", "UI / UX", "Leadership", "Event Design"].map((t) => (
                        <span key={t} className="inline-flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-secondary" /> {t}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
              </div>
            </div>
          </div>

          {/* Sub-row under hero */}
          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-serif italic text-foreground">Currently:</span> {typed}<span className="cursor-blink" />
            </p>
            <div className="hidden h-px bg-border sm:block" />
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <button onClick={() => scrollTo("projects")} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:border-foreground">
                View Portfolio <ArrowRight size={14} />
              </button>
              <a href={resumeAsset.url} download="Sanria_Sara_Jaison_Resume.docx" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:border-foreground">
                <Download size={14} /> Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" eyebrow="About Me" title="Crafting impact through code & creativity">
        <div className="grid gap-8 lg:grid-cols-5">
          <div data-reveal className="opacity-0 lg:col-span-3 space-y-4 text-muted-foreground">
            <p>
              I'm a B.Tech Computer Science and Engineering student at <strong className="text-foreground">LBS Institute of Technology for Women, Thiruvananthapuram</strong>, graduating in 2028. I love bridging the worlds of engineering and design — building things that work beautifully and feel intentional.
            </p>
            <p>
              Beyond academics, I've led media for my college association, headed decoration for a major tech fest, and serve as a Unit Coordinator in NSS. These experiences shaped my passion for leadership, social impact, and continuous learning.
            </p>
            <p>
              I'm endlessly curious — exploring new cultures, researching emerging tech, meeting new people, and creating meaningful experiences through both technical and creative projects.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3">
              {[
                { i: Lightbulb, t: "Quick Learner" },
                { i: Palette, t: "Creative Thinker" },
                { i: Users, t: "Team Leader" },
                { i: Code2, t: "Problem Solver" },
                { i: Layers, t: "Multitasker" },
                { i: BookOpen, t: "Continuous Learner" },
              ].map(({ i: Icon, t }) => (
                <div key={t} className="flex items-center gap-2 rounded-xl glass px-3 py-2.5 text-sm font-medium hover-lift">
                  <Icon size={16} className="text-primary" /> {t}
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="opacity-0 lg:col-span-2">
            <div className="rounded-2xl glass p-6 shadow-soft">
              <h3 className="mb-4 font-display text-lg font-bold">Personal Interests</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { i: Plane, t: "Traveling" },
                  { i: Music, t: "Music" },
                  { i: PenTool, t: "Designing" },
                  { i: BookOpen, t: "Research" },
                  { i: Code2, t: "New Tech" },
                  { i: Globe, t: "Cultures" },
                  { i: Network, t: "Networking" },
                  { i: Users, t: "Leadership" },
                ].map(({ i: Icon, t }) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
                    <Icon size={12} className="text-primary" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" eyebrow="Education" title="Academic journey">
        <div className="relative mx-auto max-w-3xl">
          <div data-reveal className="opacity-0 relative rounded-2xl glass p-6 shadow-soft hover-lift sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground shadow-glow">
                <GraduationCap size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">2024 — 2028</p>
                <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">B.Tech, Computer Science & Engineering</h3>
                <p className="mt-1 text-sm text-muted-foreground">LBS Institute of Technology for Women · Thiruvananthapuram, Kerala</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Mini title="Relevant Coursework" items={["Data Structures", "DBMS", "Web Development", "OOP"]} />
                  <Mini title="Technical Interests" items={["Full-Stack", "UI/UX", "Databases", "Emerging Tech"]} />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong className="text-foreground">Goal:</strong> Become a versatile tech professional combining engineering depth with design thinking and leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="Experience & Leadership" title="Leading, designing, building">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-2 bottom-2 w-px gradient-bg sm:left-1/2" />
          {[
            { icon: Megaphone, role: "Media Lead", org: "Samyukta", years: "2025 – 2026", points: ["Social media management", "Event promotions & branding", "Content creation & campaigns"] },
            { icon: PartyPopper, role: "Decoration Lead", org: "Prayag Tech Fest", years: "2026", points: ["Event decoration planning", "Team coordination", "Creative execution & design"] },
            { icon: HeartHandshake, role: "Unit Coordinator", org: "NRPF NSS", years: "2026 – Present", points: ["Volunteer coordination", "Community engagement", "Event organization & leadership"] },
          ].map((e, idx) => (
            <div key={e.role} data-reveal className={`opacity-0 relative mb-8 grid gap-4 sm:grid-cols-2 sm:gap-8 ${idx % 2 ? "" : ""}`}>
              <div className={`${idx % 2 ? "sm:order-2" : ""}`}>
                <div className="relative rounded-2xl glass p-6 shadow-soft hover-lift">
                  <div className="absolute -left-1 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full gradient-bg ring-4 ring-background sm:block"
                       style={idx % 2 ? { left: "auto", right: "-0.25rem", transform: "translateX(50%)" } : undefined} />
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-primary-foreground">
                      <e.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">{e.role}</h3>
                      <p className="text-sm text-muted-foreground">{e.org} · {e.years}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" /> {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden sm:block" />
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="Skills" title="Tech, design, and beyond">
        <div className="grid gap-6 lg:grid-cols-3">
          <SkillGroup title="Technical" icon={Code2} skills={[
            { n: "Python", v: 80 }, { n: "Java", v: 70 }, { n: "C", v: 75 },
            { n: "HTML", v: 90 }, { n: "CSS", v: 85 }, { n: "SQL", v: 78 },
          ]} />
          <SkillGroup title="Design" icon={Palette} skills={[
            { n: "Canva", v: 92 }, { n: "Video Editing", v: 80 },
            { n: "Poster Design", v: 88 }, { n: "Content Creation", v: 86 },
          ]} />
          <div data-reveal className="opacity-0 rounded-2xl glass p-6 shadow-soft">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <Users size={18} className="text-primary" /> Professional
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Leadership", "Communication", "Team Management", "Public Speaking", "Event Planning", "Social Media", "Crowd Management", "Multitasking", "Adaptability", "Collaboration"].map((s) => (
                <span key={s} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" eyebrow="Services" title="What I can do for you">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { i: MonitorSmartphone, t: "Web Development", d: "Responsive, modern websites built with attention to detail." },
            { i: Megaphone, t: "Social Media Management", d: "Strategy, content & engagement that grows communities." },
            { i: PenTool, t: "Content Creation", d: "Compelling visuals and copy that tell your story." },
            { i: Palette, t: "UI/UX Design", d: "User-first interfaces that are clean and delightful." },
            { i: Sparkles, t: "Graphic Designing", d: "Posters, branding & creative assets that pop." },
            { i: Calendar, t: "Event Management", d: "End-to-end planning, coordination & execution." },
            { i: Wrench, t: "Technical Support", d: "Reliable troubleshooting and tech assistance." },
            { i: Briefcase, t: "Brand Strategy", d: "Helping ideas find their voice and visual identity." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} data-reveal className="opacity-0 group rounded-2xl glass p-6 shadow-soft hover-lift">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-bg text-primary-foreground shadow-glow transition group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="Projects" title="Featured work">
        <div data-reveal className="opacity-0 overflow-hidden rounded-3xl glass shadow-soft hover-lift">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-video lg:aspect-auto">
              <img src={projectImg} alt="Supply Chain Management System" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
                <Database size={12} className="text-primary" /> DBMS Project
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold">Supply Chain Management System</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                A database-driven system designed to manage suppliers, inventory, orders, and logistics data efficiently — built around clean data modeling and optimized retrieval.
              </p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Tech Stack</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["SQL", "DBMS", "Data Modeling"].map((t) => (
                    <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Key Features</p>
                <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                  {["Inventory tracking", "Supplier management", "Order management", "Optimized retrieval"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://github.com/Sanria40" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl gradient-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90">
                  <Github size={16} /> GitHub
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:text-primary">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Achievements & Activities</p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Leadership highlights</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { i: Megaphone, t: "Media Lead", s: "Samyukta" },
              { i: PartyPopper, t: "Decoration Lead", s: "Prayag Tech Fest" },
              { i: HeartHandshake, t: "Unit Coordinator", s: "NRPF NSS" },
            ].map(({ i: Icon, t, s }) => (
              <div key={t} data-reveal className="opacity-0 rounded-2xl glass p-5 text-center shadow-soft hover-lift">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl gradient-bg text-primary-foreground"><Icon size={20} /></div>
                <h4 className="mt-3 font-display text-lg font-bold">{t}</h4>
                <p className="text-sm text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Leadership", "Creativity", "Teamwork", "Event Management", "Social Impact"].map((b) => (
              <span key={b} className="rounded-full gradient-bg px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">{b}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact" title="Let's build something together">
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-reveal className="opacity-0 rounded-2xl glass p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">I usually respond within 24 hours. Open to internships, collaborations, and creative briefs.</p>
            <div className="mt-6 space-y-3">
              <ContactRow icon={Mail} label="Email" value="sanriasarajaisonkollamkudiyil@gmail.com" href="mailto:sanriasarajaisonkollamkudiyil@gmail.com" />
              <ContactRow icon={Linkedin} label="LinkedIn" value="sanria-sara-jaison" href="https://www.linkedin.com/in/sanria-sara-jaison-24193a276" />
              <ContactRow icon={Github} label="GitHub" value="@Sanria40" href="https://github.com/Sanria40" />
              <ContactRow icon={Instagram} label="Instagram" value="@sanriiaaaa" href="https://www.instagram.com/sanriiaaaa" />
              <ContactRow icon={MapPin} label="Location" value="Kerala, India" />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <iframe
                title="Kerala, India map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.85%2C8.18%2C77.41%2C12.79&layer=mapnik&marker=10.8505%2C76.2711"
                className="h-48 w-full"
                loading="lazy"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative mt-16 px-4 pb-10">
        <div className="mx-auto max-w-6xl rounded-3xl glass p-8 shadow-soft">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-end">
            <div>
              <p className="font-display text-2xl font-bold gradient-text">Sanria Sara Jaison</p>
              <p className="mt-1 text-sm text-muted-foreground">Engineering tomorrow with creativity, code, and heart.</p>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              {[
                { i: Mail, h: "mailto:sanriasarajaisonkollamkudiyil@gmail.com" },
                { i: Linkedin, h: "https://www.linkedin.com/in/sanria-sara-jaison-24193a276" },
                { i: Github, h: "https://github.com/Sanria40" },
                { i: Instagram, h: "https://www.instagram.com/sanriiaaaa" },
              ].map(({ i: Icon, h }, idx) => (
                <a key={idx} href={h} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl glass hover:text-primary hover-lift">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Sanria Sara Jaison. All rights reserved.</p>
            <p>Designed & built with care in Kerala, India.</p>
          </div>
        </div>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full gradient-bg text-primary-foreground shadow-glow hover:scale-110 transition">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="opacity-0 mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">/ {eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="font-serif italic font-normal">{title}</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Mini({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{title}</p>
      <ul className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
        {items.map((i) => <li key={i}>· {i}</li>)}
      </ul>
    </div>
  );
}

function SkillGroup({ title, icon: Icon, skills }: { title: string; icon: typeof Code2; skills: { n: string; v: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal className="opacity-0 rounded-2xl glass p-6 shadow-soft">
      <h3 className="flex items-center gap-2 font-display text-lg font-bold">
        <Icon size={18} className="text-primary" /> {title}
      </h3>
      <div className="mt-4 space-y-3">
        {skills.map((s) => (
          <div key={s.n}>
            <div className="mb-1 flex justify-between text-xs font-medium">
              <span>{s.n}</span><span className="text-muted-foreground">{s.v}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full gradient-bg transition-all duration-1000 ease-out" style={{ width: visible ? `${s.v}%` : "0%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href?: string }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3 transition hover:border-primary hover:text-primary">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg gradient-bg text-primary-foreground"><Icon size={16} /></div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </Tag>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");
    try {
      const formData = new FormData(form);
      formData.append("access_key", "04b1f7a5-d427-461d-8002-73bbac93518e");
      formData.append("subject", "New portfolio contact form submission");
      formData.append("from_name", "Sanria Portfolio");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <form
      data-reveal
      className="opacity-0 rounded-2xl glass p-6 shadow-soft sm:p-8"
      onSubmit={onSubmit}
    >
      <h3 className="font-display text-xl font-bold">Send a message</h3>
      <p className="mt-2 text-sm text-muted-foreground">I'll get back to you as soon as I can.</p>
      <div className="mt-6 grid gap-4">
        {/* Honeypot field for spam protection */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <Input name="name" label="Name" placeholder="Your name" />
        <Input name="email" type="email" label="Email" placeholder="you@example.com" />
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
          <textarea required name="message" rows={4} placeholder="Tell me about your project or idea..."
            className="w-full resize-none rounded-xl border border-border bg-card/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 disabled:opacity-60"
        >
          {status === "sent" ? (
            <><CheckCircle2 size={16} /> Sent — thank you!</>
          ) : status === "sending" ? (
            <>Sending...</>
          ) : (
            <><Send size={16} /> Send Message</>
          )}
        </button>
        {status === "error" && (
          <p className="text-sm text-destructive">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}

function Input({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input required name={name} type={type} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-card/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = 4 + (i % 5) * 3;
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 8) * 0.6;
        const duration = 6 + (i % 5) * 2;
        return (
          <span
            key={i}
            className="absolute rounded-full gradient-bg opacity-30 blur-sm animate-float"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              animationDelay: `${delay}s`, animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
