import { useState, useEffect } from 'react'

// Interfaces
interface CourseworkCategory {
  category: string
  items: string[]
}

interface EducationMilestone {
  title: string
  institution: string
  period: string
  details: string[]
}

interface ReferenceContact {
  name: string
  relationship: string
  phone: string
  email?: string
  context: string
}

// Navigation Items
const navigationItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'competencies', label: 'Competencies & Coursework' },
  { id: 'timeline-references', label: 'Education & References' },
  { id: 'rmr-calculator', label: 'RMR Calculator' },
]

// Competencies & Coursework Data
const courseworkData: CourseworkCategory[] = [
  {
    category: 'Core Engineering Geology & Science',
    items: [
      'Introductory Geology (Lithology, mineralogy, structural fault systems)',
      '1st Year Chemistry (General chemistry concepts, stoichiometry, molecular geometry)',
      '2nd Year Chemistry (Organic chemistry, physical chemistry, thermodynamics)',
      'Introductory Soil Science (Soil physical properties, soil profiling, soil horizons)',
      'Biometry (Statistical methods, biological/geological data modeling, hypothesis testing)'
    ]
  },
  {
    category: 'Technical & Tools',
    items: [
      'QGIS (Spatial vector and raster analysis, topological modeling)',
      'Google Earth Engine (GEE) (Remote sensing imagery processing, multispectral band comparison)',
      'Microsoft Office Suite (Advanced Word reports, Excel data models, PowerPoint presentations)',
      'Geological Data Plotting (Visualizing stratigraphic columns, recovery rates)'
    ]
  },
  {
    category: 'Core Attributes & Professionalism',
    items: [
      'Analytical Problem-Solving (Systematic assessment of mechanical data and terrain contours)',
      'Interdisciplinary Teamwork (Collaboration with research peers and lab teams)',
      'Technical Communication (Writing detailed engineering geology logs and research abstracts)'
    ]
  }
]

// Education Track Data
const educationData: EducationMilestone[] = [
  {
    title: 'BSc Engineering and Environmental Geology',
    institution: 'University of Pretoria',
    period: '2024 - Present (Expected Graduation: 2027)',
    details: [
      'Focusing on the interaction of engineering structures with the geological environment.',
      'Completed courses in soil properties, mineral physics, and analytical chemistry.',
      'Active participant in departmental field workshops and coordinate system georeferencing modules.'
    ]
  },
  {
    title: 'National Senior Certificate (Matric)',
    institution: 'High School Graduation',
    period: 'Class of 2023',
    details: [
      'Achieved Matric certification with strong performance in technical and spatial subjects.',
      'Core academic focus areas: Physical Sciences, Mathematics, Geography, and Accounting.'
    ]
  }
]

