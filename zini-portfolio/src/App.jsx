import './index.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowRight, FiCheck, FiCode, FiCpu, FiDatabase, FiEye, FiGlobe, FiLayers, FiMapPin, FiMaximize, FiPenTool, FiTerminal } from 'react-icons/fi'
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
    idx: '01 / 05',
    title: 'Computer vision, AI & OCR',
    icon: FiEye,
    desc: 'Detection and document-reading pipelines built for real use: YOLO + OCR license plate reading at 98% accuracy across 3,000 images, vehicle damage detection and severity scoring, and OpenCV preprocessing that lifted OCR accuracy from 60% to 87%.',
    tools: ['Python', 'OpenCV', 'YOLO', 'OCR', 'Tesseract', 'Image Processing', 'K-Means', 'Gemini', 'Prompt Engineering'],
  },
  {
    idx: '02 / 05',
    title: 'Software architecture',
    icon: FiCpu,
    desc: 'Designing the system around the model: Python microservices behind REST APIs, database modeling, containerized with Docker and shipped through CI/CD, built in Scrum teams from requirements to production.',
    tools: ['System design', 'Microservices', 'REST API', 'PostgreSQL', 'MongoDB', 'Docker', 'CI/CD', 'Git', 'Scrum / Agile'],
  },
  {
    idx: '03 / 05',
    title: 'Full-stack development',
    icon: FiCode,
    desc: 'The apps that put the engine in front of real users: React, Next.js and Angular front-ends, Django, Node.js and NestJS back-ends, plus WordPress and MERN sites for clients.',
    tools: ['React', 'Next.js', 'Angular', 'TypeScript', 'Django', 'NodeJS', 'Express JS', 'NestJS', 'MongoDB', 'TailwindCSS', 'WordPress'],
  },
  {
    idx: '04 / 05',
    title: 'Programming languages',
    icon: FiTerminal,
    desc: 'A practical engineering base for solving product, automation, data, and backend problems with clean logic.',
    tools: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL'],
  },
  {
    idx: '05 / 05',
    title: 'Graphic design',
    icon: FiPenTool,
    desc: 'A strong visual layer for developer work: brand identities, posters, UI direction, social content, and typography systems.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva', 'Brand design'],
  },
]

const navLinks = [
  ['#about', 'About'],
  ['#expertise', 'Expertise'],
  ['#experience', 'Experience'],
  ['#education', 'Education'],
  ['#dev-work', 'Dev'],
  ['#design-work', 'Design'],
  ['#contact', 'Contact'],
]

const education = [
  {
    state: 'done',
    when: 'Sep 2021 - Jun 2024',
    country: 'TN',
    city: 'Mahdia, Tunisia',
    degree: "Bachelor's in Computer Science & Multimedia",
    school: 'ISIMa',
    status: 'Licence - completed',
  },
  {
    state: 'done',
    when: 'Sep 2024 - Present',
    country: 'TN',
    city: 'Sousse, Tunisia',
    degree: 'Software Engineering Degree',
    school: 'EPI Digital School',
    status: "Diplôme d'ingénieur - in progress",
  },
  {
    state: 'current',
    when: 'Sep 2026 - Present',
    country: 'FR',
    city: 'Laval, France',
    degree: 'International Exchange in Software Engineering',
    school: 'ESIEA',
    status: 'Bac+5 - current',
  },
]

const spokenLanguages = [
  ['Arabic', 'Native', 5],
  ['French', 'Fluent', 4],
  ['English', 'Fluent', 4],
]

