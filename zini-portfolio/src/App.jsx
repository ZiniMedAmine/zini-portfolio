import './index.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import Contact from './components/Contact_new'

import skepticLogo from './assets/Skeptic.webp'
import spacePlanetArt from './assets/Space_Planet_Art.webp'
import spaceDoodleArt from './assets/Space_doodle_artwork.webp'
import bipolarArt from './assets/bipolar_disorder_digital_art.webp'
import mementoMori from './assets/Memento_mori.webp'
import fightClub from './assets/FightClub.webp'
import curiositySkeptic from './assets/curiositykillstheskeptic.webp'
import tunisiaFront from './assets/Tunisia_Front.webp'
import tunisiaBack from './assets/Tunisia_Back.webp'
import hegelsHotel from './assets/Hegels_hotel_california.webp'
import skepticLogo1 from './assets/skeptic_logo_1.webp'
import skepticLogo2 from './assets/skeptic_logo_2.webp'
import skepticLogo3 from './assets/skeptic_logo_3.webp'
import deadWelder from './assets/The_dead_welder.webp'
import bioaura from './assets/bioaura.webp'
import todo1 from './assets/todo1.webp'
import todo2 from './assets/todo2.webp'
import flyer1 from './assets/F1.webp'
import flyer2 from './assets/F2.webp'
import flyer3 from './assets/F3.webp'
import flyer4 from './assets/F4.webp'
import skepticTshirt from './assets/skepticTshirt.webp'
import kant1 from './assets/Kant1.webp'
import kant2 from './assets/Kant2.webp'
import cogito from './assets/Cogito.webp'
import problemImage from './assets/problem.webp'
import dermaIn from './assets/derma-in.webp'
import jradBeauty from './assets/jradbeauty.webp'
import ttWebsite from './assets/TTWebsite.webp'
import invoiceScan from './assets/InvoiceScan.webp'
import reactCalculator from './assets/reactcalculator.webp'
import portfolioWebsite from './assets/portfoliowebsite.webp'
import umfiasi from './assets/umfiasi.webp'
import zanzibarExplore from './assets/ZanzibarExplore.webp'
import dataAnalysisProj from './assets/dataanalysisproj.webp'
import colorQuantization from './assets/colorquantization.webp'
import ResumeCandy from './assets/cv_content_screenshot.webp'

const socials = [
  ['GitHub', '@ZiniMedAmine', 'https://github.com/ZiniMedAmine'],
  ['Email', 'zini.m.amine@gmail.com', 'mailto:zini.m.amine@gmail.com'],
  ['Behance', '@zinimedamine', 'https://www.behance.net/zinimedamine'],
]

const skills = [
  {
    idx: '01 / 04',
    title: 'Web development',
    desc: 'Responsive interfaces, production websites, and full-stack web apps across React, Angular, Django, WordPress, and the MERN stack.',
    tools: ['HTML/CSS', 'JavaScript', 'ReactJS', 'AngularJS', 'Django', 'Bootstrap', 'TailwindCSS', 'NodeJS', 'Express JS', 'MongoDB'],
  },
  {
    idx: '02 / 04',
    title: 'Programming languages',
    desc: 'A practical engineering base for solving product, automation, data, and backend problems with clean logic.',
    tools: ['C', 'Java', 'JavaScript', 'Python', 'SQL'],
  },
  {
    idx: '03 / 04',
    title: 'Software engineering',
    desc: 'API thinking, database modeling, maintainable components, debugging, and shipping useful systems end to end.',
    tools: ['REST API', 'MongoDB', 'SQL', 'OCR', 'OpenCV', 'Prompt Engineering', 'Git'],
  },
  {
    idx: '04 / 04',
    title: 'Graphic design',
    desc: 'A strong visual layer for developer work: brand identities, posters, UI direction, social content, and typography systems.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva', 'Brand design'],
  },
]

