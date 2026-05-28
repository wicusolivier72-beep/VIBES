import { useState, useEffect } from 'react'

// Interfaces
interface CourseworkCategory {
  category: string
  items: string[]
}

interface TimelineEvent {
  title: string
  subtitle: string
  period: string
  category: 'experience' | 'education'
  bullets: string[]
}

interface Reference {
  name: string
  role: string
  company: string
  email: string
}

// Navigation Items (RMR removed)
const navigationItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'timeline', label: 'Experience & Education' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'references', label: 'References' },
]

// Professional Timeline Data (Lab tech bullets corrected)
const timelineData: TimelineEvent[] = [
  {
    title: 'Student IT Lab Technician',
    subtitle: 'Mining Industry Study Centre, University of Pretoria',
    period: 'February 2026 - Present',
    category: 'experience',
    bullets: [
      'Provide front-line technical support for undergraduate students.',
      'Diagnose and troubleshoot computer laboratory hardware, including PCs, printers, and screens.',
      'Configure software applications, handle domain login assistance, and resolve local network connectivity issues.'
    ]
  },
  {
    title: 'BSc in Engineering and Environmental Geology (Ongoing)',
    subtitle: 'University of Pretoria',
    period: '2024 - Present (Expected Graduation: 2027)',
    category: 'education',
    bullets: [
      'Currently in 3rd year, developing a deep understanding of geological processes and engineering applications.',
      'Relevant Coursework: Introductory Geology & Sedimentology, 1st & 2nd Year Chemistry, Introductory Soil Science, and Biometry.',
      'Applying geological mapping techniques, soil classification models, and stereonet discontinuity analysis.'
    ]
  },
  {
    title: 'National Senior Certificate (Matric)',
    subtitle: 'High School Graduation',
    period: 'Class of 2023',
    category: 'education',
    bullets: [
      'Graduated with strong results in logical and spatial sciences.',
      'Core Subjects: Mathematics, Physical Sciences, Geography, and Accounting.'
    ]
  }
]

// Skills and Coursework Data (Workflow removed)
const skillsCategories: CourseworkCategory[] = [
  {
    category: 'Geospatial & Technical Software',
    items: [
      'QGIS (Vector mapping, spatial analysis, overlay zoning, raster calculations)',
      'Google Earth Engine (GEE) (Scripting satellite datasets, temporal band comparisons, spectral analysis)',
      'Geotechnical Logging Utilities (Parsing borehole depths, plotting stratigraphic columns)'
    ]
  },
  {
    category: 'Productivity Suite',
    items: [
      'Microsoft Word: Formatting dense technical engineering geology reports, abstracts, and logs.',
      'Microsoft Excel: Building formulas, plotting lab test metrics (e.g. soil plasticity index charts).',
      'Microsoft PowerPoint: Structuring professional slides for scientific geology findings.'
    ]
  },
  {
    category: 'Core Competencies',
    items: [
      'Analytical Problem-Solving (Connecting soil mechanics with engineering structure safety parameters)',
      'Customer-Facing Support (Direct troubleshooting and clear communication in IT laboratory environments)',
      'Hardware Diagnostics (Resolving workstation failures, memory errors, and hardware connectivity issues)',
      'Time Management (Successfully balancing a rigorous 3rd-year BSc schedule with active IT support shifts)'
    ]
  }
]

