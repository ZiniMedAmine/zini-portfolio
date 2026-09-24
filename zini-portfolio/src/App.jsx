import './index.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowRight, FiCheck, FiCode, FiCpu, FiDatabase, FiEye, FiGlobe, FiLayers, FiMapPin, FiMaximize, FiPenTool, FiTerminal } from 'react-icons/fi'
import Contact from './components/Contact_new'
import { L, en, useLang } from './i18n'
import { LangProvider, LangSwitch } from './components/Lang'

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

// Interface copy that isn't part of a data list
const ui = {
  menuOpen: L('Open menu', 'Ouvrir le menu'),
  menuClose: L('Close menu', 'Fermer le menu'),
  availability: L("Open to internship - Feb '27", 'Stage dès févr. 2027'),
  heroEyebrow: L('Portfolio - 2026 edition', 'Portfolio - édition 2026'),
  heroRole: L('software engineer', 'ingénieur logiciel'),
  heroDesigner: L('& Graphic Designer.', '& designer graphique.'),
  currently: L('Currently', 'Actuellement'),
  rotating: [
    L('building computer vision pipelines', 'pipelines de vision par ordinateur'),
    L('engineering OCR & document AI', 'OCR & IA documentaire'),
    L('architecting full-stack apps', "architecture d'apps full-stack"),
  ],
  heroLede: L(
    "I build software end to end: computer vision and OCR pipelines, the APIs and services that run them, and the web apps people actually use. Clean architecture, effective solutions, and a designer's eye for the last mile.",
    "Je conçois des logiciels de bout en bout : des pipelines de vision par ordinateur et d'OCR, les API et services qui les font tourner, et les applications web que les gens utilisent vraiment. Une architecture propre, des solutions efficaces, et un œil de designer pour les finitions.",
  ),
  based: L('Based', 'Basé à'),
  discipline: L('Discipline', 'Discipline'),
  disciplineValue: L('Software - AI - Web', 'Logiciel - IA - Web'),
  status: L('Status', 'Statut'),
  statusValue: L('Open - Final‑year internship', "Ouvert - stage de fin d'études"),
  scrollExplore: L('Scroll to explore', 'Défiler pour explorer'),
  arcOuter: L(
    'software engineer x computer vision - ocr - full-stack - software engineer x computer vision - ocr - full-stack - ',
    'ingénieur logiciel x vision par ordinateur - ocr - full-stack - ingénieur logiciel x vision - ',
  ),
  arcInner: L(
    'design pipelines - architect systems - ship real-world apps - design pipelines - ',
    'concevoir des pipelines - architecturer - livrer des apps concrètes - ',
  ),
  hvNodes: [L('Web App', 'App web'), L('Services', 'Services'), L('Database', 'Base de données')],
  hvIcons: [L('Computer Vision', 'Vision par ordinateur'), L('Document Processing', 'Traitement de documents'), L('Real World Apps', 'Apps concrètes')],
  hvText: L('Text:', 'Texte :'),
  hvInvoice: L('"Invoice #4587"', '« Facture #4587 »'),
  marquee: [
    L('Software engineering', 'Génie logiciel'), L('Computer vision', 'Vision par ordinateur'), L('OCR pipelines', 'Pipelines OCR'),
    L('System architecture', 'Architecture système'), 'YOLO', 'OpenCV', 'Microservices', L('REST APIs', 'API REST'),
    'React', 'Django', 'Docker', L('Brand design', 'Design de marque'), L('Visual systems', 'Systèmes visuels'),
  ],
  about: L('About', 'À propos'),
  aboutTitle: [L('A software-first ', 'Une pratique '), L('practice', 'orientée logiciel'), L(' from Tunisia.', ', née en Tunisie.')],
  aboutLede: L('I engineer the pipeline, the architecture, and the product around it.', "Je conçois le pipeline, l'architecture et le produit qui les entoure."),
  aboutP1: L(
    <>I'm Mohamed Amine, a <strong>Software Engineering</strong> student focused on <strong>computer vision, OCR, and AI-powered applications</strong>, and on the architecture that turns a model into a product people can rely on.</>,
    <>Je suis Mohamed Amine, élève ingénieur en <strong>génie logiciel</strong>, spécialisé en <strong>vision par ordinateur, OCR et applications propulsées par l'IA</strong>, et dans l'architecture qui transforme un modèle en un produit fiable.</>,
  ),
  aboutP2: L(
    'My strongest work lives where models meet real systems: YOLO + OCR pipelines, OpenCV preprocessing, Python microservices behind REST APIs, Docker and CI/CD, and the React, Angular, Django, and MERN apps on top. Design is still part of my edge, but the hierarchy is code, architecture, and working solutions first.',
    "Mon meilleur travail se situe là où les modèles rencontrent de vrais systèmes : pipelines YOLO + OCR, prétraitement OpenCV, microservices Python derrière des API REST, Docker et CI/CD, et les applications React, Angular, Django et MERN par-dessus. Le design reste un atout, mais la priorité, c'est le code, l'architecture et des solutions qui fonctionnent.",
  ),
  aboutP3: L(
    'Because I also come from graphic design, I can ship websites that do more than function. I care about structure, performance, clarity, and the visual decisions that make software easier to trust and use.',
    'Comme je viens aussi du design graphique, je livre des sites qui ne se contentent pas de fonctionner. Je soigne la structure, la performance, la clarté et les choix visuels qui rendent un logiciel plus simple à utiliser et plus digne de confiance.',
  ),
  yrs: L(' yrs', ' ans'),
  stats: [L('Experience', 'Expérience'), L('Dev projects', 'Projets dev'), L('Clients served', 'Clients accompagnés'), L('Design assets', 'Créations design')],
  expertise: L('Expertise', 'Expertise'),
  expertiseTitle: [L('What I do ', 'Ce que je fais de '), L('best.', 'mieux.')],
  experience: L('Experience', 'Expérience'),
  experienceTitle: [L('Professional ', 'Expérience '), L('timeline.', 'professionnelle.')],
  education: L('Education', 'Formation'),
  educationTitle: [L('Learning ', 'Mon '), L('path.', 'parcours.')],
  educationSub: L(
    'From Mahdia to Laval: three schools, two countries, one direction. Software engineering.',
    'De Mahdia à Laval : trois écoles, deux pays, une seule direction. Le génie logiciel.',
  ),
  educationAria: L('Education path', 'Parcours de formation'),
  now: L('Now', 'Actuel'),
  nextWhen: L('From Feb 2027', 'Dès févr. 2027'),
  nextPlace: L('Anywhere in France', 'Partout en France'),
  nextTitle: L('End-of-studies internship', "Stage de fin d'études"),
  nextDetail: L('4 to 6 months - software engineering, computer vision & AI', '4 à 6 mois - génie logiciel, vision par ordinateur & IA'),
  nextCta: L("Next stop? Let's talk", 'Prochain arrêt ? Parlons-en'),
  languages: L('Languages', 'Langues'),
  outOf5: L('out of 5', 'sur 5'),
  devWork: {
    eyebrow: L('Development work', 'Projets de développement'),
    title: L('Development', 'Projets'),
    mark: L('work', 'dev'),
    subtitle: L('all software projects.', 'tous mes projets logiciels.'),
    count: L('websites & applications', 'sites & applications'),
    note: L(
      'Note: if a link does not work, the client probably did not pay for his hosting fees.',
      "Note : si un lien ne fonctionne pas, le client n'a probablement pas renouvelé son hébergement.",
    ),
  },
  designWork: {
    eyebrow: L('Design work', 'Projets de design'),
    title: L('Design', 'Projets'),
    mark: L('work', 'design'),
    subtitle: L('all visual projects.', 'tous mes projets visuels.'),
    count: L('visual systems & art', 'systèmes visuels & art'),
    note: L(
      'Note: sorry if a Behance link does not work. I am currently having trouble with my Behance account.',
      'Note : désolé si un lien Behance ne fonctionne pas, je rencontre actuellement des problèmes avec mon compte Behance.',
    ),
  },
  projects: L('projects', 'projets'),
  scrollRight: L('Scroll right', 'Défiler vers la droite'),
  swipeHint: L('Swipe or scroll', 'Glissez ou défilez'),
  scrollAdvance: L('Scroll to advance', 'Défiler pour avancer'),
  role: L('Role', 'Rôle'),
  year: L('Year', 'Année'),
  output: L('Output', 'Livrable'),
  openCase: L('Open case', 'Détails'),
  viewBehance: L('View on Behance', 'Voir sur Behance'),
  viewProject: L('View project', 'Voir le projet'),
  openProject: L('Open project', 'Ouvrir le projet'),
  closeProject: L('Close project', 'Fermer le projet'),
  prevImage: L('Previous image', 'Image précédente'),
  nextImage: L('Next image', 'Image suivante'),
  signoff: [L('Designed & built', 'Conçu & développé'), L('in Tunisia', 'en Tunisie')],
  toTop: L('Back to top', 'Retour en haut'),
  colophon: [L('System', 'Système'), L('Typography', 'Typographie'), L('Built with', 'Réalisé avec'), L('Last update', 'Mise à jour')],
  lastUpdate: L('September 2026', 'Septembre 2026'),
  rights: L('© Mohamed Amine Zini - all rights reserved', '© Mohamed Amine Zini - tous droits réservés'),
  skeptic: L('A Skeptic production', 'Une production Skeptic'),
}