const experiences = [
  {
    year: '2026',
    role: 'Software Engineering Intern',
    company: 'Proxym-IT',
    type: 'Intern',
    desc: 'Developed AI-powered modules for a car insurance application, including document OCR, license plate recognition, and vehicle damage detection and severity assessment.',
    stack: ['Python', 'OCR', 'Computer Vision', 'AI', 'Docker', ''],
    wins: ['CV & document extraction', 'License plate recognition', 'Damage detection'],
  },
  {
    year: '2024 - 2026',
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    type: 'Freelance',
    desc: 'Developing responsive websites and web applications using modern technologies including React, WordPress, and MERN stack. Delivering custom solutions for clients across different industries.',
    stack: ['React', 'WordPress', 'MERN Stack', 'SEO', 'Responsive UI'],
    wins: ['Custom websites', 'Client delivery', 'Performance-minded builds'],
  },
  {
    year: '2023 - 2024',
    role: 'Freelance Graphic Designer',
    company: 'Self-Employed',
    type: 'Freelance',
    desc: 'Created brand identities, managed social media content, and launched TeePublic store with 50+ designs for international clients. Focused on building cohesive brand experiences across digital platforms.',
    stack: ['Photoshop', 'Illustrator', 'Figma', 'Brand Identity', 'Social Media'],
    wins: ['50+ designs', 'Brand systems', 'International clients'],
  },
  {
    year: '2024',
    role: 'Bachelor Graduation Intern',
    company: 'GOMYCODE',
    type: 'Intern',
    desc: 'Built InvoiceScan+, a document scanning and extraction platform using Django, OCR, OpenCV, Tesseract, and Gemini prompt engineering.',
    stack: ['Django', 'Python', 'OCR', 'OpenCV', 'Gemini'],
    wins: ['AI document extraction', 'REST API', 'Graduation project'],
  },
  {
    year: '2023',
    role: 'Web Development Intern',
    company: 'Tunisie Telecom',
    type: 'Intern',
    desc: 'Built a social activity management website using the MERN Stack in a collaborative team environment. Gained experience in enterprise-level development and teamwork.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'Teamwork'],
    wins: ['MERN application', 'Enterprise experience', 'Collaborative delivery'],
  },
]

