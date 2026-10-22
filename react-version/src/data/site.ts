/**
 * All website content lives here so it can be edited without touching the layout.
 */
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  FileText,
  GraduationCap,
  Heart,
  Music,
  Palette,
  PersonStanding,
  Presentation,
  ScrollText,
  Star,
  Trophy,
  Users,
} from 'lucide-react'

import logo from '../assets/images/logo.webp'
import heroProcession from '../assets/images/hero-procession.webp'
import principalPhoto from '../assets/images/principal.webp'
import slgtRunnerUp from '../assets/images/slgt-runner-up.webp'
import classEastern from '../assets/images/class-eastern.webp'
import classBallet from '../assets/images/class-ballet.webp'
import journeyDance from '../assets/images/journey-dance.webp'
import journeyMusic from '../assets/images/journey-music.webp'
import journeyChild from '../assets/images/journey-child.webp'
import journeyArts from '../assets/images/journey-arts.webp'
import galleryStage from '../assets/images/gallery-stage.webp'
import galleryEnsemble from '../assets/images/gallery-ensemble.webp'
import galleryLearning from '../assets/images/gallery-learning.webp'
import galleryClassroom from '../assets/images/gallery-classroom.webp'

export const images = {
  logo,
  heroProcession,
  principalPhoto,
  slgtRunnerUp,
  classEastern,
  classBallet,
}

/* ------------------------------------------------------------------ */
/* Contact details                                                     */
/* ------------------------------------------------------------------ */

