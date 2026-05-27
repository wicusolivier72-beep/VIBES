import { useState, useEffect } from 'react'

const navigationItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const skillsData = [
  {
    category: 'Frontend Development',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'HTML5/CSS3'],
  },
  {
    category: 'Backend & Databases',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Tools & Workflows',
    skills: ['Git & GitHub', 'Figma', 'Docker', 'Vercel', 'Postman', 'Agile/Scrum'],
  },
]

const projectsData = [
  {
    title: 'StudyBuddy',
    description: 'A collaborative real-time study dashboard for students to share tasks, set study timers, and join virtual study rooms.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'AuraCast',
    description: 'A minimalist weather dashboard featuring interactive weather maps, weather forecasts, and custom aesthetic visual themes.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'OpenWeather API'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'DevFlow',
    description: 'A developer community forum for sharing code snippets, asking technical questions, and voting on developer solutions.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Express'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'TaskStream',
    description: 'A beautiful Kanban-style task management application with drag-and-drop mechanics and sub-task progress tracking.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Drag/Drop'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Intersection Observer for active navigation state
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies the middle of the viewport
      threshold: 0,
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)
    
    navigationItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Handle smooth scroll clicks
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000) // Reset success message after 5 seconds
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-600/30 selection:text-purple-200 antialiased overflow-x-hidden">
      {/* Ambient background decoration */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none z-0" />

      {/* Sticky Header Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
              <span className="font-bold text-sm text-white">WO</span>
            </div>
            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-zinc-300 transition-all">
              Wicus.dev
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-2 ${
                  activeSection === item.id ? 'text-purple-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-900 bg-zinc-950 px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-base font-medium py-2 transition-colors ${
                  activeSection === item.id ? 'text-purple-400' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-800 transition-all"
            >
              Hire Me
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 z-10">
        <div className="max-w-4xl text-center space-y-8 py-20">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 shadow-inner backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span>Open for new learning and building opportunities</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <p className="text-purple-400 text-sm sm:text-base font-semibold tracking-wider uppercase font-mono">
              Hi, my name is Wicus
            </p>
            <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-none text-white">
              Building Web Products
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                With Elegant Code.
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-xl leading-relaxed pt-2">
              I am a passionate student and builder focused on engineering high-performance frontends, modular backends, and beautiful user experiences.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-medium text-white text-sm transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get In Touch
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm transition-all duration-300 cursor-pointer"
            >
              View My Work
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-12 animate-bounce hidden sm:block">
            <button 
              onClick={() => scrollToSection('about')}
              className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Scroll to About Section"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 border-t border-zinc-900 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading & Paragraphs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-purple-400 tracking-wider font-semibold">
                  01. My Journey
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  About Me
                </h2>
              </div>
              <div className="text-zinc-400 space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  I'm a developer who enjoys creating functional, modular web systems that run fast and look fantastic. Currently balancing academics and active development, I love researching state-of-the-art frameworks and writing clean systems.
                </p>
                <p>
                  Outside of writing code, I read about tech architectures, experiment with visual styling layouts, and explore the outdoors. My goal is to work on collaborative projects where design and complex engine logic merge seamlessly.
                </p>
              </div>
            </div>

            {/* Right Column: Skills Display */}
            <div className="lg:col-span-7 space-y-8 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                Technical Toolbelt
              </h3>
              
              <div className="space-y-6">
                {skillsData.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-xs uppercase font-mono text-zinc-500 font-bold tracking-wider">
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 hover:border-purple-500 hover:text-purple-300 hover:scale-102 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-zinc-900 relative z-10">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-mono text-purple-400 tracking-wider font-semibold">
              02. My Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Featured Projects
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto text-sm sm:text-base">
              A curated list of web applications and tools I've built from the ground up.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {projectsData.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900 hover:border-purple-500/50 hover:bg-zinc-900/50 transition-all duration-300 overflow-hidden shadow-sm"
              >
                {/* Glowing border outline effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4">
                  {/* Top Bar with folder & external links */}
                  <div className="flex items-center justify-between text-zinc-400">
                    <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-purple-400 transition-colors p-1"
                        title="View GitHub Repository"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-purple-400 transition-colors p-1"
                        title="View Live Demo"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-1.5 pt-6">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-zinc-900 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Get in Touch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-purple-400 tracking-wider font-semibold">
                  03. Connect
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Get In Touch
                </h2>
              </div>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                Whether you want to build a product together, ask an academic question, or just say hello, I'd love to connect. Shoot me a message, or find me on my social accounts below!
              </p>

              {/* Social List */}
              <div className="space-y-4 pt-4">
                <a
                  href="mailto:contact@wicus.dev"
                  className="flex items-center gap-3 text-zinc-400 hover:text-purple-400 transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-950/20 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">contact@wicus.dev</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-purple-400 transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-950/20 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-purple-400 transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-950/20 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
              {isSubmitted ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 py-8 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-zinc-400 max-w-sm">
                      Thank you for reaching out. I have received your submission and will get back to you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                    Send a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase font-mono text-zinc-500 font-bold tracking-wider">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase font-mono text-zinc-500 font-bold tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase font-mono text-zinc-500 font-bold tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi, Wicus! I'd love to connect..."
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all duration-300 shadow-md shadow-purple-600/10 hover:shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 text-center text-xs text-zinc-500 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Wicus.dev. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