const designProjects = [
  {
    title: 'Space Planet Art',
    description: 'Digital artwork featuring some planets along with doodle simple details and space elements with vibrant colors and artistic flair.',
    tag: 'Illustration',
    year: '2026',
    role: 'Illustration',
    output: 'Digital artwork',
    url: 'https://www.behance.net/gallery/249934987/Space-Planet-illustration',
    images: [spacePlanetArt],
  },
  {
    title: 'Space Doodle Artwork',
    description: 'Creative space-themed doodle illustration.',
    tag: 'Illustration',
    year: '2024',
    role: 'Illustration',
    output: 'Digital artwork',
    url: 'https://www.behance.net/gallery/249935263/Doodle-Space-Illustration',
    images: [spaceDoodleArt],
  },
  {
    title: 'Bipolar Disorder Digital Art',
    description: 'Expressive digital artwork Illustrating the inner-experience of people with bipolar disorder.',
    tag: 'Digital Art',
    year: '2025',
    role: 'Concept, design',
    output: 'Poster artwork',
    url: 'https://www.behance.net/gallery/249935705/Bipolar-Disorder-Surreal-Digital-Art',
    images: [bipolarArt],
  },
  {
    title: 'Memento Mori - تذكر أنك ميت',
    description: 'Digital art piece inspired by the Meditations of Marcus Aurelius, beautifully mixing arabic & latin letters, about the philosophical concept of mortality and the reminder to live meaningfully.',
    tag: 'Digital Art',
    year: '2025',
    role: 'Typography, art',
    output: 'Poster artwork',
    url: 'https://www.behance.net/gallery/249936043/Memento-Mori',
    images: [mementoMori],
  },
  {
    title: 'Fight Club Poster',
    description: "Movie poster design exploring the film's philosophy of anti-consumerism, freedom from material chains, and breaking societal norms through bold visual metaphors.",
    tag: 'Digital Art',
    year: '2025',
    role: 'Poster design',
    output: 'Movie poster',
    url: 'https://www.behance.net/gallery/249936477/Fight-Club-Digital-Art',
    images: [fightClub],
  },
  {
    title: 'Curiosity Kills the Skeptic',
    description: 'Deep philosophical poster exploring the paradox between intellectual curiosity and skeptical doubt, questioning whether the pursuit of knowledge ultimately challenges our protective skepticism.',
    tag: 'Digital Art',
    year: '2025',
    role: 'Concept, design',
    output: 'Poster artwork',
    url: 'https://www.behance.net/gallery/249936735/Curiosity-Kills-The-Skeptic-Digital-Art',
    images: [curiositySkeptic],
  },
  {
    title: 'The Quantum Society',
    description: 'Conceptual design project exploring quantum theory as a metaphor for modern society, featuring front and back compositions that represent different perspectives of social complexity.',
    tag: 'Digital Art',
    year: '2025',
    role: 'Concept, design',
    output: 'Two-sided poster',
    url: 'https://www.behance.net/gallery/249936213/Tunisia-The-Quantum-Society-Digital-Art',
    images: [tunisiaFront, tunisiaBack],
  },
  {
    title: "Hegel's Hotel California",
    description: "Philosophical cover art reimagining the Eagles' classic album with Hegel's dialectical thinking, featuring the text 'such a lovely place for a contradiction' - merging rock culture with German idealism.",
    tag: 'Digital Art',
    year: '2025',
    role: 'Cover, type',
    output: 'Album rework',
    url: 'https://www.behance.net/gallery/249936937/Hegels-Hotel-California-Cover-Art',
    images: [hegelsHotel],
  },
  {
    title: 'Skeptic Brand Identity',
    description: "Logo design variations for my philosophical brand 'Skeptic', exploring different visual approaches to represent critical thinking, questioning, and intellectual curiosity through typography and symbolic elements.",
    tag: 'Brand Identity',
    year: '2024',
    role: 'Identity design',
    output: 'Logo system',
    url: 'https://www.behance.net/gallery/249937033/Skeptic-Logo-Design-Brand-Identity',
    images: [skepticLogo3, skepticLogo2, skepticLogo1, skepticLogo],
  },
  {
    title: 'The Dead Welder',
    description: 'Brand identity and logo design for a welder content creator, combining industrial aesthetics with edgy typography to create a memorable brand that reflects the raw, skilled nature of welding craftsmanship.',
    tag: 'Brand Identity',
    year: '2024',
    role: 'Identity design',
    output: 'Logo design',
    url: 'https://www.behance.net/gallery/249937149/The-Dead-Welder-Logo-Design-Branding',
    images: [deadWelder],
  },
  {
    title: 'BioAura Cosmetics',
    description: 'Brand identity and logo design for BioAura Cosmetics, creating an elegant and organic visual identity that emphasizes natural beauty, wellness, and the harmonious connection between biology and personal care.',
    tag: 'Brand Identity',
    year: '2024',
    role: 'Identity design',
    output: 'Cosmetics brand',
    url: 'https://www.behance.net/gallery/249938017/BioAura-Cosmetics-Logo-Brand-Design',
    images: [bioaura],
  },
  {
    title: 'Todo Notebook Covers',
    description: 'Two cover designs for todo notebooks created for a small business, featuring clean layouts and motivational aesthetics to inspire productivity and organization for everyday task management.',
    tag: 'Print Design',
    year: '2025',
    role: 'Print design',
    output: 'Notebook covers',
    url: 'https://www.behance.net/gallery/249938287/Notebook-Cover-Design',
    images: [todo1, todo2],
  },
  {
    title: 'Derma-In Laboratory Flyers',
    description: 'Marketing flyer designs for Derma-In laboratory, showcasing their sun protection products and natural oils collection. Clean, professional layouts emphasizing the scientific quality and natural benefits of their skincare solutions.',
    tag: 'Print Design',
    year: '2026',
    role: 'Marketing design',
    output: 'Flyer series',
    url: 'https://www.behance.net/gallery/249938553/Derma-In-Laboratory-Flyer-Design',
    images: [flyer1, flyer2, flyer3, flyer4],
  },
  {
    title: 'Skeptic T-Shirt Designs',
    description: 'Philosophical t-shirt designs available on TeePublic, featuring thought-provoking concepts from great philosophers like Kant, Descartes, and original Skeptic brand artwork that challenges conventional thinking.',
    tag: 'T-Shirt Design',
    year: '2024 - 2026',
    role: 'Apparel design',
    output: 'TeePublic store',
    url: 'https://www.teepublic.com/user/skeptic-styles',
    cta: 'Shop on TeePublic',
    images: [skepticTshirt, kant1, kant2, cogito, problemImage],
  },
]