export const contact = {
  phones: [
    { display: '071 641 3221', tel: '+94716413221' },
    { display: '071 955 1071', tel: '+94719551071' },
  ],
  /** WhatsApp number in international format, digits only. */
  whatsapp: '94716413221',
  email: 'amrithaschoolofdance@gmail.com',
  /** Paste the student LMS address here. While empty, the button shows a "coming soon" notice. */
  lmsUrl: '',
  /** Paste your page links here. Icons without a link are shown but not clickable. */
  social: {
    facebook: '',
    youtube: '',
    instagram: '',
  },
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'classes', label: 'Classes' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
export const sectionIds: SectionId[] = navLinks.map((l) => l.id)

/* ------------------------------------------------------------------ */
/* Principal                                                           */
/* ------------------------------------------------------------------ */

export const principal = {
  name: 'Amritha Manage',
  roles: ['Principal', 'Dance Educator', 'Government School Teacher'],
  traits: ['Dedicated', 'Passionate', 'Inspiring'],
  milestones: [
    { icon: GraduationCap, title: '2015', detail: 'University of the Visual & Performing Arts' },
    { icon: BookOpen, title: '2016 – Present', detail: 'Government School Teaching Experience' },
    { icon: ScrollText, title: 'Postgraduate Diploma in Education', detail: 'University of Colombo' },
    { icon: Trophy, title: 'Sri Lanka’s Got Talent', detail: 'Runners Up' },
    { icon: Star, title: '10 Years', detail: 'of Experience' },
  ] satisfies { icon: LucideIcon; title: string; detail: string }[],
  /** Each inner array is one block of paragraphs. */
  bio: [
    [
      'Amritha Manage is the Principal of Amritha School of Dance and a dedicated educator with a strong background in dance, performing arts and formal education. Her professional journey reflects a deep commitment to artistic excellence, cultural preservation and the development of young learners.',
      'She graduated from the University of the Visual and Performing Arts in 2015, establishing a strong academic foundation in the performing arts. Driven by her passion for Sri Lankan traditional dance, she also trained at the renowned Chithrasena Dance School and had opportunities to learn from distinguished Sri Lankan dance artists and teachers, including Ravi Bandu Vidyapathi, Kulasiri Budawatta and Gamini Kamal.',
    ],
    [
      'Since 2016, she has served as a government-school teacher, gaining valuable experience in teaching, student guidance and educational development. Her experience in the formal education sector has strengthened her understanding of student learning, discipline and the importance of creating a supportive environment for young people.',
      'Further advancing her academic and professional development, she completed a Postgraduate Diploma in Education at the University of Colombo. In recognition of her merit-level academic achievement, she was appointed as a master teacher to guide junior batches of postgraduate diploma students, sharing knowledge, supporting their learning and helping them progress in their academic journey.',
      'She is currently pursuing a Master’s degree in Education, demonstrating her continued commitment to professional growth and educational excellence.',
    ],
    [
      'As the Principal of Amritha School of Dance, Amritha Manage brings together artistic knowledge, practical teaching experience and an understanding of educational development. She is committed to nurturing each student’s individual talents while encouraging creativity, confidence, discipline, dedication and respect for Sri Lanka’s rich cultural heritage.',
      'Her educational philosophy extends beyond dance technique and stage performance. She believes that arts education can play an important role in shaping character, strengthening self-expression and helping children develop the confidence to face future challenges.',
    ],
    [
      'Under her guidance, Amritha School of Dance continues to create opportunities for students to learn, perform, participate in cultural events and discover their potential in a positive and encouraging environment.',
      'As Amritha Arts & Development expands into broader arts education and child development initiatives, her combined experience in performing arts and formal education provides a valuable foundation for the institution’s long-term vision.',
    ],
  ],
}

/* ------------------------------------------------------------------ */
/* Teaching philosophy                                                 */
/* ------------------------------------------------------------------ */

export const philosophy = {
  intro:
    'We believe in a balanced approach to education, combining practical experience with strong theoretical understanding. Our teaching methods include:',
  methods: [
    {
      icon: Presentation,
      title: 'Practical Learning',
      text: 'demonstrations, guided practice, rehearsals and hands-on sessions.',
    },
    {
      icon: BookOpen,
      title: 'Theoretical Learning',
      text: 'understanding the principles, concepts, history and knowledge behind each subject.',
    },
    {
      icon: Users,
      title: 'Activity-Based Learning',
      text: 'games, creative tasks, group activities, projects, challenges and interactive exercises.',
    },
    {
      icon: Star,
      title: 'Performance & Project-Based Learning',
      text: 'applying acquired knowledge and skills through performances, presentations and practical projects.',
    },
    {
      icon: Heart,
      title: 'Student-Centred Learning',
      text: 'supporting individual progress, creativity, confidence and different learning abilities.',
    },
  ] satisfies { icon: LucideIcon; title: string; text: string }[],
}

/* ------------------------------------------------------------------ */
/* Creative journey (programme cards)                                  */
/* ------------------------------------------------------------------ */

export type JourneyIcon = 'lotus' | LucideIcon

export const journeys: {
  id: string
  title: string
  lines: [string, string]
  image: string
  imageAlt: string
  icon: JourneyIcon
  /** Section the card links to. */
  target: SectionId
}[] = [
  {
    id: 'dance',
    title: 'Dance',
    lines: ['Traditional · Contemporary', 'Ballet & More'],
    image: journeyDance,
    imageAlt: 'Dancer in traditional Sri Lankan costume and headdress',
    icon: 'lotus',
    target: 'classes',
  },
  {
    id: 'music',
    title: 'Music',
    lines: ['Vocal · Instrumental', 'Traditional & Modern'],
    image: journeyMusic,
    imageAlt: 'Hands playing a traditional drum beside a microphone',
    icon: Music,
    target: 'contact',
  },
  {
    id: 'child-development',
    title: 'Child Development',
    lines: ['Creative Activities', '& Life Skills'],
    image: journeyChild,
    imageAlt: 'Young children doing a creative activity together',
    icon: Users,
    target: 'contact',
  },
  {
    id: 'arts',
    title: 'Arts',
    lines: ['Visual Arts · Crafts', 'Creative Expression'],
    image: journeyArts,
    imageAlt: 'A hand painting with bright colours',
    icon: Palette,
    target: 'contact',
  },
]

/* ------------------------------------------------------------------ */
/* Classes                                                             */
/* ------------------------------------------------------------------ */

export type ModuleId = 'theory' | 'practical' | 'paper'

export const classModules: { id: ModuleId; label: string; icon: LucideIcon }[] = [
  { id: 'theory', label: 'Theory', icon: BookOpen },
  { id: 'practical', label: 'Practical', icon: PersonStanding },
  { id: 'paper', label: 'Paper Classes', icon: FileText },
]

export type ClassId = 'eastern' | 'ballet'

export type DanceClass = {
  id: ClassId
  title: string
  image: string
  imageAlt: string
  medium: string
  ages: string
  agesNote: string
  intro: string
  modules: Record<ModuleId, { summary: string; points: string[] }>
}

export const danceClasses: DanceClass[] = [
  {
    id: 'eastern',
    title: 'Eastern',
    image: classEastern,
    imageAlt: 'Eastern dancer in a red and gold costume performing a graceful pose',
    medium: 'Sinhala & English',
    ages: '3 – 18',
    agesNote: 'After A/L, Adults & Teachers',
    intro:
      'Discover the grace, rhythm and storytelling of Eastern dance. Students build a strong foundation in Sri Lankan traditional dance through theory, practical training and exam-focused paper classes.',
    modules: {
      theory: {
        summary:
          'Understand the history, principles and terminology behind Eastern dance and the cultural background of each form.',
        points: ['History & cultural background', 'Rhythm, terminology and principles', 'Knowledge behind each dance form'],
      },
      practical: {
        summary:
          'Guided practice in posture, footwork, hand gestures and expression, progressing to complete dance items and stage performance.',
        points: ['Posture, footwork & hand gestures', 'Complete dance items', 'Rehearsals & stage performance'],
      },
      paper: {
        summary: 'Focused written-paper practice and revision that prepares students confidently for their examinations.',
        points: ['Past-paper practice', 'Model answers & revision', 'Exam preparation'],
      },
    },
  },
  {
    id: 'ballet',
    title: 'Ballet',
    image: classBallet,
    imageAlt: 'Ballerina in a white tutu performing an arabesque',
    medium: 'Sinhala & English',
    ages: '3 – 18',
    agesNote: 'After A/L, Adults & Teachers',
    intro:
      'Develop poise, strength and musicality through classical ballet. Lessons combine technique, theory and written practice in a supportive, encouraging environment.',
    modules: {
      theory: {
        summary: 'Learn ballet history, French terminology and the principles behind correct technique.',
        points: ['Ballet history & terminology', 'Technique principles', 'Music and rhythm awareness'],
      },
      practical: {
        summary: 'Barre and centre work that builds posture, flexibility and control, leading to choreographed pieces.',
        points: ['Barre & centre work', 'Turns, jumps & flexibility', 'Choreography & performance'],
      },
      paper: {
        summary: 'Structured written-paper practice and revision for ballet theory examinations.',
        points: ['Past-paper practice', 'Model answers & revision', 'Exam preparation'],
      },
    },
  },
]

/* ------------------------------------------------------------------ */
/* Achievements & gallery                                              */
/* ------------------------------------------------------------------ */

export const achievement = {
  kicker: 'Our Achievements',
  title: 'Proud Moments',
  award: 'Sri Lanka’s Got Talent – Runners Up',
  text: 'A journey of passion, dedication and teamwork that brought us to the national stage. This achievement reminds us that dreams, hard work and belief can create beautiful possibilities.',
}

export type GalleryItem = { src: string; alt: string; caption: string }

/** The first four photos appear as the gallery preview on the home page. */
export const galleryItems: GalleryItem[] = [
  { src: galleryStage, alt: 'Dancer in a golden costume performing on a lit stage', caption: 'On stage' },
  { src: galleryEnsemble, alt: 'Ensemble of dancers performing together on stage', caption: 'Ensemble performance' },
  { src: galleryLearning, alt: 'Students learning together in a bright classroom', caption: 'Learning together' },
  { src: galleryClassroom, alt: 'Students seated during a classroom session', caption: 'Classroom sessions' },
  { src: heroProcession, alt: 'Dancers in traditional costume walking together in procession', caption: 'Tradition in motion' },
  { src: slgtRunnerUp, alt: 'Three Kandyan dancers on the Sri Lanka’s Got Talent stage', caption: 'Sri Lanka’s Got Talent – Runners Up' },
  { src: classEastern, alt: 'Eastern dancer in a red and gold costume', caption: 'Eastern dance' },
  { src: classBallet, alt: 'Ballerina performing an arabesque', caption: 'Ballet' },
  { src: journeyDance, alt: 'Dancer in traditional costume and headdress', caption: 'Dance' },
  { src: journeyMusic, alt: 'Hands playing a traditional drum', caption: 'Music' },
  { src: journeyChild, alt: 'Children doing a creative activity', caption: 'Child development' },
  { src: journeyArts, alt: 'A hand painting with bright colours', caption: 'Arts' },
]

export const SLGT_GALLERY_INDEX = 5

export const footerDisciplines = ['Dance', 'Music', 'Child Development', 'Arts']