const experiences = [
  {
    year: '2026',
    role: 'Software Engineering Intern',
    company: 'Proxym-IT',
    type: 'Intern',
    desc: 'Built, in a Scrum team, the AI core of a car insurance claims app: a YOLO + OCR pipeline for license plate reading, a vehicle damage detection and severity scoring model, and the full React front-end from claim declaration to analysis results. The models are served by Python microservices (REST API, PostgreSQL), containerized with Docker and deployed via CI/CD.',
    stack: ['Python', 'YOLO', 'OCR', 'Computer Vision', 'React', 'PostgreSQL', 'Docker', 'CI/CD'],
    wins: ['98% plate reading on 3,000 images', 'Damage detection & scoring', 'Microservice architecture'],
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
    desc: 'Built InvoiceScan+, an automatic data extraction pipeline for scanned documents using Django, OCR, OpenCV, Tesseract, and Gemini prompt engineering. OpenCV image preprocessing raised OCR accuracy from 60% to 87%, validated on real documents of varied formats.',
    stack: ['Django', 'Python', 'OCR', 'OpenCV', 'Tesseract', 'Gemini'],
    wins: ['OCR accuracy 60% → 87%', 'AI document extraction', 'REST API'],
  },
  {
    year: '2023',
    role: 'Web Development Intern',
    company: 'Tunisie Telecom',
    type: 'Intern',
    desc: 'Built a social activity management platform using the MERN Stack in a collaborative team, with a REST API covering activity creation, registrations, and hierarchical approval. Deployed to internal departments.',
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
    title: 'InvoiceScan+',
    description: 'An AI document pipeline: upload any document image, OpenCV preprocessing cleans it up, Tesseract OCR reads it, and Gemini identifies the document type and extracts the relevant data into a usable JSON, Word or PDF file within seconds.',
    tag: 'Django/AI Web',
    year: '2024',
    role: 'Full-stack dev',
    output: 'OCR / AI pipeline',
    image: invoiceScan,
    url: 'https://github.com/ZiniMedAmine/InvoiceScan',
    tech: ['Python', 'Django', 'REST API', 'OCR', 'OpenCV', 'Tesserract', 'Prompt Engineering', 'Gemini'],
  },
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
    description: 'A responsive MERN Stack platform for French-speaking UMF Iasi medical students that simulates exams with randomized questions and exact grading algorithms. An extraction pipeline turned 30 complex PDFs into thousands of structured questions, replacing about 2 months of manual data entry.',
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    // Count stats up from zero the first time they scroll into view
    const countUp = (root) => {
      root.querySelectorAll('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        if (reduceMotion) return
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 1400)
          el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
    }

    const reveals = document.querySelectorAll('.reveal, .reveal-stagger')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          countUp(entry.target)
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    reveals.forEach((el) => revealObserver.observe(el))

    const nav = document.querySelector('.nav')
    const indicator = document.querySelector('.nav-indicator')
    const links = [...document.querySelectorAll('.nav a[href^="#"], .mobile-menu a[href^="#"]')]
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean)
    const timeline = document.querySelector('.timeline')
    const timelineCards = [...document.querySelectorAll('.experience-card')]
    let lastY = window.scrollY
    const updateNav = () => {
      const y = window.scrollY
      const probe = y + window.innerHeight * 0.35
      const active = sections.reduce((current, section) => section.offsetTop <= probe ? section : current, sections[0])
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${active?.id}`))

      // Slide the yellow pill under the active desktop link
      const current = document.querySelector('.nav ul a.is-active')
      if (indicator) {
        indicator.style.opacity = current ? '1' : '0'
        if (current) {
          indicator.style.width = `${current.offsetWidth}px`
          indicator.style.transform = `translateX(${current.parentElement.offsetLeft}px)`
        }
      }

      // Tuck the nav away while reading downwards, bring it back on the way up
      const delta = y - lastY
      if (Math.abs(delta) > 12) {
        if (nav && !document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', delta > 0 && y > 240)
        lastY = y
      }
      if (y < 240) nav?.classList.remove('is-hidden')

      // Fill the experience timeline as it is read
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const line = window.innerHeight * 0.55
        const fill = Math.max(0, Math.min(1, (line - rect.top) / rect.height))
        timeline.style.setProperty('--fill', fill.toFixed(4))
        timelineCards.forEach((card) => card.classList.toggle('is-lit', card.getBoundingClientRect().top + 40 < line))
      }
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
      if (event.target.closest('a, button, input, textarea, [data-hover]')) ring?.classList.add('is-hover')
    }
    const cursorOut = (event) => {
      if (!event.relatedTarget?.closest?.('a, button, input, textarea, [data-hover]')) ring?.classList.remove('is-hover')
    }

    const cards = document.querySelectorAll('[data-hover]')
    const onSpotlight = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    cards.forEach((card) => card.addEventListener('mousemove', onSpotlight))

    const layers = [...document.querySelectorAll('.hero-visual [data-depth]')]
    let px = 0
    let py = 0
    let tx = 0
    let ty = 0
    let playFrame = 0
    const onParallax = (event) => {
      tx = event.clientX / window.innerWidth - 0.5
      ty = event.clientY / window.innerHeight - 0.5
    }
    const playLoop = () => {
      playFrame = requestAnimationFrame(playLoop)
      if (window.scrollY > window.innerHeight) return
      px += (tx - px) * 0.06
      py += (ty - py) * 0.06
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth) * 36
        layer.style.transform = `translate3d(${px * depth}px, ${py * depth}px, 0)`
      })
    }

    window.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('resize', updateNav)
    if (finePointer) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      window.addEventListener('mouseover', cursorHover)
      window.addEventListener('mouseout', cursorOut)
      frame = requestAnimationFrame(cursorLoop)
      if (!reduceMotion && layers.length) {
        window.addEventListener('mousemove', onParallax, { passive: true })
        playFrame = requestAnimationFrame(playLoop)
      }
    }
    document.fonts?.ready.then(updateNav)
    updateNav()

    return () => {
      window.removeEventListener('scroll', updateNav)
      window.removeEventListener('resize', updateNav)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', cursorHover)
      window.removeEventListener('mouseout', cursorOut)
      window.removeEventListener('mousemove', onParallax)
      cards.forEach((card) => card.removeEventListener('mousemove', onSpotlight))
      cancelAnimationFrame(frame)
      cancelAnimationFrame(playFrame)
      revealObserver.disconnect()
    }
  }, [])
}

const codeLines = [
  [['34%', '#fac515'], ['22%', '#7aa2f7']],
  [['18%', '#bb9af7'], ['40%', '#9ece6a']],
  [['26%', '#7aa2f7'], ['30%', '#e0e3e8']],
  [['38%', '#9ece6a']],
  [['20%', '#ff7a93'], ['28%', '#e0e3e8']],
  [['24%', '#fac515']],
]

function HeroVisual() {
  const particles = useMemo(() => [
    ['12deg', '41cqw', '9px', 'var(--ink)'], ['96deg', '49cqw', '7px', 'var(--yellow-deep)'],
    ['168deg', '41cqw', '7px', 'var(--ink)'], ['250deg', '49cqw', '6px', 'var(--muted-2)'],
    ['318deg', '41cqw', '8px', 'var(--yellow-deep)'],
  ], [])

  return (
    <div className="hero-visual" data-hover aria-hidden="true">
      <div className="hv-layer full" data-depth="0.25">
        <div className="hv-circle" />
      </div>
      <div className="hv-layer full" data-depth="0.12">
        <svg className="arc-label spin-1" viewBox="0 0 100 100">
          <defs><path id="arc-a" d="M 50,50 m -45.5,0 a 45.5,45.5 0 1,1 91,0 a 45.5,45.5 0 1,1 -91,0" /></defs>
          <text><textPath href="#arc-a">software engineer x computer vision - ocr - full-stack - software engineer x computer vision - ocr - full-stack - </textPath></text>
        </svg>
        <svg className="arc-label spin-2" viewBox="0 0 100 100">
          <defs><path id="arc-b" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" /></defs>
          <text><textPath href="#arc-b">design pipelines - architect systems - ship real-world apps - design pipelines - </textPath></text>
        </svg>
        <div className="hv-orbit">
          {particles.map(([a, r, sz, c]) => (
            <div key={a} className="particle" style={{ '--a': a, '--r': r, '--s': sz, '--c': c }} />
          ))}
        </div>
      </div>

      <div className="hv-layer hv-code-wrap" data-depth="0.9">
        <div className="hv-card hv-code">
          <div className="dots"><i /><i /><i /></div>
          {codeLines.map((line, index) => (
            <div className="code-line" key={index} style={{ '--x': `${[0, 6, 6, 12, 6, 0][index]}%` }}>
              {line.map(([w, c]) => <i key={w + c} style={{ '--w': w, '--c': c }} />)}
            </div>
          ))}
          <span className="caret" style={{ '--x': '0%' }} />
        </div>
      </div>

      <div className="hv-layer hv-vision-wrap" data-depth="1.4">
        <div className="hv-card hv-vision">
          <div className="hv-scene">
            <span className="bldg b1" /><span className="bldg b2" /><span className="bldg b3" />
            <span className="lane" />
            <span className="obj person" /><span className="obj car" />
            <span className="scan" />
            <span className="bbox person"><span>person 0.94</span></span>
            <span className="bbox car"><span>car 0.91</span></span>
          </div>
          <div className="hv-ocr">Text: <b>"Invoice #4587"</b></div>
        </div>
      </div>

      <div className="hv-layer hv-api-wrap" data-depth="1.15">
        <div className="hv-card hv-api">
          <div className="api-pill">API</div>
          <svg viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M50 0 V4 M50 4 H17 V10 M50 4 V10 M50 4 H83 V10" />
          </svg>
          <div className="nodes">
            <div className="node web"><FiGlobe /><span>Web App</span></div>
            <div className="node svc"><FiLayers /><span>Services</span></div>
            <div className="node db"><FiDatabase /><span>Database</span></div>
          </div>
        </div>
      </div>

      <div className="hv-layer hv-icons-wrap" data-depth="0.7">
        <div className="hv-card hv-icons">
          <div className="ic"><FiEye /><span>Computer Vision</span></div>
          <div className="ic"><FiMaximize /><span>Document Processing</span></div>
          <div className="ic"><FiCode /><span>Real World Apps</span></div>
        </div>
      </div>
    </div>
  )
}

function splitTitle(title) {
  const words = title.split(' ')
  if (words.length < 2) return [null, title]
  return [words.slice(0, -1).join(' '), words.at(-1)]
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

  useEffect(() => {
    if (!openProject) return
    document.body.classList.add('modal-open')
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [openProject])

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
      style={{ height: `${panels * 100}svh` }}
    >
      <div className="work-sticky">
        <div className="work-track" ref={trackRef}>
          <div className="work-intro">
            <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{eyebrow}</span></p>
            <div className="titleblock">
              <h2>{title} <span className="grad">work</span><em>{subtitle}</em></h2>
              {note && <p className="work-note">{note}</p>}
            </div>
            <div className="meta-row">
              <div className="count">{projects.length} projects - {type === 'design' ? 'visual systems & art' : 'websites & applications'}</div>
              <div className="swipe"><span>Scroll right</span><span className="arrow" /></div>
            </div>
          </div>

          {projects.map((project, index) => {
            const [titleHead, titleTail] = splitTitle(project.title)
            return (
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
                  <div className="frame"><img src={project.images?.[0] || project.image} alt={project.title} loading="lazy" /></div>
                </div>
                <div className="project-info">
                  <span className="kind">{project.tag} - {project.year}</span>
                  <h3>{titleHead && <>{titleHead} </>}<em>{titleTail}</em></h3>
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
                    <button className="link solid" onClick={() => open(project)}>Open case <span className="arrow" /></button>
                    {project.url && <a className="link" href={project.url} target={project.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{project.cta || (type === 'design' ? 'View on Behance' : 'View project')} <span className="arrow" /></a>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="work-progress" aria-hidden="true">
          <span className="label">P - <span data-work-count ref={countRef}>00</span> / {String(panels - 1).padStart(2, '0')}</span>
          <span className="bar"><span className="fill" ref={fillRef} /></span>
          <span className="label">Scroll to advance</span>
        </div>
      </div>

      {openProject && createPortal(
        <div className="modal-backdrop" onClick={() => setOpenProject(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenProject(null)} aria-label="Close project">×</button>
            <div className="modal-media">
              <img src={activeImages[imageIndex]} alt={openProject.title} />
              {activeImages.length > 1 && (
                <>
                  <div className="modal-arrows">
                    <button onClick={() => setImageIndex((imageIndex - 1 + activeImages.length) % activeImages.length)} aria-label="Previous image">‹</button>
                    <button onClick={() => setImageIndex((imageIndex + 1) % activeImages.length)} aria-label="Next image">›</button>
                  </div>
                  <div className="modal-dots" aria-hidden="true">
                    {activeImages.map((image, index) => <i key={image} className={index === imageIndex ? 'on' : ''} />)}
                  </div>
                </>
              )}
            </div>
            <div className="modal-body">
              <span className="kind">{openProject.tag} - {openProject.year}</span>
              <h3>{openProject.title}</h3>
              <p>{openProject.description}</p>
              {openProject.tech && <div className="tools compact">{openProject.tech.map((tech) => <span className="tool" key={tech}>{tech}</span>)}</div>}
              {openProject.url && <a className="link solid" href={openProject.url} target={openProject.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{openProject.cta || 'Open project'} <span className="arrow" /></a>}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}

function App() {
  usePortfolioInteractions()
  const year = new Date().getFullYear()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <nav className="nav" data-screen-label="00 Nav">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="mark"><img src={skepticLogo} alt="Zini logomark" /></span>
          <span className="name">Zini</span>
          <span className="meta">software & AI</span>
        </a>
        <ul>
          <li className="nav-indicator" aria-hidden="true" />
          {navLinks.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
        </ul>
        <div className="nav-end">
          <div className="availability"><span className="dot" /><span>Open to internship - Feb '27</span></div>
          <button
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {navLinks.map(([href, label], index) => (
            <li key={href}>
              <a href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
                <span className="n">{String(index + 1).padStart(2, '0')}</span>{label}
              </a>
            </li>
          ))}
        </ul>
        <div className="availability"><span className="dot" /><span>Open to internship - Feb '27</span></div>
      </div>

      <main>
        <section id="home" className="section hero" data-screen-label="01 Hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal-stagger">
              <p className="eyebrow"><span className="num">01</span><span className="line" /><span>Portfolio - 2026 edition</span></p>
              <h1>
                <span className="split-line"><span>Mohamed</span></span>
                <span className="split-line"><span>Amine Zini<span className="it">,</span></span></span>
                <span className="split-line"><span className="grad">software engineer</span></span>
                <span className="split-line designer"><span>& Graphic Designer.</span></span>
              </h1>
              <div className="role">
                <span className="line" />
                <span>Currently</span>
                <span className="now"><span className="now-track"><span>building computer vision pipelines</span><span>engineering OCR & document AI</span><span>architecting full-stack apps</span><span>building computer vision pipelines</span></span></span>
              </div>
              <p className="lede hero-lede">I build software end to end: computer vision and OCR pipelines, the APIs and services that run them, and the web apps people actually use. Clean architecture, effective solutions, and a designer's eye for the last mile.</p>
              <div className="hero-meta">
                <div className="item"><div className="label">Based</div><div className="value">Laval, France - UTC+1</div></div>
                <div className="item"><div className="label">Discipline</div><div className="value">Software - AI - Web</div></div>
                <div className="item"><div className="label">Status</div><div className="value">Open - Final&#8209;year internship</div></div>
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="container hero-foot">
            <span>© Zini studio - {year}</span>
            <a href="#about" className="scrolldown"><span>Scroll to explore</span><span className="arrow" /></a>
            <span>v 2.0</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {['Software engineering', 'Computer vision', 'OCR pipelines', 'System architecture', 'YOLO', 'OpenCV', 'Microservices', 'REST APIs', 'React', 'Django', 'Docker', 'Brand design', 'Visual systems'].map((item, index) => (
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
              <p className="lede">I engineer the pipeline, the architecture, and the product around it.</p>
              <p>I'm Mohamed Amine, a <strong>Software Engineering</strong> student focused on <strong>computer vision, OCR, and AI-powered applications</strong>, and on the architecture that turns a model into a product people can rely on.</p>
              <p>My strongest work lives where models meet real systems: YOLO + OCR pipelines, OpenCV preprocessing, Python microservices behind REST APIs, Docker and CI/CD, and the React, Angular, Django, and MERN apps on top. Design is still part of my edge, but the hierarchy is code, architecture, and working solutions first.</p>
              <p>Because I also come from graphic design, I can ship websites that do more than function. I care about structure, performance, clarity, and the visual decisions that make software easier to trust and use.</p>
            </div>
          </div>
          <div className="container about-stats reveal-stagger">
            <div className="stat"><div className="num"><span data-count="3">3</span><span className="unit"> yrs</span></div><div className="label">Experience</div></div>
            <div className="stat"><div className="num"><span data-count="10">10</span>+</div><div className="label">Dev projects</div></div>
            <div className="stat"><div className="num"><span data-count="6">6</span>+</div><div className="label">Clients served</div></div>
            <div className="stat"><div className="num"><span data-count="50">50</span>+</div><div className="label">Design assets</div></div>
          </div>
        </section>

        <section id="expertise" className="section expertise" data-screen-label="03 Expertise">
          <div className="container expertise-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">03</span><span className="line" /><span>Expertise</span></p>
              <h2>What I do <em>best.</em></h2>
            </div>
            <div className="disciplines">
              {skills.map((skill) => (
                <div className="discipline reveal" key={skill.title} data-hover>
                  <span className="idx">{skill.idx}</span>
                  <span className="icon" aria-hidden="true"><skill.icon /></span>
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

        <section id="education" className="section education" data-screen-label="05 Education">
          <div className="container">
            <div className="education-head reveal">
              <div>
                <p className="eyebrow"><span className="num">05</span><span className="line" /><span>Education</span></p>
                <h2>Learning <em>path.</em></h2>
              </div>
              <p className="education-sub">From Mahdia to Laval: three schools, two countries, one direction. Software engineering.</p>
            </div>

            <ol className="route reveal-stagger" aria-label="Education path">
              {education.map((stop) => (
                <li className={`stop is-${stop.state}`} key={stop.school}>
                  <div className="stop-rail" aria-hidden="true">
                    <span className="stop-dot">{stop.state === 'done' && <FiCheck />}</span>
                  </div>
                  <span className="stop-when">{stop.when}</span>
                  <article className="stop-card" data-hover>
                    {stop.state === 'current' && <span className="stop-now">Now</span>}
                    <span className="stop-place"><FiMapPin aria-hidden="true" /><span className="cc">{stop.country}</span>{stop.city}</span>
                    <h3>{stop.degree}</h3>
                    <p className="stop-school">{stop.school}</p>
                    <span className="stop-status">{stop.status}</span>
                  </article>
                </li>
              ))}
              <li className="stop is-next">
                <div className="stop-rail" aria-hidden="true"><span className="stop-dot" /></div>
                <span className="stop-when">From Feb 2027</span>
                <article className="stop-card">
                  <span className="stop-place"><FiMapPin aria-hidden="true" /><span className="cc">FR</span>Anywhere in France</span>
                  <h3>End-of-studies internship</h3>
                  <p className="stop-school">4 to 6 months - software engineering, computer vision & AI</p>
                  <a href="#contact" className="stop-cta">Next stop? Let's talk <FiArrowRight aria-hidden="true" /></a>
                </article>
              </li>
            </ol>

            <div className="languages reveal">
              <span className="languages-label">Languages</span>
              <ul>
                {spokenLanguages.map(([language, level, score]) => (
                  <li key={language}>
                    <strong>{language}</strong>
                    <span className="lvl" aria-label={`${level}, ${score} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= score ? 'on' : ''} />)}
                    </span>
                    <span className="lvl-name">{level}</span>
                  </li>
                ))}
              </ul>
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
          number="06"
          note="Note: if a link does not work, the client probably did not pay for his hosting fees."
        />
        <WorkShowcase
          id="design-work"
          eyebrow="Design work"
          title="Design"
          subtitle="all visual projects."
          projects={designProjects}
          type="design"
          number="07"
          note="Note: sorry if a Behance link does not work. I am currently having trouble with my Behance account."
        />

        <Contact socials={socials} />
      </main>

      <footer className="footer" data-screen-label="Footer">
        <div className="footer-grid">
          <div className="footer-lead">
            <div className="signoff">Designed & built<br /><em>in Tunis</em>, {year}.</div>
            <a href="#home" className="to-top">Back to top <span className="arrow" aria-hidden="true" /></a>
          </div>
          <div className="colophon">
            <div className="row"><span>System</span><strong>Zini DS - v2.0</strong></div>
            <div className="row"><span>Typography</span><strong>Plus Jakarta Sans - JetBrains Mono</strong></div>
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