const devProjects = [
  {
    title: 'ResumeCandy – Resume Versioning Engine',
    description: 'A modern web application designed to help users create, manage, and version multiple resumes. Built with multilingual and RTL support, customizable templates, and ATS-friendly PDF export.',
    tag: 'Next.js',
    year: '2026',
    role: 'Design, build',
    output: 'Resume management platform',
    image: ResumeCandy,
    url: 'https://github.com/ZiniMedAmine/ResumeCandy',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Derma-In E-commerce Website',
    description: 'A functional & responsive E-commerce website for derma-in laboratory, created using wordpress. Designed to help the company manage its orders and products through a user-friendly UI.',
    tag: 'WordPress',
    year: '2026',
    role: 'Design, build',
    output: 'E-commerce site',
    image: dermaIn,
    url: 'https://www.derma-in.com',
    tech: ['Wordpress', 'Elementor', 'Woocommerce', 'PHP', 'SEO', 'YoastSEO'],
  },
  {
    title: 'Jrad Beauty Center Blog Website',
    description: 'A responsive wordpress blog website for Jrad Beauty Center that helps the clients get to know the project and better reach it through a user-friendly and minimalist UI.',
    tag: 'WordPress',
    year: '2026',
    role: 'Design, build',
    output: 'Blog website',
    image: jradBeauty,
    url: 'https://jradbeautycenter.tn/',
    tech: ['Wordpress', 'Elementor', 'PHP', 'SEO', 'RankMath'],
  },
  {
    title: 'Tunisie Telecom Social Activity Management Website',
    description: 'A website for Tunisie Telecom, which is a website that manages social activities, accounts and offers of Tunisie Telecom Employees developed using MERN Stack.',
    tag: 'MERN Stack',
    year: '2024',
    role: 'Full-stack dev',
    output: 'Internal web app',
    image: ttWebsite,
    url: 'https://github.com/ZiniMedAmine/TTApp',
    tech: ['HTML/CSS', 'React', 'Express JS', 'MongoDB', 'NodeJS'],
  },
  {
    title: 'InvoiceScan+',
    description: 'A website through which the user can scan any document image and get the relevant data and the document type in a useable JSON, Word or PDF file within seconds.',
    tag: 'Django/AI Web',
    year: '2024',
    role: 'Full-stack dev',
    output: 'AI document app',
    image: invoiceScan,
    url: 'https://github.com/ZiniMedAmine/InvoiceScan',
    tech: ['Python', 'Django', 'REST API', 'OCR', 'OpenCV', 'Tesserract', 'Prompt Engineering', 'Gemini'],
  },
  {
    title: 'React Calculator',
    description: "A simple react calculator developed purely for the purpose of learning and mastering TailwindCSS, found it a good idea in ters of learning to use tailwind's grid system, dark & light theme control and other features of it at that time.",
    tag: 'React',
    year: '2024',
    role: 'Frontend dev',
    output: 'Learning project',
    image: reactCalculator,
    url: 'https://github.com/ZiniMedAmine/React-Calculator',
    tech: ['React', 'NodeJS', 'TailwindCSS'],
  },
  {
    title: 'My Portfolio Website',
    description: 'Explore my personal React portfolio, where I bring creativity and code together-showcasing my graphic design projects, web development work, professional experience, and ways to connect.',
    tag: 'React',
    year: '2026',
    role: 'Design, build',
    output: 'Portfolio site',
    image: portfolioWebsite,
    url: '#home',
    tech: ['React', 'NodeJS'],
  },
  {
    title: 'Medical Exam Simulation Platform',
    description: 'A responsive MERN Stack platform for French-speaking UMF Iasi medical students that simulates exams with randomized questions and exact grading algorithms, helping them practice and prepare effectively.',
    tag: 'MERN Stack',
    year: '2026',
    role: 'Full-stack dev',
    output: 'Exam platform',
    image: umfiasi,
    url: 'https://80umfiasi.me',
    tech: ['React', 'NodeJS', 'ExpressJS', 'MongoDB'],
  },
  {
    title: 'ZanzibarExplore',
    description: 'A WordPress business website for a Zanzibar client where visitors can book activities and excursions. Built to highlight experiences and make inquiries fast on mobile and desktop.',
    tag: 'WordPress',
    year: '2026',
    role: 'WordPress dev',
    output: 'Booking website',
    image: zanzibarExplore,
    url: 'https://zanzibarexplore.com',
    tech: ['Wordpress', 'Elementor', 'Bookings', 'SEO'],
  },
  {
    title: 'Sales Data Analysis Mini Project',
    description: 'A compact data analysis project that explores sales performance and patterns using Python, with clear visual summaries and insights.',
    tag: 'Data Analysis',
    year: '2025',
    role: 'Data analysis',
    output: 'Python project',
    image: dataAnalysisProj,
    url: 'https://github.com/ZiniMedAmine/Sales-Data-Analysis-Mini-Project',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
  },
  {
    title: 'K-Means Color Quantization Mini Project',
    description: 'An image processing mini project that reduces color palettes using K-Means clustering for cleaner, stylized visuals.',
    tag: 'Computer Vision',
    year: '2025',
    role: 'Computer vision',
    output: 'Python project',
    image: colorQuantization,
    url: 'https://github.com/ZiniMedAmine/KMEANS_Color_Quantization',
    tech: ['Python', 'K-Means', 'OpenCV', 'Image Processing'],
  },
]