const skills = [
  {
    idx: '01 / 05',
    title: L('Computer vision, AI & OCR', 'Vision par ordinateur, IA & OCR'),
    icon: FiEye,
    desc: L(
      'Detection and document-reading pipelines built for real use: YOLO + OCR license plate reading at 98% accuracy across 3,000 images, vehicle damage detection and severity scoring, and OpenCV preprocessing that lifted OCR accuracy from 60% to 87%.',
      "Des pipelines de détection et de lecture de documents pensés pour un usage réel : lecture de plaques d'immatriculation YOLO + OCR avec 98 % de précision sur 3 000 images, détection et notation de la gravité des dommages sur véhicules, et un prétraitement OpenCV qui a fait passer la précision de l'OCR de 60 % à 87 %.",
    ),
    tools: ['Python', 'OpenCV', 'YOLO', 'OCR', 'Tesseract', L('Image Processing', "Traitement d'images"), 'K-Means', 'Gemini', 'Prompt Engineering'],
  },
  {
    idx: '02 / 05',
    title: L('Software architecture', 'Architecture logicielle'),
    icon: FiCpu,
    desc: L(
      'Designing the system around the model: Python microservices behind REST APIs, database modeling, containerized with Docker and shipped through CI/CD, built in Scrum teams from requirements to production.',
      "Concevoir le système autour du modèle : microservices Python derrière des API REST, modélisation de bases de données, conteneurisation avec Docker et livraison via CI/CD, en équipe Scrum, du recueil des besoins jusqu'à la production.",
    ),
    tools: [L('System design', 'Conception système'), 'Microservices', L('REST API', 'API REST'), 'PostgreSQL', 'MongoDB', 'Docker', 'CI/CD', 'Git', 'Scrum / Agile'],
  },
  {
    idx: '03 / 05',
    title: L('Full-stack development', 'Développement full-stack'),
    icon: FiCode,
    desc: L(
      'The apps that put the engine in front of real users: React, Next.js and Angular front-ends, Django, Node.js and NestJS back-ends, plus WordPress and MERN sites for clients.',
      'Les applications qui mettent le moteur entre les mains des utilisateurs : front-ends React, Next.js et Angular, back-ends Django, Node.js et NestJS, ainsi que des sites WordPress et MERN pour des clients.',
    ),
    tools: ['React', 'Next.js', 'Angular', 'TypeScript', 'Django', 'Node.js', 'Express.js', 'NestJS', 'MongoDB', 'Tailwind CSS', 'WordPress'],
  },
  {
    idx: '04 / 05',
    title: L('Programming languages', 'Langages de programmation'),
    icon: FiTerminal,
    desc: L(
      'A practical engineering base for solving product, automation, data, and backend problems with clean logic.',
      "Une base d'ingénierie solide pour résoudre des problèmes produit, d'automatisation, de données et de back-end avec une logique claire.",
    ),
    tools: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'SQL'],
  },
  {
    idx: '05 / 05',
    title: L('Graphic design', 'Design graphique'),
    icon: FiPenTool,
    desc: L(
      'A strong visual layer for developer work: brand identities, posters, UI direction, social content, and typography systems.',
      'Une couche visuelle forte au service du développement : identités de marque, affiches, direction UI, contenus pour les réseaux sociaux et systèmes typographiques.',
    ),
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva', L('Brand design', 'Design de marque')],
  },
]

const navLinks = [
  ['#about', L('About', 'À propos')],
  ['#expertise', L('Expertise', 'Expertise')],
  ['#experience', L('Experience', 'Expérience')],
  ['#education', L('Education', 'Formation')],
  ['#dev-work', 'Dev'],
  ['#design-work', 'Design'],
  ['#contact', 'Contact'],
]

const education = [
  {
    state: 'done',
    when: L('Sep 2021 - Jun 2024', 'Sept. 2021 - juin 2024'),
    country: 'TN',
    city: L('Mahdia, Tunisia', 'Mahdia, Tunisie'),
    degree: L("Bachelor's in Computer Science & Multimedia", 'Licence en informatique et multimédia'),
    school: 'ISIMa',
    status: L('Licence - completed', 'Licence - obtenue'),
  },
  {
    state: 'done',
    when: L('Sep 2024 - Present', "Sept. 2024 - aujourd'hui"),
    country: 'TN',
    city: L('Sousse, Tunisia', 'Sousse, Tunisie'),
    degree: L('Software Engineering Degree', "Diplôme d'ingénieur en génie logiciel"),
    school: 'EPI Digital School',
    status: L("Diplôme d'ingénieur - in progress", 'Cycle ingénieur - en cours'),
  },
  {
    state: 'current',
    when: L('Sep 2026 - Present', "Sept. 2026 - aujourd'hui"),
    country: 'FR',
    city: 'Laval, France',
    degree: L('International Exchange in Software Engineering (Bac+5)', 'Échange international en Software Engineering (bac+5)'),
    school: 'ESIEA',
    status: L('Exchange - current', 'Échange - en cours'),
  },
]

const spokenLanguages = [
  [L('Arabic', 'Arabe'), L('Native / bilingual', 'Natif/bilingue'), 5],
  [L('French', 'Français'), L('Fluent', 'Courant'), 4],
  [L('English', 'Anglais'), L('Fluent', 'Courant'), 4],
]

