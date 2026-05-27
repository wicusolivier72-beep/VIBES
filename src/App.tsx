import { useState, useEffect } from 'react'

// Interfaces
interface CourseworkCategory {
  category: string
  items: string[]
  hasWorkflow?: boolean
  workflowSteps?: string[]
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

// Navigation Items
const navigationItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'timeline', label: 'Experience & Education' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'rmr', label: 'RMR Calculator' },
  { id: 'references', label: 'References' },
]

// Professional Timeline Data
const timelineData: TimelineEvent[] = [
  {
    title: 'Student IT Lab Technician',
    subtitle: 'Mining Industry Study Centre, University of Pretoria',
    period: 'February 2026 - Present',
    category: 'experience',
    bullets: [
      'Provide front-line technical support for undergraduate/postgraduate students and academic staff.',
      'Diagnose and troubleshoot computer laboratory hardware, including PCs, printers, and screens.',
      'Configure software applications, handle domain login assistance, and resolve local network connectivity issues.',
      'Assist students with accessing academic portal resources and configuring specialized GIS processing environments.'
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

// Skills and Coursework Data
const skillsCategories: CourseworkCategory[] = [
  {
    category: 'Geospatial & Technical Software',
    items: [
      'QGIS (Vector mapping, spatial analysis, overlay zoning, raster calculations)',
      'Google Earth Engine (GEE) (Scripting satellite datasets, temporal band comparisons, spectral analysis)',
      'Geotechnical Logging Utilities (Parsing borehole depths, plotting stratigraphic columns)'
    ],
    hasWorkflow: true,
    workflowSteps: [
      'Query & filter Sentinel-2 multispectral surface reflectance datasets for target dates.',
      'Apply cloud masking using QA bands to generate clear geographic composites.',
      'Calculate Normalized Difference Vegetation Index (NDVI) mapping formulas: (B8 - B4) / (B8 + B4).',
      'Classify land usage classes via supervised Random Forest model algorithms.',
      'Export multi-temporal raster layers to QGIS for vector overlay mapping comparison.'
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
    email: 'shelly.vanheennden@up.ac.za'
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
  const [showWorkflow, setShowWorkflow] = useState<boolean>(false)
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0)

  // RMR Calculator State
  const [ucsStrength, setUcsStrength] = useState<number>(12) // Default: 100-250 MPa (Rating: 12)
  const [rqdValue, setRqdValue] = useState<number>(75)      // Default: 75% RQD
  const [disspacing, setDisspacing] = useState<number>(15)    // Default: 0.6-2m (Rating: 15)
  const [condition, setCondition] = useState<number>(22)      // Default: Slightly Rough (Rating: 22)
  const [groundwater, setGroundwater] = useState<number>(10)  // Default: Damp (Rating: 10)

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

  // Calculate RQD rating based on the prompt's rules:
  // >90% [20], 75-90% [17], 50-75% [13], 25-50% [8], <25% [3]
  const getRqdRating = (val: number): number => {
    if (val > 90) return 20
    if (val >= 75) return 17
    if (val >= 50) return 13
    if (val >= 25) return 8
    return 3
  }

  const rqdRating = getRqdRating(rqdValue)
  const totalRmrScore = ucsStrength + rqdRating + disspacing + condition + groundwater

  // Rock Class classification
  const getRockClassification = (score: number) => {
    if (score >= 81) return { class: 'Class I', text: 'Very Good Rock', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
    if (score >= 61) return { class: 'Class II', text: 'Good Rock', color: 'bg-teal-50 text-teal-800 border-teal-200' }
    if (score >= 41) return { class: 'Class III', text: 'Fair Rock', color: 'bg-amber-50 text-amber-800 border-amber-200' }
    if (score >= 21) return { class: 'Class IV', text: 'Poor Rock', color: 'bg-orange-50 text-orange-800 border-orange-200' }
    return { class: 'Class V', text: 'Very Poor Rock', color: 'bg-red-50 text-red-800 border-red-200' }
  }

  const classification = getRockClassification(totalRmrScore)

  const handleDownloadCV = () => {
    alert("Simulating PDF download: Jacobus_Lodewicus_Wicus_Olivier_Geological_CV.pdf")
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
            <button
              onClick={handleDownloadCV}
              className="px-3.5 py-1.5 rounded border border-[#1E3A8A] text-[#1E3A8A] text-xs font-mono font-bold hover:bg-[#1E3A8A] hover:text-white transition-all cursor-pointer shadow-2xs"
            >
              PDF CV
            </button>
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
            <button
              onClick={handleDownloadCV}
              className="w-full text-center px-4 py-2.5 rounded border border-[#1E3A8A] text-[#1E3A8A] text-xs font-mono font-bold hover:bg-[#1E3A8A] hover:text-white transition-all"
            >
              Download PDF CV
            </button>
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
                  src="/profile.jpg"
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
                  className="px-4 py-2 border border-slate-200 hover:border-[#1E3A8A] rounded font-mono text-xs font-bold text-slate-700 hover:text-[#1E3A8A] transition-colors bg-white shadow-2xs text-center flex-1 sm:flex-initial"
                >
                  View GitHub
                </a>
                <button
                  onClick={handleDownloadCV}
                  className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded font-mono text-xs font-bold transition-all shadow-xs text-center flex-1 sm:flex-initial cursor-pointer"
                >
                  Download PDF CV
                </button>
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
              onClick={() => {
                setActiveTabIdx(idx)
                setShowWorkflow(false)
              }}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left Column: Skills list */}
              <div className="space-y-4">
                <ul className="space-y-3.5">
                  {skillsCategories[activeTabIdx].items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      <span className="text-[#1E3A8A] mt-1 text-sm font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Workflow methodology widget for Geospatial tab */}
              {skillsCategories[activeTabIdx].hasWorkflow && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs font-mono text-slate-700 uppercase tracking-wider">
                        Geospatial Workflow Widget
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Spectral analysis & NDVI processing
                      </p>
                    </div>
                    <button
                      onClick={() => setShowWorkflow(!showWorkflow)}
                      className="px-3 py-1.5 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded font-mono text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                    >
                      {showWorkflow ? 'Hide Workflow' : 'Run Demo Workflow'}
                    </button>
                  </div>

                  {showWorkflow ? (
                    <div className="bg-zinc-900 text-[#cbd5e1] border border-zinc-800 rounded p-4 font-mono text-[11px] space-y-2.5 animate-in fade-in duration-200">
                      <div className="border-b border-zinc-800 pb-1.5 text-orange-400 font-bold uppercase tracking-wider flex justify-between">
                        <span>GEE Processing Pipeline</span>
                        <span className="text-emerald-400">RUNNING...</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1.5">
                        {skillsCategories[activeTabIdx].workflowSteps?.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed pl-1 text-[11px]">
                            <span className="text-zinc-500 font-semibold">Step {sIdx + 1}:</span>{' '}
                            <span className="text-zinc-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="text-emerald-400 font-semibold border-t border-zinc-850 pt-2 text-center text-[10px]">
                        // SUCCESS: Geospatial index layers exported to QGIS project file.
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 border border-slate-200 border-dashed rounded flex flex-col items-center justify-center text-center text-xs text-slate-400 p-4 font-mono">
                      <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Click "Run Demo Workflow" to simulate the Google Earth Engine processing pipeline
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* Interactive Rock Mass Rating (RMR) Calculator Widget */}
      <section id="rmr" className="py-16 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
              03. Engineering Utility Widget
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Rock Mass Rating (RMR) Calculator
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mt-1 font-mono">
              Evaluates geomechanical stability using Bieniawski (1989) standards. Adjust geological variables below to compute ratings dynamically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs Panel (Left) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full" />
                Parameters Input Sheet
              </h3>

              {/* 1. UCS Strength */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>1. UCS Strength of Intact Rock</span>
                  <span className="text-[#1E3A8A] font-mono">Rating: {ucsStrength}</span>
                </label>
                <select
                  value={ucsStrength}
                  onChange={(e) => setUcsStrength(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors"
                >
                  <option value={15}>&gt;250 MPa [Rating: 15]</option>
                  <option value={12}>100 - 250 MPa [Rating: 12]</option>
                  <option value={7}>50 - 100 MPa [Rating: 7]</option>
                  <option value={4}>25 - 50 MPa [Rating: 4]</option>
                </select>
              </div>

              {/* 2. RQD Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>2. RQD (Rock Quality Designation)</span>
                  <span className="text-[#1E3A8A] font-mono">
                    RQD: {rqdValue}% &rarr; Rating: {rqdRating}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rqdValue}
                  onChange={(e) => setRqdValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 px-0.5">
                  <span>Very Poor (&lt;25%)</span>
                  <span>Poor (25-50%)</span>
                  <span>Fair (50-75%)</span>
                  <span>Good (75-90%)</span>
                  <span>Very Good (&gt;90%)</span>
                </div>
              </div>

              {/* 3. Discontinuity Spacing */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>3. Discontinuity Spacing</span>
                  <span className="text-[#1E3A8A] font-mono">Rating: {disspacing}</span>
                </label>
                <select
                  value={disspacing}
                  onChange={(e) => setDisspacing(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors"
                >
                  <option value={20}>&gt;2 m [Rating: 20]</option>
                  <option value={15}>0.6 - 2 m [Rating: 15]</option>
                  <option value={10}>200 - 600 mm [Rating: 10]</option>
                  <option value={8}>60 - 200 mm [Rating: 8]</option>
                </select>
              </div>

              {/* 4. Condition of Discontinuities */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>4. Condition of Discontinuities</span>
                  <span className="text-[#1E3A8A] font-mono">Rating: {condition}</span>
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors"
                >
                  <option value={30}>Very Rough, unweathered, tightly closed [Rating: 30]</option>
                  <option value={22}>Slightly Rough, apertures &lt;1mm, weathered [Rating: 22]</option>
                  <option value={12}>Smooth joints, apertures 1-5mm [Rating: 12]</option>
                </select>
              </div>

              {/* 5. Groundwater */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>5. Groundwater Conditions</span>
                  <span className="text-[#1E3A8A] font-mono">Rating: {groundwater}</span>
                </label>
                <select
                  value={groundwater}
                  onChange={(e) => setGroundwater(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-colors"
                >
                  <option value={15}>Completely Dry [Rating: 15]</option>
                  <option value={10}>Damp (minor inflows) [Rating: 10]</option>
                  <option value={7}>Wet (joint pressure) [Rating: 7]</option>
                  <option value={0}>Flowing [Rating: 0]</option>
                </select>
              </div>

            </div>

            {/* Output Display Panel (Right) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs h-full flex flex-col justify-between">
              
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full" />
                  Calculated Results
                </h3>

                {/* Score badge */}
                <div className="text-center py-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <span className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    TOTAL RMR SCORE
                  </span>
                  <span className="block text-6xl font-extrabold text-[#1E3A8A]">
                    {totalRmrScore}
                  </span>
                  <span className="block text-xs font-mono text-slate-500">
                    out of 100 points
                  </span>
                </div>

                {/* Classification badge */}
                <div className={`p-4 border rounded-lg text-center space-y-1 transition-colors duration-200 ${classification.color}`}>
                  <span className="block text-xs font-mono font-bold uppercase tracking-widest">
                    ROCK MASS CLASSIFICATION
                  </span>
                  <span className="block text-xl font-bold font-mono">
                    {classification.class}
                  </span>
                  <span className="block text-sm font-semibold">
                    ({classification.text})
                  </span>
                </div>
              </div>

              {/* RMR Reference Table */}
              <div className="pt-6 border-t border-slate-100 space-y-3 mt-6">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest text-left">
                  Bieniawski Reference Table
                </span>
                <div className="overflow-x-auto text-[10px] font-mono text-slate-500">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-800">
                        <th className="pb-1.5 font-bold">RMR Range</th>
                        <th className="pb-1.5 font-bold">Class</th>
                        <th className="pb-1.5 font-bold">Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={totalRmrScore >= 81 ? 'text-[#1E3A8A] font-bold bg-[#1E3A8A]/5' : ''}>
                        <td className="py-1">81 – 100</td>
                        <td>Class I</td>
                        <td>Very Good Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 61 && totalRmrScore <= 80) ? 'text-[#1E3A8A] font-bold bg-[#1E3A8A]/5' : ''}>
                        <td className="py-1">61 – 80</td>
                        <td>Class II</td>
                        <td>Good Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 41 && totalRmrScore <= 60) ? 'text-[#1E3A8A] font-bold bg-[#1E3A8A]/5' : ''}>
                        <td className="py-1">41 – 60</td>
                        <td>Class III</td>
                        <td>Fair Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 21 && totalRmrScore <= 40) ? 'text-[#1E3A8A] font-bold bg-[#1E3A8A]/5' : ''}>
                        <td className="py-1">21 – 40</td>
                        <td>Class IV</td>
                        <td>Poor Rock</td>
                      </tr>
                      <tr className={totalRmrScore < 21 ? 'text-[#1E3A8A] font-bold bg-[#1E3A8A]/5' : ''}>
                        <td className="py-1">&lt;21</td>
                        <td>Class V</td>
                        <td>Very Poor Rock</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Verified Professional References Section */}
      <section id="references" className="py-16 max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
            05. Endorsements
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