function usePortfolioInteractions() {
  useEffect(() => {
    const progress = document.querySelector('.scroll-progress')
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`)
    }

    const reveals = document.querySelectorAll('.reveal, .reveal-stagger')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    reveals.forEach((el) => revealObserver.observe(el))

    const links = [...document.querySelectorAll('.nav a[href^="#"]')]
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean)
    const updateNav = () => {
      const probe = window.scrollY + window.innerHeight * 0.35
      const active = sections.reduce((current, section) => section.offsetTop <= probe ? section : current, sections[0])
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${active?.id}`))
      updateProgress()
    }

    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let frame = 0
    const onMouseMove = (event) => {
      mx = event.clientX
      my = event.clientY
      dot?.style.setProperty('transform', `translate(${mx}px, ${my}px) translate(-50%, -50%)`)
    }
    const cursorLoop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring?.style.setProperty('transform', `translate(${rx}px, ${ry}px) translate(-50%, -50%)`)
      frame = requestAnimationFrame(cursorLoop)
    }
    const cursorHover = (event) => {
      if (event.target.closest('a, button, input, textarea, .playground, [data-hover]')) ring?.classList.add('is-hover')
    }
    const cursorOut = (event) => {
      if (!event.relatedTarget?.closest?.('a, button, input, textarea, .playground, [data-hover]')) ring?.classList.remove('is-hover')
    }

    const cards = document.querySelectorAll('[data-hover]')
    const onSpotlight = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    cards.forEach((card) => card.addEventListener('mousemove', onSpotlight))

    const stage = document.querySelector('.playground .stage')
    const playground = document.querySelector('.playground')
    let rotX = -15
    let rotY = 0
    let targetX = -15
    let targetY = 0
    let velocityX = 0
    let velocityY = 0.04
    let dragging = false
    let lastX = 0
    let lastY = 0
    let playFrame = 0
    const playLoop = () => {
      if (!dragging) {
        targetX += velocityX
        targetY += velocityY
        velocityX *= 0.98
        velocityY *= 0.98
      }
      rotX += (targetX - rotX) * 0.12
      rotY += (targetY - rotY) * 0.12
      stage?.style.setProperty('transform', `rotateX(${rotX}deg) rotateY(${rotY}deg)`)
      playFrame = requestAnimationFrame(playLoop)
    }
    const pointerDown = (event) => {
      dragging = true
      const point = event.touches?.[0] || event
      lastX = point.clientX
      lastY = point.clientY
      velocityX = 0
      velocityY = 0
      ring?.classList.add('is-drag')
    }
    const pointerMove = (event) => {
      if (!dragging) return
      const point = event.touches?.[0] || event
      const dx = point.clientX - lastX
      const dy = point.clientY - lastY
      targetY += dx * 0.45
      targetX = Math.max(-85, Math.min(85, targetX - dy * 0.45))
      velocityY = dx * 0.18
      velocityX = -dy * 0.18
      lastX = point.clientX
      lastY = point.clientY
      event.preventDefault()
    }
    const pointerUp = () => {
      dragging = false
      ring?.classList.remove('is-drag')
    }

    window.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', cursorHover)
    window.addEventListener('mouseout', cursorOut)
    playground?.addEventListener('mousedown', pointerDown)
    playground?.addEventListener('touchstart', pointerDown, { passive: false })
    window.addEventListener('mousemove', pointerMove, { passive: false })
    window.addEventListener('touchmove', pointerMove, { passive: false })
    window.addEventListener('mouseup', pointerUp)
    window.addEventListener('touchend', pointerUp)
    frame = requestAnimationFrame(cursorLoop)
    playFrame = requestAnimationFrame(playLoop)
    updateNav()

    return () => {
      window.removeEventListener('scroll', updateNav)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', cursorHover)
      window.removeEventListener('mouseout', cursorOut)
      playground?.removeEventListener('mousedown', pointerDown)
      playground?.removeEventListener('touchstart', pointerDown)
      window.removeEventListener('mousemove', pointerMove)
      window.removeEventListener('touchmove', pointerMove)
      window.removeEventListener('mouseup', pointerUp)
      window.removeEventListener('touchend', pointerUp)
      cards.forEach((card) => card.removeEventListener('mousemove', onSpotlight))
      cancelAnimationFrame(frame)
      cancelAnimationFrame(playFrame)
      revealObserver.disconnect()
    }
  }, [])
}