const intern = L('Intern', 'Stage')
const selfEmployed = L('Self-Employed', 'Indépendant')

const experiences = [
  {
    year: '2026',
    role: L('Full-Stack & AI Engineering Intern', 'Stagiaire ingénieur full stack & IA'),
    company: 'Proxym-IT',
    type: intern,
    desc: L(
      'Built, in a Scrum team, the AI core of a car insurance claims app: a YOLO + OCR pipeline for license plate reading, a vehicle damage detection and severity scoring model, and the full React front-end from claim declaration to analysis results. The models are served by Python microservices (REST API, PostgreSQL), containerized with Docker and deployed via CI/CD.',
      "Contribution, en équipe Scrum, à l'automatisation de la déclaration de sinistre d'une application d'assurance auto, de la saisie par l'assuré à l'analyse des dommages par vision par ordinateur. Conception d'un pipeline YOLO + OCR et d'un modèle de détection et de notation des dommages, développement de l'intégralité du front-end React, du parcours de déclaration à l'affichage des résultats d'analyse, et intégration des modèles au back-end via des microservices Python (API REST, PostgreSQL), conteneurisés avec Docker et déployés via CI/CD.",
    ),
    stack: ['Python', 'YOLO', 'OCR', L('Computer Vision', 'Vision par ordinateur'), 'React', 'PostgreSQL', 'Docker', 'CI/CD'],
    wins: [
      L('98% plate reading on 3,000 images', '98 % de lecture correcte des plaques sur 3 000 images'),
      L('Damage detection & scoring', 'Détection et notation des dommages'),
      L('Microservice architecture', 'Microservices Python'),
    ],
  },
  {
    year: '2024 - 2025',
    role: L('Freelance Web Developer', 'Développeur Web'),
    company: selfEmployed,
    type: 'Freelance',
    desc: L(
      'Developing responsive websites and web applications using modern technologies including React, WordPress, and MERN stack. Delivering custom solutions for clients across different industries.',
      "Livraison de projets web full-stack pour 6+ clients, dont des sites WordPress et MERN Stack avec thèmes personnalisés et optimisation SEO. Gestion de la relation client en autonomie, du cadrage des besoins et des devis jusqu'à la mise en production et au support.",
    ),
    stack: ['React', 'WordPress', 'MERN Stack', 'SEO', L('Responsive UI', 'UI responsive')],
    wins: [L('Custom websites', 'Thèmes personnalisés'), L('Client delivery', 'Relation client en autonomie'), L('Performance-minded builds', 'Optimisation SEO')],
  },
  {
    year: '2024',
    role: L("Web & AI Developer Intern (Bachelor's final project)", 'Stagiaire Développeur Web & IA (PFE Licence)'),
    company: 'Elite Council Consulting',
    type: intern,
    desc: L(
      'Built InvoiceScan+, an automatic data extraction pipeline for scanned documents using Django, OCR, OpenCV, Tesseract, and Gemini prompt engineering. OpenCV image preprocessing raised OCR accuracy from 60% to 87%, validated on real documents of varied formats.',
      "Développement avec Django d'une application d'extraction automatique de données à partir de documents scannés (Python, OCR). Amélioration de la précision de l'OCR de 60 % à 87 % grâce à un prétraitement d'images OpenCV, validé sur des documents réels de formats variés.",
    ),
    stack: ['Django', 'Python', 'OCR', 'OpenCV', 'Tesseract', 'Gemini'],
    wins: [L('OCR accuracy 60% → 87%', "Précision de l'OCR de 60 % à 87 %"), L('AI document extraction', 'Extraction automatique de données'), L('REST API', 'API REST')],
  },
  {
    year: '2023 - 2024',
    role: L('Freelance Graphic Designer', 'Graphiste freelance'),
    company: selfEmployed,
    type: 'Freelance',
    desc: L(
      'Created brand identities, managed social media content, and launched TeePublic store with 50+ designs for international clients. Focused on building cohesive brand experiences across digital platforms.',
      "Création d'identités de marque, gestion de contenus pour les réseaux sociaux et lancement d'une boutique TeePublic de plus de 50 designs pour des clients internationaux. Objectif : des expériences de marque cohérentes sur toutes les plateformes digitales.",
    ),
    stack: ['Photoshop', 'Illustrator', 'Figma', L('Brand Identity', 'Identité de marque'), L('Social Media', 'Réseaux sociaux')],
    wins: [L('50+ designs', '50+ designs'), L('Brand systems', 'Systèmes de marque'), L('International clients', 'Clients internationaux')],
  },
  {
    year: '2023',
    role: L('Web Development Intern', 'Stagiaire en développement web'),
    company: 'Tunisie Telecom',
    type: intern,
    desc: L(
      'Built a social activity management platform using the MERN Stack in a collaborative team, with a REST API covering activity creation, registrations, and hierarchical approval. Deployed to internal departments.',
      "Développement d'une plateforme MERN de gestion des activités sociales, mise en production dans les départements internes, avec des API REST couvrant la création d'activités, les inscriptions et la validation hiérarchique.",
    ),
    stack: ['React', 'Node.js', 'MongoDB', 'Express.js', L('Teamwork', "Travail d'équipe")],
    wins: [L('MERN application', 'Plateforme MERN'), L('Enterprise experience', 'Mise en production interne'), L('Collaborative delivery', 'Validation hiérarchique')],
  },
]

const digitalArt = L('Digital Art', 'Art numérique')
const brandIdentity = L('Brand Identity', 'Identité de marque')
const printDesign = L('Print Design', 'Print')
const conceptDesign = L('Concept, design', 'Concept, design')
const identityDesign = L('Identity design', "Design d'identité")
const posterArtwork = L('Poster artwork', 'Affiche')
const digitalArtwork = L('Digital artwork', 'Œuvre numérique')