// Reference Contacts
const referencesData: ReferenceContact[] = [
  {
    name: 'Mr. Etienne Terblanche',
    relationship: 'High School Teacher (Geography / Sciences)',
    phone: '076 943 7413',
    context: 'Academic supervisor throughout secondary schooling; can speak to core work ethic, geographical mapping foundation, and leadership attributes.'
  },
  {
    name: 'Mr. Armand le Roux',
    relationship: 'Chemistry Tutor (1-Year Duration)',
    phone: '082 308 9238',
    context: 'Guided through university general chemistry modules, reaction kinetics, and laboratory safety protocols; can verify technical problem-solving capabilities.'
  }
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Interactive UI state
  const [expandedCourseworkIdx, setExpandedCourseworkIdx] = useState<number | null>(0)
  const [expandedReferenceIdx, setExpandedReferenceIdx] = useState<number | null>(null)
  
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
      rootMargin: '-40% 0px -40% 0px',
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

  // Calculate RQD rating rating based on the prompt's rules:
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

  // Rock Class descriptions
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
      
      {/* Sticky Top Header Navigation */}
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
                GEOLOGY CV & PORTFOLIO
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
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
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
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
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-4 flex flex-col gap-3 shadow-inner">
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
            
            {/* Top row: Badges and Details */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#1E3A8A] uppercase tracking-widest block">
                  CANDIDATE DOSSIER
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                  Jacobus Lodewicus (Wicus) Olivier
                </h1>
                <h2 className="text-base sm:text-lg font-bold text-slate-600 font-mono">
                  Engineering & Environmental Geology Student | University of Pretoria
                </h2>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono space-y-1 text-slate-600">
                <div><span className="text-slate-400 font-bold">DRIVERS:</span> Code B (Own Transport)</div>
                <div><span className="text-slate-400 font-bold">LOCATION:</span> Pretoria, South Africa</div>
                <div><span className="text-slate-400 font-bold">GRADUATION:</span> Nov 2027 (Expected)</div>
              </div>
            </div>

            {/* Profile Statement */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                Personal Statement
              </h3>
              <p className="text-slate-700 text-sm sm:text-base max-w-4xl leading-relaxed">
                A motivated 2nd-year BSc Engineering and Environmental Geology student eager to apply theoretical knowledge and practical experience to real-world challenges in geology and environmental engineering. Seeking internship or entry-level opportunities to develop expertise and contribute to impactful geological projects.
              </p>
            </div>

            {/* Quick-Filter Navigation */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                Core Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                  #Geotechnical
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                  #GIS-RemoteSensing
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                  #EnvironmentalGeology
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                  #SoilScience
                </span>
              </div>
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

      {/* Interactive Competencies & Coursework Hub */}
      <section id="competencies" className="py-16 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8 text-left">
            <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
              01. Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Interactive Competencies & Coursework Hub
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mt-1 font-mono">
              Toggle academic domains to review university courses and core tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Toggles Panel (Left) */}
            <div className="lg:col-span-4 space-y-2">
              {courseworkData.map((category, idx) => {
                const isActive = expandedCourseworkIdx === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setExpandedCourseworkIdx(idx)}
                    className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer font-semibold font-mono text-xs md:text-sm uppercase flex items-center justify-between ${
                      isActive
                        ? 'bg-white border-[#1E3A8A] text-[#1E3A8A] shadow-xs'
                        : 'bg-transparent border-transparent hover:bg-white/40 text-slate-600'
                    }`}
                  >
                    <span>{category.category.split(' & ')[0]}</span>
                    <span className="text-slate-400 font-bold">{isActive ? '➔' : ''}</span>
                  </button>
                )
              })}
            </div>

            {/* List Detail Panel (Right) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 min-h-[250px] shadow-2xs flex flex-col justify-between">
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full" />
                  {courseworkData[expandedCourseworkIdx ?? 0].category}
                </h3>
                
                <ul className="space-y-3.5 text-left">
                  {courseworkData[expandedCourseworkIdx ?? 0].items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      <span className="text-[#1E3A8A] mt-1 text-sm font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-50 mt-6 text-[10px] font-mono text-slate-400 text-right">
                BSc Curriculum (University of Pretoria)
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Project & Experience Timeline */}
      <section id="timeline-references" className="py-16 max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Education Track (Left) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
                02. Academic Path
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Education Timeline
              </h2>
            </div>

            <div className="relative pl-6 space-y-8 border-l border-slate-200">
              {educationData.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline point */}
                  <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#1E3A8A] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
                  </span>

                  <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-2xs">
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-2">
                      <div>
                        <h3 className="font-bold text-slate-900 font-mono text-sm sm:text-base">
                          {edu.title}
                        </h3>
                        <p className="text-xs text-[#1E3A8A] font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex gap-2 items-start leading-relaxed">
                          <span className="text-[#1E3A8A] font-bold">&rsaquo;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* References Track (Right) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
                03. Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Verified References
              </h2>
            </div>

            <p className="text-slate-500 text-sm font-mono leading-relaxed">
              Expand reference cards below to view contacts and academic relationships.
            </p>

            <div className="space-y-4">
              {referencesData.map((ref, idx) => {
                const isOpen = expandedReferenceIdx === idx
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <button
                      onClick={() => setExpandedReferenceIdx(isOpen ? null : idx)}
                      className="w-full text-left flex items-start justify-between cursor-pointer"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 font-mono text-base">
                          {ref.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold leading-none">
                          {ref.relationship}
                        </p>
                      </div>
                      
                      <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-500 text-xs font-mono font-bold hover:text-[#1E3A8A] hover:border-[#1E3A8A] transition-colors">
                        {isOpen ? 'Close' : 'Expand'}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200 text-left text-sm text-slate-600">
                        <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5 font-mono text-xs">
                          <div>
                            <span className="text-slate-400 font-bold">CONTACT PHONE:</span>{' '}
                            <a href={`tel:${ref.phone.replace(/\s+/g, '')}`} className="text-[#1E3A8A] hover:underline font-bold">
                              {ref.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold">RELATIONSHIP:</span> {ref.relationship}
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-500 font-sans">
                          {ref.context}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          </div>

        </div>

      </section>

      {/* Rock Mass Rating (RMR) Calculator */}
      <section id="rmr-calculator" className="py-16 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <span className="text-xs font-mono font-bold text-[#1E3A8A] uppercase tracking-wider">
              04. Geomechanical Field Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Rock Mass Rating (RMR) Calculator
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mt-1 font-mono">
              Evaluates geomechanical stability using Bieniawski (1989) classifications. Adjust geological variables below to compute ratings dynamically.
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

      {/* Corporate Styled Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="block font-bold text-slate-900 text-sm font-mono leading-none">
              Jacobus Lodewicus (Wicus) Olivier
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wide mt-1">
              Engineering & Environmental Geology Student | Pretoria
            </span>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase font-bold tracking-wider">
            <button onClick={() => scrollToSection('hero')} className="hover:text-slate-950 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollToSection('competencies')} className="hover:text-slate-950 transition-colors cursor-pointer">
              Competencies
            </button>
            <button onClick={() => scrollToSection('timeline-references')} className="hover:text-slate-950 transition-colors cursor-pointer">
              Education & References
            </button>
            <button onClick={() => scrollToSection('rmr-calculator')} className="hover:text-slate-950 transition-colors cursor-pointer">
              RMR Calculator
            </button>
          </div>
        </div>
        <div className="mt-8 text-[10px] text-slate-400">
          © {new Date().getFullYear()} Wicus Olivier. Constructed with React, TS, and Tailwind CSS v4.
        </div>
      </footer>

    </div>
  )
}
