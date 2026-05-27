import { useState, useEffect } from 'react'

// Interfaces
interface SkillCategory {
  category: string
  skills: string[]
}

interface Project {
  title: string
  category: 'gis' | 'fieldwork' | 'side'
  description: string
  tags: string[]
  github: string
  methodology: string[]
}

interface TimelineEvent {
  title: string
  subtitle: string
  period: string
  category: 'academic' | 'work'
  bullets: string[]
}

// Static Data
const navigationItems = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'rmr-calculator', label: 'RMR Calculator' },
  { id: 'timeline', label: 'Timeline' },
]

const skillsData: SkillCategory[] = [
  {
    category: 'Geographic Information Systems (GIS)',
    skills: ['QGIS Desktop', 'Google Earth Engine (GEE)', 'Spatial Analysis', 'Remote Sensing', 'Multispectral Imagery Analysis', 'Coordinate Systems & Projections'],
  },
  {
    category: 'Field & Lab Methods',
    skills: ['Borehole Core Logging', 'Soil Profiling (MCCSS Method)', 'Rock Mass Rating (RMR)', 'Stratigraphic Mapping', 'Slope Kinematic Analysis', 'Soil Hydrology / Infiltration'],
  },
  {
    category: 'Data & Systems',
    skills: ['Python for Geoscience', 'Pandas & NumPy', 'Matplotlib / Stratigraphic Plotting', 'Git & GitHub Version Control', 'Linux Environments (Ubuntu)', 'Data Formatting & Parser Utilities'],
  },
]

const projectsData: Project[] = [
  {
    title: 'Multitemporal Sentinel-2 Spectral Analysis',
    category: 'gis',
    description: 'A study tracking land cover change, vegetation health index (NDVI), and environmental degradation patterns over mine tailing dams in Mpumalanga from 2018 to 2024.',
    tags: ['Google Earth Engine', 'QGIS', 'Python', 'Remote Sensing'],
    github: 'https://github.com',
    methodology: [
      'Query and filter Sentinel-2 Surface Reflectance (Level-2A) collections for Mpumalanga dry season months.',
      'Apply cloud and shadow masking algorithms using QA bands to generate clear composite imagery.',
      'Calculate Normalized Difference Vegetation Index (NDVI) and Normalized Difference Water Index (NDWI) indices.',
      'Implement Random Forest classification trained on ground-truth mine tailing coordinates to map extent changes.',
      'Export multi-band GeoTIFF rasters and compile dynamic map overlays in QGIS for structural change comparison.'
    ]
  },
  {
    title: 'Slope Stability & RMR Assessment of Road Cut',
    category: 'fieldwork',
    description: 'Geotechnical characterization, joint survey mapping, and Rock Mass Rating (RMR) calculations for a fractured basaltic road cut slope vulnerable to planar slides.',
    tags: ['RMR System', 'Joint Mapping', 'Kinematic Analysis', 'Geotechnical'],
    github: 'https://github.com',
    methodology: [
      'Conduct scanline mapping along a 25-meter basaltic rock slope, measuring joint strike, dip direction, and spacing.',
      'Perform laboratory point-load index testing and estimate Uniaxial Compressive Strength (UCS) equivalents.',
      'Determine Rock Quality Designation (RQD) percentage from borehole core recovery data.',
      'Map joint orientations using stereonet projection software to assess susceptibility to planar, wedge, and toppling failures.',
      'Calculate the primary RMR score to derive support design requirements, recommending tensioned rock bolts and shotcrete.'
    ]
  },
  {
    title: 'GIS-Based Landslide Susceptibility Mapping',
    category: 'gis',
    description: 'Weighted multi-criteria overlay modelling inside QGIS to map geological hazard and landslide susceptibility zones using topographical and hydrological parameters.',
    tags: ['QGIS', 'Spatial Analyst', 'DEM Modeling', 'Hazard Assessment'],
    github: 'https://github.com',
    methodology: [
      'Procure a 30m Digital Elevation Model (DEM) and derive elevation slope gradients, aspect angles, and drainage flow directions.',
      'Compile layer rasters for regional geological lithology, annual rainfall precipitation, and road network buffers.',
      'Apply Analytical Hierarchy Process (AHP) in Python to compute weighting factors for slope (35%), geology (25%), water (20%), and soil (20%).',
      'Compute raster overlay map via QGIS Raster Calculator and reclassify values into five susceptibility tiers.',
      'Cross-reference the resulting hazard map with historic landslide points to validate spatial model accuracy.'
    ]
  },
  {
    title: 'Stratigraphic Log Python Plotter',
    category: 'side',
    description: 'A developer utility package designed to parse CSV borehole datasets and automatically plot color-coded stratigraphic columns with detailed core description annotation.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Data Formatting'],
    github: 'https://github.com',
    methodology: [
      'Establish a standardized CSV formatting template specifying Depth-From, Depth-To, Lithology-Code, and Description columns.',
      'Develop pandas validation methods to clean overlaying depths and format structural entries.',
      'Map specific lithological codes to custom SVG hatching styles and USGS standard colors (e.g., limestone bricks, sandstone dots).',
      'Generate dynamic Matplotlib figures displaying depth columns alongside core recovery and RQD percentages.',
      'Construct a local Streamlit dashboard allowing users to upload data sheets and immediately export high-res vector PDF logs.'
    ]
  }
]