const designProjects = [
  {
    title: 'Space Planet Art',
    description: L(
      'Digital artwork featuring some planets along with doodle simple details and space elements with vibrant colors and artistic flair.',
      'Illustration numérique mettant en scène des planètes, des détails façon doodle et des éléments spatiaux aux couleurs vives, avec une vraie touche artistique.',
    ),
    tag: 'Illustration',
    year: '2026',
    role: 'Illustration',
    output: digitalArtwork,
    url: 'https://www.behance.net/gallery/249934987/Space-Planet-illustration',
    images: [spacePlanetArt],
  },
  {
    title: 'Space Doodle Artwork',
    description: L('Creative space-themed doodle illustration.', "Illustration doodle créative sur le thème de l'espace."),
    tag: 'Illustration',
    year: '2024',
    role: 'Illustration',
    output: digitalArtwork,
    url: 'https://www.behance.net/gallery/249935263/Doodle-Space-Illustration',
    images: [spaceDoodleArt],
  },
  {
    title: L('Bipolar Disorder Digital Art', 'Trouble bipolaire, art numérique'),
    description: L(
      'Expressive digital artwork Illustrating the inner-experience of people with bipolar disorder.',
      'Œuvre numérique expressive illustrant le vécu intérieur des personnes atteintes de trouble bipolaire.',
    ),
    tag: digitalArt,
    year: '2025',
    role: conceptDesign,
    output: posterArtwork,
    url: 'https://www.behance.net/gallery/249935705/Bipolar-Disorder-Surreal-Digital-Art',
    images: [bipolarArt],
  },
  {
    title: 'Memento Mori - تذكر أنك ميت',
    description: L(
      'Digital art piece inspired by the Meditations of Marcus Aurelius, beautifully mixing arabic & latin letters, about the philosophical concept of mortality and the reminder to live meaningfully.',
      'Œuvre numérique inspirée des Pensées de Marc Aurèle, mêlant lettres arabes et latines autour du concept philosophique de la mortalité et du rappel à vivre pleinement.',
    ),
    tag: digitalArt,
    year: '2025',
    role: L('Typography, art', 'Typographie, art'),
    output: posterArtwork,
    url: 'https://www.behance.net/gallery/249936043/Memento-Mori',
    images: [mementoMori],
  },
  {
    title: L('Fight Club Poster', 'Affiche Fight Club'),
    description: L(
      "Movie poster design exploring the film's philosophy of anti-consumerism, freedom from material chains, and breaking societal norms through bold visual metaphors.",
      "Affiche de film explorant la philosophie de l'œuvre : l'anti-consumérisme, la libération des chaînes matérielles et la rupture avec les normes sociales, à travers des métaphores visuelles fortes.",
    ),
    tag: digitalArt,
    year: '2025',
    role: L('Poster design', "Design d'affiche"),
    output: L('Movie poster', 'Affiche de film'),
    url: 'https://www.behance.net/gallery/249936477/Fight-Club-Digital-Art',
    images: [fightClub],
  },
  {
    title: 'Curiosity Kills the Skeptic',
    description: L(
      'Deep philosophical poster exploring the paradox between intellectual curiosity and skeptical doubt, questioning whether the pursuit of knowledge ultimately challenges our protective skepticism.',
      'Affiche philosophique explorant le paradoxe entre curiosité intellectuelle et doute sceptique : la quête du savoir finit-elle par remettre en cause notre scepticisme protecteur ?',
    ),
    tag: digitalArt,
    year: '2025',
    role: conceptDesign,
    output: posterArtwork,
    url: 'https://www.behance.net/gallery/249936735/Curiosity-Kills-The-Skeptic-Digital-Art',
    images: [curiositySkeptic],
  },
  {
    title: 'The Quantum Society',
    description: L(
      'Conceptual design project exploring quantum theory as a metaphor for modern society, featuring front and back compositions that represent different perspectives of social complexity.',
      'Projet conceptuel qui utilise la théorie quantique comme métaphore de la société moderne, avec un recto et un verso représentant différentes perspectives de sa complexité.',
    ),
    tag: digitalArt,
    year: '2025',
    role: conceptDesign,
    output: L('Two-sided poster', 'Affiche recto-verso'),
    url: 'https://www.behance.net/gallery/249936213/Tunisia-The-Quantum-Society-Digital-Art',
    images: [tunisiaFront, tunisiaBack],
  },
  {
    title: "Hegel's Hotel California",
    description: L(
      "Philosophical cover art reimagining the Eagles' classic album with Hegel's dialectical thinking, featuring the text 'such a lovely place for a contradiction' - merging rock culture with German idealism.",
      "Pochette philosophique qui réinvente l'album culte des Eagles à travers la dialectique de Hegel, avec le texte 'such a lovely place for a contradiction' : la culture rock rencontre l'idéalisme allemand.",
    ),
    tag: digitalArt,
    year: '2025',
    role: L('Cover, type', 'Pochette, typo'),
    output: L('Album rework', "Refonte d'album"),
    url: 'https://www.behance.net/gallery/249936937/Hegels-Hotel-California-Cover-Art',
    images: [hegelsHotel],
  },
  {
    title: L('Skeptic Brand Identity', 'Identité de marque Skeptic'),
    description: L(
      "Logo design variations for my philosophical brand 'Skeptic', exploring different visual approaches to represent critical thinking, questioning, and intellectual curiosity through typography and symbolic elements.",
      "Déclinaisons de logo pour ma marque philosophique 'Skeptic', explorant différentes approches visuelles pour représenter l'esprit critique, le questionnement et la curiosité intellectuelle à travers la typographie et des éléments symboliques.",
    ),
    tag: brandIdentity,
    year: '2024',
    role: identityDesign,
    output: L('Logo system', 'Système de logo'),
    url: 'https://www.behance.net/gallery/249937033/Skeptic-Logo-Design-Brand-Identity',
    images: [skepticLogo3, skepticLogo2, skepticLogo1, skepticLogo],
  },
  {
    title: 'The Dead Welder',
    description: L(
      'Brand identity and logo design for a welder content creator, combining industrial aesthetics with edgy typography to create a memorable brand that reflects the raw, skilled nature of welding craftsmanship.',
      'Identité de marque et logo pour un créateur de contenu soudeur, alliant esthétique industrielle et typographie tranchante pour une marque mémorable qui reflète le savoir-faire brut du métier.',
    ),
    tag: brandIdentity,
    year: '2024',
    role: identityDesign,
    output: L('Logo design', 'Logo'),
    url: 'https://www.behance.net/gallery/249937149/The-Dead-Welder-Logo-Design-Branding',
    images: [deadWelder],
  },
  {
    title: 'BioAura Cosmetics',
    description: L(
      'Brand identity and logo design for BioAura Cosmetics, creating an elegant and organic visual identity that emphasizes natural beauty, wellness, and the harmonious connection between biology and personal care.',
      'Identité de marque et logo pour BioAura Cosmetics : une identité élégante et organique qui met en avant la beauté naturelle, le bien-être et l’harmonie entre biologie et soin de soi.',
    ),
    tag: brandIdentity,
    year: '2024',
    role: identityDesign,
    output: L('Cosmetics brand', 'Marque cosmétique'),
    url: 'https://www.behance.net/gallery/249938017/BioAura-Cosmetics-Logo-Brand-Design',
    images: [bioaura],
  },
  {
    title: L('Todo Notebook Covers', 'Couvertures de carnets Todo'),
    description: L(
      'Two cover designs for todo notebooks created for a small business, featuring clean layouts and motivational aesthetics to inspire productivity and organization for everyday task management.',
      'Deux couvertures de carnets de tâches pour une petite entreprise, avec des mises en page épurées et une esthétique motivante pour encourager productivité et organisation au quotidien.',
    ),
    tag: printDesign,
    year: '2025',
    role: L('Print design', 'Design print'),
    output: L('Notebook covers', 'Couvertures de carnets'),
    url: 'https://www.behance.net/gallery/249938287/Notebook-Cover-Design',
    images: [todo1, todo2],
  },
  {
    title: L('Derma-In Laboratory Flyers', 'Flyers Derma-In Laboratory'),
    description: L(
      'Marketing flyer designs for Derma-In laboratory, showcasing their sun protection products and natural oils collection. Clean, professional layouts emphasizing the scientific quality and natural benefits of their skincare solutions.',
      "Flyers marketing pour le laboratoire Derma-In, présentant ses produits de protection solaire et sa gamme d'huiles naturelles. Des mises en page claires et professionnelles qui soulignent la qualité scientifique et les bienfaits naturels des soins.",
    ),
    tag: printDesign,
    year: '2026',
    role: L('Marketing design', 'Design marketing'),
    output: L('Flyer series', 'Série de flyers'),
    url: 'https://www.behance.net/gallery/249938553/Derma-In-Laboratory-Flyer-Design',
    images: [flyer1, flyer2, flyer3, flyer4],
  },
  {
    title: L('Skeptic T-Shirt Designs', 'T-shirts Skeptic'),
    description: L(
      'Philosophical t-shirt designs available on TeePublic, featuring thought-provoking concepts from great philosophers like Kant, Descartes, and original Skeptic brand artwork that challenges conventional thinking.',
      'Designs de t-shirts philosophiques disponibles sur TeePublic, autour des idées de grands philosophes comme Kant et Descartes, et d’illustrations originales Skeptic qui bousculent la pensée conventionnelle.',
    ),
    tag: L('T-Shirt Design', 'Design textile'),
    year: '2024 - 2026',
    role: L('Apparel design', 'Design textile'),
    output: L('TeePublic store', 'Boutique TeePublic'),
    url: 'https://www.teepublic.com/user/skeptic-styles',
    cta: L('Shop on TeePublic', 'Voir la boutique TeePublic'),
    images: [skepticTshirt, kant1, kant2, cogito, problemImage],
  },
]