function HeroPlayground() {
  const particles = useMemo(() => [
    ['15deg', '38%', '8px', '#19E9FF'], ['80deg', '38%', '5px', '#8A5BFF'],
    ['145deg', '38%', '7px', '#2EFFB0'], ['220deg', '38%', '4px', '#19E9FF'],
    ['310deg', '38%', '9px', '#8A5BFF'], ['40deg', '46%', '3px', '#ffffff'],
    ['120deg', '46%', '4px', '#ffffff'], ['200deg', '46%', '3px', '#19E9FF'],
    ['280deg', '46%', '5px', '#ffffff'], ['60deg', '30%', '4px', '#2EFFB0'],
    ['240deg', '30%', '4px', '#8A5BFF'],
  ], [])

  return (
    <div className="playground" data-hover aria-label="Drag to spin the hero orbit">
      <div className="stage">
        <svg className="arc-label spin-1" viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="arc-a" d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" /></defs>
          <text><textPath href="#arc-a">software engineer x web developer - frontend - backend </textPath></text>
        </svg>
        <svg className="arc-label spin-2" viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="arc-b" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
          <text><textPath href="#arc-b">build useful systems - ship clean interfaces - solve real problems -</textPath></text>
        </svg>
        <div className="ring r4" />
        <div className="ring r3" />
        <div className="ring r2" />
        <div className="ring r1" />
        {particles.map(([a, r, s, c]) => (
          <div key={`${a}-${r}`} className="particle" style={{ '--a': a, '--r': r, '--s': s, '--c': c }} />
        ))}
        <div className="core" />
      </div>
      <div className="hint"><span className="key">↵</span><span>Drag to spin</span></div>
    </div>
  )
}