// References Data
const referencesData: Reference[] = [
  {
    name: 'Shelly van Heerden',
    role: 'Previous Employer',
    company: 'University of Pretoria',
    email: 'shelly.vanheerden@up.ac.za'
  },
  {
    name: 'Zamani Dubazana',
    role: 'Previous Employer',
    company: 'University of Pretoria',
    email: 'zamani.dubazana@up.ac.za'
  }
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Interactive UI State
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0)
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0)

  // Scroll spy setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    })

    navigationItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-900 antialiased overflow-x-hidden">
      
      {/* Sticky Header Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 rounded bg-[#1E3A8A] flex items-center justify-center shadow-xs group-hover:bg-[#1E40AF] transition-colors">
              <span className="font-mono font-bold text-white text-base">WO</span>
            </div>
            <div>
              <span className="block font-bold tracking-tight text-slate-900 text-sm md:text-base leading-none">
                Wicus Olivier
              </span>
              <span className="block font-mono text-[10px] text-slate-500 tracking-wider">
                ENGINEERING GEOLOGY CV
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer relative py-2 ${
                  activeSection === item.id ? 'text-[#1E3A8A]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A8A] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-6 py-4 flex flex-col gap-3 shadow-inner">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-xs font-mono font-bold uppercase tracking-wider py-2 transition-colors ${
                  activeSection === item.id ? 'text-[#1E3A8A]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero / Professional Header Section */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-12 pb-16 relative z-10">
        
        {/* Stone Data-Sheet Container */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-xs relative overflow-hidden text-left">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.4)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
          
          <div className="relative z-10 space-y-6">
            
            {/* Top row: Photo and Details Split Grid */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-slate-100 pb-6">
              
              {/* Photo Column with Custom Geological Scale Styling */}
              <div className="shrink-0 relative">
                <img
                  src="/profile.png"
                  alt="Wicus Olivier"
                  className="w-48 h-60 object-cover rounded-lg border-2 border-slate-200 shadow-sm"
                />
                {/* Scale Bar Decorator */}
                <div className="mt-2.5 font-mono text-[9px] text-slate-400 text-center flex justify-between px-1">
                  <span>0 mm</span>
                  <span className="border-b border-slate-300 flex-1 mx-2.5 relative top-1.5 border-dashed" />
                  <span>150 mm</span>
                </div>
              </div>

              {/* Details Column */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#1E3A8A] uppercase tracking-widest block">
                    CANDIDATE DOSSIER
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    Jacobus Lodewicus (Wicus) Olivier
                  </h1>
                  <h2 className="text-base sm:text-lg font-bold text-slate-600 font-mono">
                    Engineering Geology Student & IT Lab Technician
                  </h2>
                </div>

                {/* Key Facts Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 text-[10px] font-mono font-bold text-[#1E3A8A]">
                    3rd-Year BSc Student
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 text-[10px] font-mono font-bold text-[#1E3A8A]">
                    Code B Driver's License
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                    Pretoria, South Africa
                  </span>
                </div>

                <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 bg-slate-50 border border-slate-200 rounded p-4 text-xs font-mono text-slate-600 text-left">
                  <div>
                    <span className="text-slate-400 font-bold mr-1">TRANSPORT:</span>
                    <span>Own Reliable Transport</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold mr-1">DEPENDENTS:</span>
                    <span>None</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold mr-1">ID NUMBER:</span>
                    <span>Available upon request</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold mr-1">GRADUATION:</span>
                    <span>Nov 2027 (Expected)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Profile Statement */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                Professional Profile
              </h3>
              <p className="text-slate-700 text-sm sm:text-base max-w-4xl leading-relaxed">
                Motivated 3rd-year BSc Engineering and Environmental Geology student at the University of Pretoria with hands-on experience in technical troubleshooting and spatial data tools. Proven ability to balance rigorous academic coursework with a customer-facing technical support role. Eager to leverage theoretical knowledge in geology, practical GIS skills, and problem-solving capabilities in an entry-level or internship position within the engineering geology and environmental sectors.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4 text-slate-500 font-mono text-xs">
                <a
                  href="mailto:wicusolivier72@gmail.com"
                  className="flex items-center gap-2 hover:text-[#1E3A8A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  wicusolivier72@gmail.com
                </a>
                <span className="text-slate-200">|</span>
                <a
                  href="tel:0833218026"
                  className="flex items-center gap-2 hover:text-[#1E3A8A] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  083 321 8026
                </a>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 border border-slate-200 hover:border-[#1E3A8A] rounded font-mono text-xs font-bold text-slate-700 hover:text-[#1E3A8A] transition-colors bg-white shadow-2xs text-center w-full sm:w-auto"
                >
                  View GitHub
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Professional Experience & Education Timeline */}
      <section id="timeline" className="py-16 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Timeline Left Menu */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
                  01. Path & Track
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Experience & Education
                </h2>
                <p className="text-slate-500 text-sm font-mono mt-1 leading-relaxed">
                  Toggle historical milestones below to review specific technical responsibilities and curriculum modules.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {timelineData.map((event, idx) => {
                  const isActive = activeTimelineIdx === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTimelineIdx(idx)}
                      className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer relative z-10 ${
                        isActive
                          ? 'bg-white border-[#1E3A8A] shadow-xs'
                          : 'bg-transparent border-transparent hover:bg-white/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="block text-[10px] font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
                          {event.category === 'experience' ? 'Professional Experience' : 'Education'}
                        </span>
                        <h3 className={`font-bold font-mono text-xs sm:text-sm leading-tight transition-colors ${
                          isActive ? 'text-slate-950 font-extrabold' : 'text-slate-700'
                        }`}>
                          {event.title}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-400 font-bold whitespace-nowrap">
                          {event.period}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Timeline Detail Card */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 min-h-[320px] shadow-2xs flex flex-col justify-between text-left">
              
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 mb-1.5">
                    {timelineData[activeTimelineIdx].category === 'experience' ? 'WORK PRACTICE' : 'ACADEMICS'}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 font-mono leading-snug">
                    {timelineData[activeTimelineIdx].title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {timelineData[activeTimelineIdx].subtitle}
                  </p>
                </div>

                <ul className="space-y-3">
                  {timelineData[activeTimelineIdx].bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-2.5 text-sm sm:text-base text-slate-600 leading-relaxed items-start">
                      <span className="text-[#1E3A8A] mt-1 shrink-0 font-bold">&rarr;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-50 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>University of Pretoria</span>
                <span>{timelineData[activeTimelineIdx].period}</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Technical & Core Skills Grid */}
      <section id="skills" className="py-16 max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
            02. Technical Toolkit
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Skills & Coursework Hub
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mt-1 font-mono">
            Explore computational software, scientific mapping, and professional competencies.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-slate-200 mb-8 font-mono text-xs md:text-sm font-bold uppercase tracking-wider gap-2">
          {skillsCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTabIdx(idx)}
              className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTabIdx === idx
                  ? 'border-[#1E3A8A] text-[#1E3A8A] bg-[#1E3A8A]/5 rounded-t'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {cat.category.split(' & ')[0]}
            </button>
          ))}
        </div>

        {/* Active Tab Contents */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs text-left">
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full" />
              {skillsCategories[activeTabIdx].category}
            </h3>

            <div className="space-y-4">
              <ul className="space-y-3.5 max-w-3xl">
                {skillsCategories[activeTabIdx].items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    <span className="text-[#1E3A8A] mt-1 text-sm font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* Verified Professional References Section */}
      <section id="references" className="py-16 max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
            03. Endorsements
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Verified Professional References
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mt-1 font-mono">
            Direct contacts verifying university employment and academic performance.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {referencesData.map((ref, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E3A8A]" />
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 font-mono">
                    {ref.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono font-semibold">
                    {ref.role} | {ref.company}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5 font-mono text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold uppercase w-16">EMAIL:</span>
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-[#1E3A8A] hover:underline font-semibold"
                    >
                      {ref.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold uppercase w-16">COMPANY:</span>
                    <span>{ref.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="block font-bold text-slate-900 text-sm font-mono leading-none">
              Jacobus Lodewicus (Wicus) Olivier
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wide mt-1">
              Engineering Geology Student & IT Lab Technician
            </span>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase font-bold tracking-wider">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-slate-950 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 text-[10px] text-slate-400">
          © {new Date().getFullYear()} Wicus Olivier. Constructed with React, TS, and Tailwind CSS v4.
        </div>
      </footer>

    </div>
  )
}