const fullStackDev = L('Full-stack dev', 'Dev full-stack')
const designBuild = L('Design, build', 'Design, dev')

const devProjects = [
  {
    title: 'InvoiceScan+',
    description: L(
      'An AI document pipeline: upload any document image, OpenCV preprocessing cleans it up, Tesseract OCR reads it, and Gemini identifies the document type and extracts the relevant data into a usable JSON, Word or PDF file within seconds.',
      'Un pipeline documentaire IA : on importe une image de document, OpenCV la nettoie, Tesseract OCR la lit, puis Gemini identifie le type de document et extrait les données utiles dans un fichier JSON, Word ou PDF exploitable, en quelques secondes.',
    ),
    tag: L('Django/AI Web', 'Django / IA web'),
    year: '2024',
    role: fullStackDev,
    output: L('OCR / AI pipeline', 'Pipeline OCR / IA'),
    image: invoiceScan,
    url: 'https://github.com/ZiniMedAmine/InvoiceScan',
    tech: ['Python', 'Django', L('REST API', 'API REST'), 'OCR', 'OpenCV', 'Tesseract', 'Prompt Engineering', 'Gemini'],
  },
  {
    title: L('ResumeCandy – Resume Versioning Engine', 'ResumeCandy – Générateur de CV avec gestion des versions'),
    description: L(
      'A modern web application designed to help users create, manage, and version multiple resumes. Built with multilingual and RTL support, customizable templates, and ATS-friendly PDF export.',
      "Un générateur de CV multi-versions à partir d'une base unique, avec export PDF compatible ATS et prise en charge multilingue et RTL (fr, en, ar) avec inversion complète de la mise en page.",
    ),
    tag: 'Next.js',
    year: '2026',
    role: designBuild,
    output: L('Resume management platform', 'Plateforme de gestion de CV'),
    image: ResumeCandy,
    url: 'https://github.com/ZiniMedAmine/ResumeCandy',
    tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
  },
  {
    title: L('Derma-In E-commerce Website', 'Site e-commerce Derma-In'),
    description: L(
      'A functional & responsive E-commerce website for derma-in laboratory, created using wordpress. Designed to help the company manage its orders and products through a user-friendly UI.',
      "Un site e-commerce fonctionnel et responsive pour le laboratoire Derma-In, réalisé avec WordPress, pour aider l'entreprise à gérer ses commandes et ses produits via une interface simple.",
    ),
    tag: 'WordPress',
    year: '2025',
    role: designBuild,
    output: L('E-commerce site', 'Site e-commerce'),
    image: dermaIn,
    url: 'https://www.derma-in.com',
    tech: ['WordPress', 'Elementor', 'WooCommerce', 'PHP', 'SEO', 'Yoast SEO'],
  },
  {
    title: L('Jrad Beauty Center Blog Website', 'Blog Jrad Beauty Center'),
    description: L(
      'A responsive wordpress blog website for Jrad Beauty Center that helps the clients get to know the project and better reach it through a user-friendly and minimalist UI.',
      'Un blog WordPress responsive pour Jrad Beauty Center, qui aide les clients à découvrir le centre et à le contacter plus facilement grâce à une interface simple et minimaliste.',
    ),
    tag: 'WordPress',
    year: '2025',
    role: designBuild,
    output: L('Blog website', 'Blog'),
    image: jradBeauty,
    url: 'https://jradbeautycenter.tn/',
    tech: ['WordPress', 'Elementor', 'PHP', 'SEO', 'Rank Math'],
  },
  {
    title: L('Tunisie Telecom Social Activity Management Website', 'Plateforme de gestion des activités sociales Tunisie Telecom'),
    description: L(
      'A website for Tunisie Telecom, which is a website that manages social activities, accounts and offers of Tunisie Telecom Employees developed using MERN Stack.',
      'Une plateforme pour Tunisie Telecom qui gère les activités sociales, les comptes et les offres destinées aux employés, développée avec la stack MERN.',
    ),
    tag: 'MERN Stack',
    year: '2023',
    role: fullStackDev,
    output: L('Internal web app', 'App web interne'),
    image: ttWebsite,
    url: 'https://github.com/ZiniMedAmine/TTApp',
    tech: ['HTML/CSS', 'React', 'Express.js', 'MongoDB', 'Node.js'],
  },
  {
    title: L('React Calculator', 'Calculatrice React'),
    description: L(
      "A simple React calculator developed purely for the purpose of learning and mastering Tailwind CSS, found it a good idea in terms of learning to use Tailwind's grid system, dark & light theme control and other features of it at that time.",
      'Une calculatrice React simple, développée pour apprendre et maîtriser Tailwind CSS : son système de grille, la gestion des thèmes clair et sombre et ses autres fonctionnalités.',
    ),
    tag: 'React',
    year: '2024',
    role: L('Frontend dev', 'Dev front-end'),
    output: L('Learning project', "Projet d'apprentissage"),
    image: reactCalculator,
    url: 'https://github.com/ZiniMedAmine/React-Calculator',
    tech: ['React', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: L('My Portfolio Website', 'Mon site portfolio'),
    description: L(
      'Explore my personal React portfolio, where I bring creativity and code together-showcasing my graphic design projects, web development work, professional experience, and ways to connect.',
      'Mon portfolio React personnel, où créativité et code se rejoignent : projets de design graphique, développement web, expérience professionnelle et moyens de me contacter.',
    ),
    tag: 'React',
    year: '2026',
    role: designBuild,
    output: L('Portfolio site', 'Site portfolio'),
    image: portfolioWebsite,
    url: '#home',
    tech: ['React', 'Vite', 'CSS'],
  },
  {
    title: L('Medical Exam Simulation Platform', "Plateforme de simulation d'examen médical"),
    description: L(
      'A responsive MERN Stack platform for French-speaking UMF Iasi medical students that simulates exams with randomized questions and exact grading algorithms. An extraction pipeline turned 30 complex PDFs into thousands of structured questions, replacing about 2 months of manual data entry.',
      "Une plateforme d'examens blancs MERN pour les étudiants francophones de l'UMF Iași, avec questions aléatoires et algorithmes de notation exacts. Une chaîne d'extraction de 30 PDF complexes importe des milliers de questions et remplace environ 2 mois de saisie manuelle.",
    ),
    tag: 'MERN Stack',
    year: '2025',
    role: fullStackDev,
    output: L('Exam platform', "Plateforme d'examens blancs"),
    image: umfiasi,
    url: 'https://80umfiasi.me',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'ZanzibarExplore',
    description: L(
      'A WordPress business website for a Zanzibar client where visitors can book activities and excursions. Built to highlight experiences and make inquiries fast on mobile and desktop.',
      'Un site vitrine WordPress pour un client à Zanzibar, où les visiteurs peuvent réserver des activités et des excursions. Conçu pour mettre en valeur les expériences et accélérer les demandes, sur mobile comme sur desktop.',
    ),
    tag: 'WordPress',
    year: '2026',
    role: L('WordPress dev', 'Dev WordPress'),
    output: L('Booking website', 'Site de réservation'),
    image: zanzibarExplore,
    url: 'https://zanzibarexplore.com',
    tech: ['WordPress', 'Elementor', L('Bookings', 'Réservations'), 'SEO'],
  },
  {
    title: L('Sales Data Analysis Mini Project', "Mini-projet d'analyse des ventes"),
    description: L(
      'A compact data analysis project that explores sales performance and patterns using Python, with clear visual summaries and insights.',
      'Un projet compact d’analyse de données qui explore les performances et les tendances de ventes avec Python, avec des synthèses visuelles claires.',
    ),
    tag: L('Data Analysis', 'Analyse de données'),
    year: '2025',
    role: L('Data analysis', 'Analyse de données'),
    output: L('Python project', 'Projet Python'),
    image: dataAnalysisProj,
    url: 'https://github.com/ZiniMedAmine/Sales-Data-Analysis-Mini-Project',
    tech: ['Python', 'Pandas', 'Matplotlib', L('Data Analysis', 'Analyse de données')],
  },
  {
    title: L('K-Means Color Quantization Mini Project', 'Mini-projet de quantification des couleurs K-Means'),
    description: L(
      'An image processing mini project that reduces color palettes using K-Means clustering for cleaner, stylized visuals.',
      "Un mini-projet de traitement d'images qui réduit les palettes de couleurs par clustering K-Means pour des visuels plus nets et stylisés.",
    ),
    tag: L('Computer Vision', 'Vision par ordinateur'),
    year: '2025',
    role: L('Computer vision', 'Vision par ordinateur'),
    output: L('Python project', 'Projet Python'),
    image: colorQuantization,
    url: 'https://github.com/ZiniMedAmine/KMEANS_Color_Quantization',
    tech: ['Python', 'K-Means', 'OpenCV', L('Image Processing', "Traitement d'images")],
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
  const { t } = useLang()
  const particles = useMemo(() => [
    ['12deg', '41cqw', '9px', 'var(--ink)'], ['96deg', '49cqw', '7px', 'var(--yellow-deep)'],
    ['168deg', '41cqw', '7px', 'var(--ink)'], ['250deg', '49cqw', '6px', 'var(--muted-2)'],
    ['318deg', '41cqw', '8px', 'var(--yellow-deep)'],
  ], [])
  const nodeIcons = [FiGlobe, FiLayers, FiDatabase]
  const nodeClasses = ['web', 'svc', 'db']
  const featureIcons = [FiEye, FiMaximize, FiCode]

  return (
    <div className="hero-visual" data-hover aria-hidden="true">
      <div className="hv-layer full" data-depth="0.25">
        <div className="hv-circle" />
      </div>
      <div className="hv-layer full" data-depth="0.12">
        <svg className="arc-label spin-1" viewBox="0 0 100 100">
          <defs><path id="arc-a" d="M 50,50 m -45.5,0 a 45.5,45.5 0 1,1 91,0 a 45.5,45.5 0 1,1 -91,0" /></defs>
          <text><textPath href="#arc-a">{t(ui.arcOuter)}</textPath></text>
        </svg>
        <svg className="arc-label spin-2" viewBox="0 0 100 100">
          <defs><path id="arc-b" d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" /></defs>
          <text><textPath href="#arc-b">{t(ui.arcInner)}</textPath></text>
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
          <div className="hv-ocr">{t(ui.hvText)} <b>{t(ui.hvInvoice)}</b></div>
        </div>
      </div>

      <div className="hv-layer hv-api-wrap" data-depth="1.15">
        <div className="hv-card hv-api">
          <div className="api-pill">API</div>
          <svg viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M50 0 V4 M50 4 H17 V10 M50 4 V10 M50 4 H83 V10" />
          </svg>
          <div className="nodes">
            {ui.hvNodes.map((label, index) => {
              const Icon = nodeIcons[index]
              return <div className={`node ${nodeClasses[index]}`} key={nodeClasses[index]}><Icon /><span>{t(label)}</span></div>
            })}
          </div>
        </div>
      </div>

      <div className="hv-layer hv-icons-wrap" data-depth="0.7">
        <div className="hv-card hv-icons">
          {ui.hvIcons.map((label, index) => {
            const Icon = featureIcons[index]
            return <div className="ic" key={en(label)}><Icon /><span>{t(label)}</span></div>
          })}
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

function WorkShowcase({ id, copy, projects, type, number }) {
  const { t } = useLang()
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

    // Horizontal gestures drive the same vertical scroll, so both directions move the track
    const sticky = wrap.querySelector('.work-sticky')
    const geometry = () => {
      const top = wrap.getBoundingClientRect().top + window.scrollY
      const maxScroll = wrap.offsetHeight - window.innerHeight
      return { top, maxScroll, step: maxScroll / (panels - 1), ratio: maxScroll / ((panels - 1) * window.innerWidth) }
    }
    const isPinned = () => {
      const rect = wrap.getBoundingClientRect()
      return rect.top <= 2 && rect.bottom >= window.innerHeight - 2
    }
    const jump = (y, smooth) => {
      const { top, maxScroll } = geometry()
      window.scrollTo({ top: Math.max(top, Math.min(top + maxScroll, y)), behavior: smooth ? 'smooth' : 'instant' })
    }

    let gesture = null
    const onTouchStart = (event) => {
      if (event.touches.length !== 1 || !isPinned()) return
      const touch = event.touches[0]
      gesture = { x: touch.clientX, y: touch.clientY, scroll: window.scrollY, time: performance.now(), axis: null, dx: 0 }
    }
    const onTouchMove = (event) => {
      if (!gesture) return
      const touch = event.touches[0]
      const dx = touch.clientX - gesture.x
      const dy = touch.clientY - gesture.y
      if (!gesture.axis && Math.hypot(dx, dy) > 8) gesture.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (gesture.axis !== 'x') return
      event.preventDefault()
      gesture.dx = dx
      jump(gesture.scroll - dx * geometry().ratio, false)
    }
    const onTouchEnd = () => {
      if (!gesture || gesture.axis !== 'x') {
        gesture = null
        return
      }
      const { top, step } = geometry()
      const from = Math.round((gesture.scroll - top) / step)
      const fast = Math.abs(gesture.dx) / (performance.now() - gesture.time) > 0.35
      const moved = Math.abs(gesture.dx) > window.innerWidth * 0.18 || (fast && Math.abs(gesture.dx) > 24)
      const target = Math.max(0, Math.min(panels - 1, from + (moved ? (gesture.dx < 0 ? 1 : -1) : 0)))
      jump(top + target * step, true)
      gesture = null
    }
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || !isPinned()) return
      event.preventDefault()
      jump(window.scrollY + event.deltaX * geometry().ratio, false)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    sticky.addEventListener('touchstart', onTouchStart, { passive: true })
    sticky.addEventListener('touchmove', onTouchMove, { passive: false })
    sticky.addEventListener('touchend', onTouchEnd)
    sticky.addEventListener('touchcancel', onTouchEnd)
    sticky.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      sticky.removeEventListener('touchstart', onTouchStart)
      sticky.removeEventListener('touchmove', onTouchMove)
      sticky.removeEventListener('touchend', onTouchEnd)
      sticky.removeEventListener('touchcancel', onTouchEnd)
      sticky.removeEventListener('wheel', onWheel)
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
      data-screen-label={en(copy.eyebrow)}
      ref={wrapRef}
      style={{ height: `${panels * 100}svh` }}
    >
      <div className="work-sticky">
        <div className="work-track" ref={trackRef}>
          <div className="work-intro">
            <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{t(copy.eyebrow)}</span></p>
            <div className="titleblock">
              <h2>{t(copy.title)} <span className="grad">{t(copy.mark)}</span><em>{t(copy.subtitle)}</em></h2>
              <p className="work-note">{t(copy.note)}</p>
            </div>
            <div className="meta-row">
              <div className="count">{projects.length} {t(ui.projects)} - {t(copy.count)}</div>
              <div className="swipe">
                <span className="on-pointer">{t(ui.scrollRight)}</span>
                <span className="on-touch">{t(ui.swipeHint)}</span>
                <span className="arrow" />
              </div>
            </div>
          </div>

          {projects.map((project, index) => {
            const title = t(project.title)
            const [titleHead, titleTail] = splitTitle(title)
            return (
              <article
                className={`project ${index % 2 ? 'alt' : ''}`}
                key={en(project.title)}
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
                  <span className="halo" aria-hidden="true" />
                  <div className="frame"><img src={project.images?.[0] || project.image} alt={title} loading="lazy" /></div>
                </div>
                <div className="project-info">
                  <span className="kind">{t(project.tag)} - {project.year}</span>
                  <h3>{titleHead && <>{titleHead} </>}<em>{titleTail}</em></h3>
                  <p>{t(project.description)}</p>
                  <div className="specs">
                    <div className="spec"><div className="label">{t(ui.role)}</div><div className="value">{t(project.role)}</div></div>
                    <div className="spec"><div className="label">{t(ui.year)}</div><div className="value">{project.year}</div></div>
                    <div className="spec"><div className="label">{t(ui.output)}</div><div className="value">{t(project.output)}</div></div>
                  </div>
                  {project.tech && (
                    <div className="tools compact">
                      {project.tech.map((tech) => <span className="tool" key={en(tech)}>{t(tech)}</span>)}
                    </div>
                  )}
                  <div className="project-actions" onClick={(event) => event.stopPropagation()}>
                    <button className="link solid" onClick={() => open(project)}>{t(ui.openCase)} <span className="arrow" /></button>
                    {project.url && <a className="link" href={project.url} target={project.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{t(project.cta || (type === 'design' ? ui.viewBehance : ui.viewProject))} <span className="arrow" /></a>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="work-progress" aria-hidden="true">
          <span className="label">P - <span data-work-count ref={countRef}>00</span> / {String(panels - 1).padStart(2, '0')}</span>
          <span className="bar"><span className="fill" ref={fillRef} /></span>
          <span className="label">{t(ui.scrollAdvance)}</span>
        </div>
      </div>

      {openProject && createPortal(
        <div className="modal-backdrop" onClick={() => setOpenProject(null)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenProject(null)} aria-label={t(ui.closeProject)}>×</button>
            <div className="modal-media">
              <img src={activeImages[imageIndex]} alt={t(openProject.title)} />
              {activeImages.length > 1 && (
                <>
                  <div className="modal-arrows">
                    <button onClick={() => setImageIndex((imageIndex - 1 + activeImages.length) % activeImages.length)} aria-label={t(ui.prevImage)}>‹</button>
                    <button onClick={() => setImageIndex((imageIndex + 1) % activeImages.length)} aria-label={t(ui.nextImage)}>›</button>
                  </div>
                  <div className="modal-dots" aria-hidden="true">
                    {activeImages.map((image, index) => <i key={image} className={index === imageIndex ? 'on' : ''} />)}
                  </div>
                </>
              )}
            </div>
            <div className="modal-body">
              <span className="kind">{t(openProject.tag)} - {openProject.year}</span>
              <h3>{t(openProject.title)}</h3>
              <p>{t(openProject.description)}</p>
              {openProject.tech && <div className="tools compact">{openProject.tech.map((tech) => <span className="tool" key={en(tech)}>{t(tech)}</span>)}</div>}
              {openProject.url && <a className="link solid" href={openProject.url} target={openProject.url.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">{t(openProject.cta || ui.openProject)} <span className="arrow" /></a>}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}

function Portfolio() {
  usePortfolioInteractions()
  const { t } = useLang()
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
          <span className="meta">{t(L('software & AI', 'logiciel & IA'))}</span>
        </a>
        <ul>
          <li className="nav-indicator" aria-hidden="true" />
          {navLinks.map(([href, label]) => <li key={href}><a href={href}>{t(label)}</a></li>)}
        </ul>
        <div className="nav-end">
          <LangSwitch />
          <div className="availability"><span className="dot" /><span>{t(ui.availability)}</span></div>
          <button
            className="menu-btn"
            aria-label={t(menuOpen ? ui.menuClose : ui.menuOpen)}
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
                <span className="n">{String(index + 1).padStart(2, '0')}</span>{t(label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="availability"><span className="dot" /><span>{t(ui.availability)}</span></div>
      </div>

      <main>
        <section id="home" className="section hero" data-screen-label="01 Hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal-stagger">
              <p className="eyebrow"><span className="num">01</span><span className="line" /><span>{t(ui.heroEyebrow)}</span></p>
              <h1>
                <span className="split-line"><span>Mohamed</span></span>
                <span className="split-line"><span>Amine Zini<span className="it">,</span></span></span>
                <span className="split-line"><span className="grad">{t(ui.heroRole)}</span></span>
                <span className="split-line designer"><span>{t(ui.heroDesigner)}</span></span>
              </h1>
              <div className="role">
                <span className="line" />
                <span>{t(ui.currently)}</span>
                <span className="now"><span className="now-track">
                  {[...ui.rotating, ui.rotating[0]].map((item, index) => <span key={index}>{t(item)}</span>)}
                </span></span>
              </div>
              <p className="lede hero-lede">{t(ui.heroLede)}</p>
              <div className="hero-meta">
                <div className="item"><div className="label">{t(ui.based)}</div><div className="value">Laval, France</div></div>
                <div className="item"><div className="label">{t(ui.discipline)}</div><div className="value">{t(ui.disciplineValue)}</div></div>
                <div className="item"><div className="label">{t(ui.status)}</div><div className="value">{t(ui.statusValue)}</div></div>
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="container hero-foot">
            <span>© Zini studio - {year}</span>
            <a href="#about" className="scrolldown"><span>{t(ui.scrollExplore)}</span><span className="arrow" /></a>
            <span>v 2.0</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {ui.marquee.map((item, index) => (
              <span key={`${en(item)}-${index}`}>{t(item)}</span>
            ))}
          </div>
        </div>

        <section id="about" className="section about" data-screen-label="02 About">
          <div className="container about-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">02</span><span className="line" /><span>{t(ui.about)}</span></p>
              <h2>{t(ui.aboutTitle[0])}<em>{t(ui.aboutTitle[1])}</em>{t(ui.aboutTitle[2])}</h2>
            </div>
            <div className="about-body reveal">
              <p className="lede">{t(ui.aboutLede)}</p>
              <p>{t(ui.aboutP1)}</p>
              <p>{t(ui.aboutP2)}</p>
              <p>{t(ui.aboutP3)}</p>
            </div>
          </div>
          <div className="container about-stats reveal-stagger">
            <div className="stat"><div className="num"><span data-count="3">3</span><span className="unit">{t(ui.yrs)}</span></div><div className="label">{t(ui.stats[0])}</div></div>
            <div className="stat"><div className="num"><span data-count="10">10</span>+</div><div className="label">{t(ui.stats[1])}</div></div>
            <div className="stat"><div className="num"><span data-count="6">6</span>+</div><div className="label">{t(ui.stats[2])}</div></div>
            <div className="stat"><div className="num"><span data-count="50">50</span>+</div><div className="label">{t(ui.stats[3])}</div></div>
          </div>
        </section>

        <section id="expertise" className="section expertise" data-screen-label="03 Expertise">
          <div className="container expertise-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">03</span><span className="line" /><span>{t(ui.expertise)}</span></p>
              <h2>{t(ui.expertiseTitle[0])}<em>{t(ui.expertiseTitle[1])}</em></h2>
            </div>
            <div className="disciplines">
              {skills.map((skill) => (
                <div className="discipline reveal" key={skill.idx} data-hover>
                  <span className="idx">{skill.idx}</span>
                  <span className="icon" aria-hidden="true"><skill.icon /></span>
                  <div>
                    <h3>{t(skill.title)}</h3>
                    <p className="desc">{t(skill.desc)}</p>
                    <div className="tools">{skill.tools.map((tool) => <span className="tool" key={en(tool)}>{t(tool)}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section experience" data-screen-label="04 Experience">
          <div className="container experience-grid">
            <div className="reveal">
              <p className="eyebrow"><span className="num">04</span><span className="line" /><span>{t(ui.experience)}</span></p>
              <h2>{t(ui.experienceTitle[0])}<em>{t(ui.experienceTitle[1])}</em></h2>
            </div>
            <div className="timeline">
              {experiences.map((item) => (
                <article className="experience-card reveal" key={`${item.year}-${en(item.role)}`}>
                  <span className="idx">{item.year}</span>
                  <div className="experience-main">
                    <div className="experience-top">
                      <div>
                        <span className="kind">{t(item.company)} - {t(item.type)}</span>
                        <h3>{t(item.role)}</h3>
                      </div>
                      <span className="role-type">{t(item.type)}</span>
                    </div>
                    <p>{t(item.desc)}</p>
                    <div className="tools compact">{item.stack.map((tech) => <span className="tool" key={en(tech)}>{t(tech)}</span>)}</div>
                    <div className="wins">{item.wins.map((win) => <span key={en(win)}>{t(win)}</span>)}</div>
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
                <p className="eyebrow"><span className="num">05</span><span className="line" /><span>{t(ui.education)}</span></p>
                <h2>{t(ui.educationTitle[0])}<em>{t(ui.educationTitle[1])}</em></h2>
              </div>
              <p className="education-sub">{t(ui.educationSub)}</p>
            </div>

            <ol className="route reveal-stagger" aria-label={t(ui.educationAria)}>
              {education.map((stop) => (
                <li className={`stop is-${stop.state}`} key={stop.school}>
                  <div className="stop-rail" aria-hidden="true">
                    <span className="stop-dot">{stop.state === 'done' && <FiCheck />}</span>
                  </div>
                  <span className="stop-when">{t(stop.when)}</span>
                  <article className="stop-card" data-hover>
                    {stop.state === 'current' && <span className="stop-now">{t(ui.now)}</span>}
                    <span className="stop-place"><FiMapPin aria-hidden="true" /><span className="cc">{stop.country}</span>{t(stop.city)}</span>
                    <h3>{t(stop.degree)}</h3>
                    <p className="stop-school">{stop.school}</p>
                    <span className="stop-status">{t(stop.status)}</span>
                  </article>
                </li>
              ))}
              <li className="stop is-next">
                <div className="stop-rail" aria-hidden="true"><span className="stop-dot" /></div>
                <span className="stop-when">{t(ui.nextWhen)}</span>
                <article className="stop-card">
                  <span className="stop-place"><FiMapPin aria-hidden="true" /><span className="cc">FR</span>{t(ui.nextPlace)}</span>
                  <h3>{t(ui.nextTitle)}</h3>
                  <p className="stop-school">{t(ui.nextDetail)}</p>
                  <a href="#contact" className="stop-cta">{t(ui.nextCta)} <FiArrowRight aria-hidden="true" /></a>
                </article>
              </li>
            </ol>

            <div className="languages reveal">
              <span className="languages-label">{t(ui.languages)}</span>
              <ul>
                {spokenLanguages.map(([language, level, score]) => (
                  <li key={en(language)}>
                    <strong>{t(language)}</strong>
                    <span className="lvl" aria-label={`${t(level)}, ${score} ${t(ui.outOf5)}`}>
                      {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= score ? 'on' : ''} />)}
                    </span>
                    <span className="lvl-name">{t(level)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <WorkShowcase id="dev-work" copy={ui.devWork} projects={devProjects} type="dev" number="06" />
        <WorkShowcase id="design-work" copy={ui.designWork} projects={designProjects} type="design" number="07" />

        <Contact socials={socials} />
      </main>

      <footer className="footer" data-screen-label="Footer">
        <div className="footer-grid">
          <div className="footer-lead">
            <div className="signoff">{t(ui.signoff[0])}<br /><em>{t(ui.signoff[1])}</em>, {year}.</div>
            <a href="#home" className="to-top">{t(ui.toTop)} <span className="arrow" aria-hidden="true" /></a>
          </div>
          <div className="colophon">
            <div className="row"><span>{t(ui.colophon[0])}</span><strong>Zini DS - v2.0</strong></div>
            <div className="row"><span>{t(ui.colophon[1])}</span><strong>Plus Jakarta Sans - JetBrains Mono</strong></div>
            <div className="row"><span>{t(ui.colophon[2])}</span><strong>React - Vite - CSS</strong></div>
            <div className="row"><span>{t(ui.colophon[3])}</span><strong>{t(ui.lastUpdate)}</strong></div>
          </div>
        </div>
        <div className="bottom">
          <span>{t(ui.rights)}</span>
          <span className="skeptic"><img src={skepticLogo} alt="Skeptic alias" /><span>{t(ui.skeptic)}</span></span>
        </div>
      </footer>
    </>
  )
}

function App() {
  return (
    <LangProvider>
      <Portfolio />
    </LangProvider>
  )
}

export default App