function WorkShowcase({ id, eyebrow, title, subtitle, projects, type, number, note }) {
  const [openProject, setOpenProject] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const countRef = useRef(null)
  const panels = projects.length + 1

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const maxScroll = wrap.offsetHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0
      track.style.transform = `translate3d(${-((panels - 1) * window.innerWidth) * progress}px, 0, 0)`
      if (fillRef.current) fillRef.current.style.width = `${progress * 100}%`
      if (countRef.current) {
        const current = Math.min(panels - 1, Math.max(0, Math.floor(progress * (panels - 1) + 0.05)))
        countRef.current.textContent = String(current).padStart(2, '0')
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [panels])

  const open = (project) => {
    setOpenProject(project)
    setImageIndex(0)
  }

  const activeImages = openProject?.images || [openProject?.image].filter(Boolean)

  return (
    <section
      id={id}
      className={`work-wrap ${type}-work`}
      data-screen-label={eyebrow}
      ref={wrapRef}
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="work-sticky">
        <div className="work-track" ref={trackRef}>
          <div className="work-intro">
            <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{eyebrow}</span></p>
            <div className="titleblock">
              <h2>{title}<span className="grad"> work</span><em>{subtitle}</em></h2>
              {note && <p className="work-note">{note}</p>}
            </div>
            <div className="meta-row">
              <div className="count">{projects.length} projects - {type === 'design' ? 'visual systems & art' : 'websites & applications'}</div>
              <div className="swipe"><span>Scroll right</span><span className="arrow" /></div>
            </div>
          </div>

          {projects.map((project, index) => (
            <article
              className={`project ${index % 2 ? 'alt' : ''}`}
              key={project.title}
              onClick={() => open(project)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') open(project)
              }}
              role="button"
              tabIndex={0}
              data-hover
            >
              <div className="project-media">
                <span className="number">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                <img src={project.images?.[0] || project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-info">
                <span className="kind">{project.tag} - {project.year}</span>
                <h3>{project.title.split(' ').slice(0, -1).join(' ') || project.title} <em>{project.title.split(' ').slice(-1)}</em></h3>
                <p>{project.description}</p>
                <div className="specs">
                  <div className="spec"><div className="label">Role</div><div className="value">{project.role}</div></div>
                  <div className="spec"><div className="label">Year</div><div className="value">{project.year}</div></div>
                  <div className="spec"><div className="label">Output</div><div className="value">{project.output}</div></div>
                </div>
                {project.tech && (
                  <div className="tools compact">
                    {project.tech.map((tech) => <span className="tool" key={tech}>{tech}</span>)}
                  </div>
                )}
                <div className="project-actions" onClick={(event) => event.stopPropagation()}>
                  <button className="link" onClick={() => open(project)}>Open case <span className="arrow" /></button>
                  {project.url && <a className="link" href={project.url} target={project.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{project.cta || (type === 'design' ? 'View on Behance' : 'View project')} <span className="arrow" /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="work-progress" aria-hidden="true">
          <span className="label">P - <span data-work-count ref={countRef}>00</span> / {String(panels - 1).padStart(2, '0')}</span>
          <span className="bar"><span className="fill" ref={fillRef} /></span>
          <span className="label">Scroll to advance</span>
        </div>
      </div>

      {openProject && (
        <div className="modal-backdrop" onClick={() => setOpenProject(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenProject(null)} aria-label="Close project">×</button>
            <div className="modal-media">
              <img src={activeImages[imageIndex]} alt={openProject.title} />
              {activeImages.length > 1 && (
                <div className="modal-arrows">
                  <button onClick={() => setImageIndex((imageIndex - 1 + activeImages.length) % activeImages.length)}>‹</button>
                  <button onClick={() => setImageIndex((imageIndex + 1) % activeImages.length)}>›</button>
                </div>
              )}
            </div>
            <div className="modal-body">
              <span className="kind">{openProject.tag} - {openProject.year}</span>
              <h3>{openProject.title}</h3>
              <p>{openProject.description}</p>
              {openProject.tech && <div className="tools compact">{openProject.tech.map((tech) => <span className="tool" key={tech}>{tech}</span>)}</div>}
              {openProject.url && <a className="link" href={openProject.url} target={openProject.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{openProject.cta || 'Open project'} <span className="arrow" /></a>}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function App() {
  usePortfolioInteractions()
  const year = new Date().getFullYear()

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <nav className="nav" data-screen-label="00 Nav">
        <a href="#home" className="brand">
          <span className="mark"><img src={skepticLogo} alt="Zini logomark" /></span>
          <span className="name">Zini</span>
          <span className="meta">software & web</span>
        </a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#expertise">Expertise</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#dev-work">Dev</a></li>
          <li><a href="#design-work">Design</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="availability"><span className="dot" /><span>Available - Q3 '26</span></div>
      </nav>

      <main>
        <section id="home" className="section hero" data-screen-label="01 Hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal-stagger is-in">
              <p className="eyebrow"><span className="num">01</span><span className="line" /><span>Portfolio - 2026 edition</span></p>
              <h1>
                <span className="split-line"><span>Mohamed</span></span>
                <span className="split-line"><span>Amine Zini<span className="it">,</span></span></span>
                <span className="split-line"><span className="grad">software engineer</span></span>
                <span className="split-line"><span className="it">& Graphic Designer.</span></span>
              </h1>
              <div className="role">
                <span className="line" />
                <span>Currently</span>
                <span className="now"><span className="now-track"><span>building web applications</span><span>engineering product interfaces</span><span>designing useful systems</span><span>building web applications</span></span></span>
              </div>
              <p className="lede hero-lede">I build responsive web applications and production websites with a designer's eye for detail, turning product ideas into clean, usable, and scalable digital experiences.</p>
              <div className="hero-meta">
                <div className="item"><div className="label">Based</div><div className="value">Tunis, TN - UTC+1</div></div>
                <div className="item"><div className="label">Discipline</div><div className="value">Software - Web - UI</div></div>
                <div className="item"><div className="label">Status</div><div className="value">Open - Freelance</div></div>
              </div>
            </div>
            <HeroPlayground />
          </div>
          <div className="container hero-foot">
            <span>© Zini studio - {year}</span>
            <a href="#about" className="scrolldown"><span>Scroll to explore</span><span className="arrow" /></a>
            <span>v 2.0</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {['Software engineering', 'Web development', 'React', 'MERN stack', 'Django', 'WordPress', 'Frontend', 'APIs', 'UI engineering', 'Data analysis', 'Brand design', 'Visual systems'].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section id="about" className="section about" data-screen-label="02 About">
          <div className="container about-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">02</span><span className="line" /><span>About</span></p>
              <h2>A software-first <em>practice</em> from Tunisia.</h2>
            </div>
            <div className="about-body reveal">
              <p className="lede">I engineer the product, then make sure the interface feels sharp.</p>
              <p>I'm Mohamed Amine, a <strong>Software Engineering</strong> student and <strong>Web Developer</strong> focused on building practical, responsive, and maintainable digital products.</p>
              <p>My strongest work lives where frontend detail meets backend logic: React interfaces, WordPress business sites, MERN applications, Django tools, OCR workflows, and data-driven mini projects. Design is still part of my edge, but the hierarchy is code, product, and usable systems first.</p>
              <p>Because I also come from graphic design, I can ship websites that do more than function. I care about structure, performance, clarity, and the visual decisions that make software easier to trust and use.</p>
            </div>
          </div>
          <div className="container about-stats reveal-stagger">
            <div className="stat"><div className="num">3<span className="unit"> yrs</span></div><div className="label">Experience</div></div>
            <div className="stat"><div className="num">10+</div><div className="label">Dev projects</div></div>
            <div className="stat"><div className="num">15+</div><div className="label">Clients served</div></div>
            <div className="stat"><div className="num">50+</div><div className="label">Design assets</div></div>
          </div>
        </section>

        <section id="expertise" className="section expertise" data-screen-label="03 Expertise">
          <div className="container expertise-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">03</span><span className="line" /><span>Expertise</span></p>
              <h2>What I do <em>best.</em></h2>
            </div>
            <div>
              {skills.map((skill) => (
                <div className="discipline reveal" key={skill.title}>
                  <span className="idx">{skill.idx}</span>
                  <div>
                    <h3>{skill.title}</h3>
                    <p className="desc">{skill.desc}</p>
                    <div className="tools">{skill.tools.map((tool) => <span className="tool" key={tool}>{tool}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section experience" data-screen-label="04 Experience">
          <div className="container experience-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">04</span><span className="line" /><span>Experience</span></p>
              <h2>Professional <em>timeline.</em></h2>
            </div>
            <div className="timeline">
              {experiences.map((item) => (
                <article className="experience-card reveal" key={`${item.year}-${item.role}`}>
                  <span className="idx">{item.year}</span>
                  <div className="experience-main">
                    <div className="experience-top">
                      <div>
                        <span className="kind">{item.company} - {item.type}</span>
                        <h3>{item.role}</h3>
                      </div>
                      <span className="role-type">{item.type}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="tools compact">{item.stack.map((tech) => <span className="tool" key={tech}>{tech}</span>)}</div>
                    <div className="wins">{item.wins.map((win) => <span key={win}>{win}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WorkShowcase
          id="dev-work"
          eyebrow="Development work"
          title="Development"
          subtitle="all software projects."
          projects={devProjects}
          type="dev"
          number="05"
          note="Note: if a link does not work, the client probably did not pay for his hosting fees."
        />
        <WorkShowcase
          id="design-work"
          eyebrow="Design work"
          title="Design"
          subtitle="all visual projects."
          projects={designProjects}
          type="design"
          number="06"
          note="Note: sorry if a Behance link does not work. I am currently having trouble with my Behance account."
        />

        <Contact socials={socials} />
      </main>

      <footer className="footer" data-screen-label="Footer">
        <div className="footer-grid">
          <div className="signoff">Designed & built<br /><em>in Tunis</em>, {year}.</div>
          <div className="colophon">
            <div className="row"><span>System</span><strong>Zini DS - v2.0</strong></div>
            <div className="row"><span>Typography</span><strong>Inter - JetBrains Mono</strong></div>
            <div className="row"><span>Built with</span><strong>React - Vite - CSS</strong></div>
            <div className="row"><span>Last update</span><strong>May 2026</strong></div>
          </div>
        </div>
        <div className="bottom">
          <span>© Mohamed Amine Zini - all rights reserved</span>
          <span className="skeptic"><img src={skepticLogo} alt="Skeptic alias" /><span>A Skeptic production</span></span>
        </div>
      </footer>
    </>
  )
}

export default App