const timelineData: TimelineEvent[] = [
  {
    title: 'B.Sc. Hons Engineering & Environmental Geology',
    subtitle: 'University of Pretoria',
    period: '2025 - Present',
    category: 'academic',
    bullets: [
      'Specialized curriculum: Geotechnical Rock Mechanics, Engineering Geology of Soils, GIS Spatial Modelling, Hydrogeology, and Environmental Geochemistry.',
      'Active honors research project focusing on the correlation between soil plasticity indices and mechanical shear strength.',
      'Developing structural mapping methodologies combining field geological investigations with satellite multispectral imagery.'
    ]
  },
  {
    title: 'B.Sc. Geology (Major)',
    subtitle: 'University of Pretoria',
    period: '2022 - 2024',
    category: 'academic',
    bullets: [
      'Core modules: Structural Geology, Sedimentology & Stratigraphy, Igneous & Metamorphic Petrology, Mineralogy, and Geophysics.',
      'Conducted field mapping exercises mapping complex fold structures and normal fault displacements in highly deformed terranes.',
      'Received solid foundational training in optical mineralogy, geophysical survey methods (resistivity, gravity), and regional geology.'
    ]
  },
  {
    title: 'Geotechnical Field Assistant (Student Intern)',
    subtitle: 'Apex Geotechnical Services',
    period: 'Summer 2024',
    category: 'work',
    bullets: [
      'Assisted in trial pit excavations and soil profiling according to the South African MCCSS method (Moisture, Color, Consistency, Structure, Soil Type).',
      'Logged diamond core samples, documenting fracture frequencies, joint weathering conditions, and calculating RQD ratings.',
      'Conducted double-ring infiltrometer testing in the field to assess soil hydraulic conductivity for environmental drainage mapping.'
    ]
  },
  {
    title: 'GIS Lab Student Tutor',
    subtitle: 'Department of Geology, UP',
    period: '2024 (Part-time)',
    category: 'work',
    bullets: [
      'Tutored undergraduate students during practical lab sessions, guiding them through spatial raster analysis, map coordinate conversions, and georeferencing.',
      'Assisted with QGIS database organization, cleaning attribute tables, and verifying spatial projection alignments.',
      'Provided debug support for coordinate system errors and file projection mismatches.'
    ]
  }
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Custom states
  const [fieldLogOpen, setFieldLogOpen] = useState(false)
  const [projectCategory, setProjectCategory] = useState<'all' | 'gis' | 'fieldwork' | 'side'>('all')
  const [expandedProjectIdx, setExpandedProjectIdx] = useState<number | null>(null)
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState<number>(0)

  // RMR Calculator State
  const [ucsStrength, setUcsStrength] = useState<number>(12) // Default: 100-250 MPa (Rating: 12)
  const [rqdValue, setRqdValue] = useState<number>(75)      // Default: 75% RQD
  const [disspacing, setDisspacing] = useState<number>(15)    // Default: 0.6-2m (Rating: 15)
  const [condition, setCondition] = useState<number>(22)      // Default: Slightly Rough (Rating: 22)
  const [groundwater, setGroundwater] = useState<number>(10)  // Default: Damp (Rating: 10)

  // Scroll spy effect
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

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // RQD Rating calculation helper based on the prompt's rules:
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

  // Rock classification helper:
  const getRockClassification = (score: number) => {
    if (score >= 81) return { class: 'Class I', text: 'Very Good Rock', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
    if (score >= 61) return { class: 'Class II', text: 'Good Rock', color: 'bg-teal-50 text-teal-800 border-teal-200' }
    if (score >= 41) return { class: 'Class III', text: 'Fair Rock', color: 'bg-amber-50 text-amber-800 border-amber-200' }
    if (score >= 21) return { class: 'Class IV', text: 'Poor Rock', color: 'bg-orange-50 text-orange-800 border-orange-200' }
    return { class: 'Class V', text: 'Very Poor Rock', color: 'bg-red-50 text-red-800 border-red-200' }
  }

  const classification = getRockClassification(totalRmrScore)

  // Filter project logic
  const filteredProjects = projectsData.filter((proj) => {
    if (projectCategory === 'all') return true
    return proj.category === projectCategory
  })

  // Simulated CV Download alert helper
  const handleDownloadCV = () => {
    alert('Simulating PDF download: Geological CV - Wicus Olivier (B.Sc Hons).pdf')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-600/10 selection:text-orange-950 antialiased overflow-x-hidden">
      
      {/* Sticky Data Sheet Nav Bar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded bg-[#9A3412] flex items-center justify-center shadow-sm">
              <span className="font-mono font-bold text-white text-base">W</span>
            </div>
            <div className="text-left">
              <span className="block font-bold tracking-tight text-slate-900 text-sm md:text-base leading-none">
                Wicus Olivier
              </span>
              <span className="block font-mono text-[10px] text-slate-500 tracking-wider">
                GEOLOGY & GEOTECHNICS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer relative py-2 ${
                  activeSection === item.id ? 'text-[#9A3412]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleDownloadCV}
              className="px-3.5 py-1.5 rounded border border-[#9A3412] text-[#9A3412] text-xs font-mono font-bold hover:bg-[#9A3412] hover:text-white transition-all cursor-pointer shadow-sm"
            >
              PDF CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-950 transition-colors"
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
                  activeSection === item.id ? 'text-[#9A3412]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleDownloadCV}
              className="w-full text-center px-4 py-2.5 rounded border border-[#9A3412] text-[#9A3412] text-xs font-mono font-bold hover:bg-[#9A3412] hover:text-white transition-all"
            >
              Download PDF CV
            </button>
          </div>
        )}
      </nav>

      {/* Hero / Professional Header Section */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center relative z-10">
        
        {/* Stone Data-Sheet Container */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-8 sm:p-12 shadow-sm relative overflow-hidden text-left">
          {/* Subtle grid pattern background to feel like draft paper */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(241,245,249,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(241,245,249,0.5)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />
          
          <div className="relative z-10 space-y-6 max-w-4xl">
            {/* Professional Subheading */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
              <span>B.Sc. Honors Candidate</span>
              <span className="text-slate-300">•</span>
              <span>University of Pretoria</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Wicus Olivier
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-700 font-mono">
              Engineering & Environmental Geology
            </h2>

            {/* Description Hook */}
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Synthesizing geotechnical data, soil mechanical properties, and spatial imagery models. Actively logging rock cores, constructing GIS hazard susceptibility maps, and writing Python tools to bridge geological mapping with engineered slope support solutions.
            </p>

            {/* Quick-filter Scroll Badges */}
            <div className="pt-2">
              <span className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                Core Domains (Click to explore)
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => scrollToSection('rmr-calculator')}
                  className="px-3 py-1.5 rounded border border-slate-200 hover:border-[#9A3412] hover:bg-slate-50 transition-all font-mono text-xs text-slate-700 font-semibold cursor-pointer shadow-2xs"
                >
                  #Geotechnical-RMR
                </button>
                <button
                  onClick={() => {
                    setProjectCategory('gis')
                    scrollToSection('projects')
                  }}
                  className="px-3 py-1.5 rounded border border-slate-200 hover:border-[#9A3412] hover:bg-slate-50 transition-all font-mono text-xs text-slate-700 font-semibold cursor-pointer shadow-2xs"
                >
                  #GIS-RemoteSensing
                </button>
                <button
                  onClick={() => {
                    setProjectCategory('fieldwork')
                    scrollToSection('projects')
                  }}
                  className="px-3 py-1.5 rounded border border-slate-200 hover:border-[#9A3412] hover:bg-slate-50 transition-all font-mono text-xs text-slate-700 font-semibold cursor-pointer shadow-2xs"
                >
                  #Fieldwork-CoreLogging
                </button>
              </div>
            </div>

            {/* Social Links & Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-5 text-slate-500">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#9A3412] transition-colors text-xs font-mono font-semibold"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#9A3412] transition-colors text-xs font-mono font-semibold"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
              </div>

              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#9A3412] hover:bg-[#7F2A0E] text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV PDF
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Competencies Grid Section */}
      <section id="skills" className="py-20 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <span className="text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
              01. Core Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Interactive Competencies Grid
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mt-1 font-mono">
              Hover over or explore structured capabilities grouped by geological disciplines.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* GIS Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#9A3412]/5 flex items-center justify-center border border-[#9A3412]/10">
                  <svg className="w-5 h-5 text-[#9A3412]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">Geographic Info Systems</h3>
                  <p className="text-xs text-slate-500 font-mono">Spatial Data & Satellites</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Advanced processing of vector and raster data, spatial interpolation of groundwater contours, and processing of multispectral imagery bands.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-50 mt-4">
                {skillsData[0].skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Field Methods Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#9A3412]/5 flex items-center justify-center border border-[#9A3412]/10">
                  <svg className="w-5 h-5 text-[#9A3412]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">Field & Lab Methods</h3>
                  <p className="text-xs text-slate-500 font-mono">Core Logging & Site Profiling</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Execution of rock classification systems (RMR), borehole core recoveries logging, shear strength parameter tests, and soil log mapping.
                </p>
                
                {/* Simulated Field Log Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => setFieldLogOpen(!fieldLogOpen)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded text-left text-xs font-mono text-slate-700 hover:border-[#9A3412] hover:text-[#9A3412] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{fieldLogOpen ? 'Hide' : 'Show'} Field Log Snippet</span>
                    <span className="text-slate-400 font-bold">{fieldLogOpen ? '▲' : '▼'}</span>
                  </button>
                  
                  {fieldLogOpen && (
                    <div className="mt-2.5 p-3 rounded bg-zinc-900 text-[#cbd5e1] border border-zinc-800 text-[11px] font-mono space-y-1.5 shadow-inner animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="border-b border-zinc-800 pb-1 flex justify-between font-bold text-orange-400">
                        <span>LITHOLOGICAL LOG</span>
                        <span>BH-02</span>
                      </div>
                      <div><span className="text-zinc-500">PROJECT:</span> Geotech Road Cut mapping</div>
                      <div><span className="text-zinc-500">DEPTH:</span> 3.10m - 5.85m</div>
                      <div><span className="text-zinc-500">LITHOLOGY:</span> Quartz Sandstone, highly silica-cemented</div>
                      <div><span className="text-zinc-500">STRUCTURE:</span> Massively bedded, joint sets spaced 250mm</div>
                      <div><span className="text-zinc-500">RECOVERY:</span> 92% | <span className="text-zinc-500">RQD:</span> 78% (Good)</div>
                      <div className="text-emerald-400 font-semibold pt-1">// MCCSS PROFILE: Silty sand, moist, red-brown, loose</div>
                    </div>
                  )}
                </div>

              </div>
              <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-50 mt-4">
                {skillsData[1].skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Data & Systems Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-[#9A3412]/5 flex items-center justify-center border border-[#9A3412]/10">
                  <svg className="w-5 h-5 text-[#9A3412]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-lg">Data & Systems</h3>
                  <p className="text-xs text-slate-500 font-mono">Geoprocessing Scripts</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Automation scripts for bulk CSV formatting, geological plotting using matplotlib, managing project files using Git, and navigating Linux file systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-50 mt-4">
                {skillsData[2].skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Project Hub Section */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div className="text-left space-y-1">
            <span className="text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
              02. Selected Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Dynamic Project Hub
            </h2>
          </div>
          
          {/* Tab Filter Mechanism */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {[
              { category: 'all', label: 'All Projects' },
              { category: 'gis', label: 'GIS & RS' },
              { category: 'fieldwork', label: 'Fieldwork' },
              { category: 'side', label: 'Side Projects' },
            ].map((tab) => (
              <button
                key={tab.category}
                onClick={() => {
                  setProjectCategory(tab.category as any)
                  setExpandedProjectIdx(null)
                }}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer font-semibold ${
                  projectCategory === tab.category
                    ? 'bg-[#9A3412] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedProjectIdx === idx

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                      {project.category === 'gis'
                        ? 'GIS & Remote Sensing'
                        : project.category === 'fieldwork'
                        ? 'Fieldwork & Engineering'
                        : 'Side Project'}
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-[#9A3412] transition-colors p-1"
                      title="GitHub Repository"
                    >
                      <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>

                  <div className="space-y-2 text-left">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#9A3412] transition-colors font-mono">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Collapsible Methodology Accordion */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => setExpandedProjectIdx(isExpanded ? null : idx)}
                    className="w-full py-1.5 px-3 bg-slate-50 border border-slate-200 hover:border-[#9A3412] text-slate-700 hover:text-[#9A3412] rounded flex items-center justify-between font-mono text-[11px] font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Workflow Methodology' : 'View Workflow Methodology'}</span>
                    <span className="text-[9px]">{isExpanded ? '▲' : '▼'}</span>
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600 space-y-2 animate-in fade-in duration-200 text-left">
                      <div className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-200/60">
                        Methodological Steps:
                      </div>
                      <ol className="list-decimal list-inside space-y-1.5">
                        {project.methodology.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed pl-1 text-[11px]">
                            <span className="text-slate-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Badges List */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </section>

      {/* Rock Mass Rating (RMR) Calculator Section */}
      <section id="rmr-calculator" className="py-20 bg-slate-100 border-t border-b border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <span className="text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
              03. Engineering Utility Widget
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Rock Mass Rating (RMR) Calculator
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mt-1">
              Used in tunnel and slope stability designs. Modify strength settings, slide RQD ratios, and adjust discontinuity spacing to dynamically evaluate the Bieniawski (1989) geomechanical score.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Inputs Panel (Left) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#9A3412] rounded-full" />
                Parameters Input Sheet
              </h3>

              {/* 1. UCS Strength */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>1. UCS Strength of Intact Rock</span>
                  <span className="text-[#9A3412] font-mono">Rating: {ucsStrength}</span>
                </label>
                <select
                  value={ucsStrength}
                  onChange={(e) => setUcsStrength(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412] transition-colors"
                >
                  <option value={15}>&gt;250 MPa [Rating: 15]</option>
                  <option value={12}>100 - 250 MPa [Rating: 12]</option>
                  <option value={7}>50 - 100 MPa [Rating: 7]</option>
                  <option value={4}>25 - 50 MPa [Rating: 4]</option>
                  <option value={1}>&lt;25 MPa [Rating: 1]</option>
                </select>
              </div>

              {/* 2. RQD Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>2. RQD (Rock Quality Designation)</span>
                  <span className="text-[#9A3412] font-mono">
                    RQD: {rqdValue}% &rarr; Rating: {rqdRating}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rqdValue}
                  onChange={(e) => setRqdValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#9A3412]"
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
                  <span className="text-[#9A3412] font-mono">Rating: {disspacing}</span>
                </label>
                <select
                  value={disspacing}
                  onChange={(e) => setDisspacing(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412] transition-colors"
                >
                  <option value={20}>&gt;2 m [Rating: 20]</option>
                  <option value={15}>0.6 - 2 m [Rating: 15]</option>
                  <option value={10}>200 - 600 mm [Rating: 10]</option>
                  <option value={8}>60 - 200 mm [Rating: 8]</option>
                  <option value={5}>&lt;60 mm [Rating: 5]</option>
                </select>
              </div>

              {/* 4. Condition of Discontinuities */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>4. Condition of Discontinuities</span>
                  <span className="text-[#9A3412] font-mono">Rating: {condition}</span>
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412] transition-colors"
                >
                  <option value={30}>Very Rough, unweathered, tightly closed [Rating: 30]</option>
                  <option value={22}>Slightly Rough, apertures &lt;1mm, weathered [Rating: 22]</option>
                  <option value={12}>Smooth joints, apertures 1-5mm, clay fillings [Rating: 12]</option>
                  <option value={0}>Slickensided joints, open &gt;5mm, continuous gouge [Rating: 0]</option>
                </select>
              </div>

              {/* 5. Groundwater */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-mono font-bold text-slate-700">
                  <span>5. Groundwater Conditions</span>
                  <span className="text-[#9A3412] font-mono">Rating: {groundwater}</span>
                </label>
                <select
                  value={groundwater}
                  onChange={(e) => setGroundwater(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 hover:border-slate-300 rounded font-mono text-sm outline-none bg-slate-50 focus:border-[#9A3412] focus:ring-1 focus:ring-[#9A3412] transition-colors"
                >
                  <option value={15}>Completely Dry [Rating: 15]</option>
                  <option value={10}>Damp (minor inflows) [Rating: 10]</option>
                  <option value={7}>Wet (joint water pressure) [Rating: 7]</option>
                  <option value={0}>Flowing / Dripping [Rating: 0]</option>
                </select>
              </div>

            </div>

            {/* Output Display Panel (Right) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-xs h-full flex flex-col justify-between">
              
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#9A3412] rounded-full" />
                  Calculated Results
                </h3>

                {/* Dynamically Styled RMR Score */}
                <div className="text-center py-6 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <span className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    TOTAL RMR SCORE
                  </span>
                  <span className="block text-6xl font-extrabold text-[#9A3412]">
                    {totalRmrScore}
                  </span>
                  <span className="block text-xs font-mono text-slate-500">
                    out of 100 points
                  </span>
                </div>

                {/* Rock Class Badge */}
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

              {/* RMR Specifications Table */}
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
                      <tr className={totalRmrScore >= 81 ? 'text-[#9A3412] font-bold bg-[#9A3412]/5' : ''}>
                        <td className="py-1">81 – 100</td>
                        <td>Class I</td>
                        <td>Very Good Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 61 && totalRmrScore <= 80) ? 'text-[#9A3412] font-bold bg-[#9A3412]/5' : ''}>
                        <td className="py-1">61 – 80</td>
                        <td>Class II</td>
                        <td>Good Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 41 && totalRmrScore <= 60) ? 'text-[#9A3412] font-bold bg-[#9A3412]/5' : ''}>
                        <td className="py-1">41 – 60</td>
                        <td>Class III</td>
                        <td>Fair Rock</td>
                      </tr>
                      <tr className={(totalRmrScore >= 21 && totalRmrScore <= 40) ? 'text-[#9A3412] font-bold bg-[#9A3412]/5' : ''}>
                        <td className="py-1">21 – 40</td>
                        <td>Class IV</td>
                        <td>Poor Rock</td>
                      </tr>
                      <tr className={totalRmrScore < 21 ? 'text-[#9A3412] font-bold bg-[#9A3412]/5' : ''}>
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

      {/* Academic & Experience Timeline Section */}
      <section id="timeline" className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-xs font-mono font-bold text-[#9A3412] uppercase tracking-wider">
            04. Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Academic & Experience Timeline
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mt-1 font-mono">
            Click on any milestone event to view detailed geological achievements.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Nodes Navigation (Left) */}
          <div className="lg:col-span-5 relative space-y-4">
            {/* Vertical connector line */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200 pointer-events-none" />

            {timelineData.map((event, idx) => {
              const isActive = selectedTimelineIdx === idx
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTimelineIdx(idx)}
                  className={`w-full flex gap-4 text-left p-3.5 rounded-lg border transition-all cursor-pointer relative z-10 ${
                    isActive
                      ? 'bg-white border-[#9A3412] shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-white/40'
                  }`}
                >
                  {/* Indicator Node */}
                  <div className="mt-1">
                    <span className={`w-3 h-3 rounded-full flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-[#9A3412] ring-4 ring-[#9A3412]/10' 
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`} />
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono font-bold text-[#9A3412]">
                      {event.period}
                    </span>
                    <h3 className={`font-bold font-mono text-sm sm:text-base leading-tight transition-colors ${
                      isActive ? 'text-slate-950' : 'text-slate-700'
                    }`}>
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold leading-none">
                      {event.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Milestone Card (Right) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 min-h-[300px] flex flex-col justify-between shadow-xs animate-in fade-in duration-200">
            
            <div className="space-y-5 text-left">
              {/* Card Title Header */}
              <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-3.5">
                <div>
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 mb-1.5">
                    {timelineData[selectedTimelineIdx].category === 'academic' ? 'ACADEMICS' : 'EXPERIENCE'}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 font-mono leading-snug">
                    {timelineData[selectedTimelineIdx].title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {timelineData[selectedTimelineIdx].subtitle}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 font-semibold text-right shrink-0">
                  {timelineData[selectedTimelineIdx].period}
                </span>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3">
                {timelineData[selectedTimelineIdx].bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed items-start">
                    <span className="text-[#9A3412] mt-1 shrink-0 font-bold">&rarr;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-50 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>UP Dept of Geology</span>
              <span>Engineering Geology Unit</span>
            </div>

          </div>

        </div>

      </section>

      {/* Styled Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="block font-bold text-slate-900 text-sm font-mono leading-none">
              Wicus Olivier
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wide mt-1">
              Engineering & Environmental Geology Student
            </span>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase font-bold tracking-wider">
            <button onClick={() => scrollToSection('hero')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Skills
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Projects
            </button>
            <button onClick={() => scrollToSection('rmr-calculator')} className="hover:text-slate-900 transition-colors cursor-pointer">
              RMR Calculator
            </button>
            <button onClick={() => scrollToSection('timeline')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Timeline
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
