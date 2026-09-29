export type Category = 'All' | 'UI/UX & Product Design' | 'Graphics & Marketing';

/** Sub-categories available only when a project's category is "Graphics & Marketing". */
export const GRAPHICS_SUBCATEGORIES = [
  'Social Media Design',
  'Branding & Identity',
  'Pamphlets & Flyers',
  'Product Images & Packaging',
  'Thumbnail Design',
  'Posters & Banners',
  'Print & Marketing Collateral',
  'Presentation Design',
] as const;
export type GraphicsSubcategory = (typeof GRAPHICS_SUBCATEGORIES)[number];

export interface CaseStudyData {
  challenge: string;
  approach: string;
  outcome: string;
  processSteps: { label: string; desc: string }[];
  processImages: { src: string; caption: string; wide?: boolean }[];
  finalImages: { src: string; caption: string }[];
  metrics?: { num: string; label: string }[];
  nextSlug?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  categories: Category[];
  year: string;
  duration: string;
  tools: string[];
  image: string;
  imageBg: string;
  featured?: boolean;
  wide?: boolean;
  accent?: string;
  /** When true, clicking the card opens a fast, high-res image lightbox instead of navigating to a case-study page. */
  galleryView?: boolean;
  caseStudy?: CaseStudyData;
  /** Optional discovery keywords (not shown on cards; for future search/filtering use). */
  tags?: string[];
  /** Only meaningful when categories includes "Graphics & Marketing". */
  subCategory?: GraphicsSubcategory | string;
}

export const projects: Project[] = [
  {
    id: 'iraq-pay',
    slug: 'iraq-pay',
    title: 'IRAQ PAY',
    subtitle: 'Enterprise UX · Product Design',
    description:
      'Redesigned a complex enterprise platform used by thousands of field engineers, reducing task completion time by 38% through streamlined information architecture and a new design system.',
    role: 'Lead UI/UX Designer',
    categories: ['UI/UX & Product Design'],
    year: '2026',
    duration: '8 months',
    tools: ['Figma'],
    image: 'https://i.postimg.cc/pdMB0pXV/IRAQPAY-3.jpg',
    imageBg: '#0D1117',
    featured: true,
    wide: true,
    accent: '#3730B8',
    caseStudy: {
      challenge:
        'OnPoint 1.x was a fragmented product built over 5 years by multiple teams. Field engineers — many working in low-connectivity environments — were spending 40% of their time navigating the wrong screens, re-entering data, and raising support tickets for tasks the UI should have made obvious. The cognitive load was unsustainable.',
      approach:
        'I led a full-cycle redesign: stakeholder workshops to align on core jobs-to-be-done, field visits observing engineers on-site, competitive analysis across 12 enterprise tools, and a 3-month design sprint culminating in a validated design system and high-fidelity prototype.',
      outcome:
        'The redesigned platform saw a 38% reduction in task completion time in moderated testing, a 61% reduction in support tickets related to navigation, and was adopted as the design standard across all Amentum digital products.',
      processSteps: [
        { label: '01 Discover', desc: 'Stakeholder interviews, field visits, and heuristic analysis of existing product.' },
        { label: '02 Define', desc: 'Jobs-to-be-done mapping, persona refinement, and problem statement alignment.' },
        { label: '03 Research', desc: 'Competitive benchmarking across 12 enterprise tools. User journey mapping.' },
        { label: '04 Ideate', desc: 'Design studio workshops. Information architecture redesign. Flow diagrams.' },
        { label: '05 Design', desc: 'Wireframes → high-fidelity screens. Design system with 600+ components.' },
        { label: '06 Prototype', desc: 'Interactive prototypes in Principle and Figma for moderated testing.' },
        { label: '07 Test', desc: '3 rounds of moderated usability testing with 24 engineers across 4 sites.' },
        { label: '08 Refine', desc: 'Iteration based on findings. Accessibility audit and handoff to engineering.' },
      ],
      processImages: [
        {
          src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=1200&h=800&fit=crop&auto=format',
          caption: 'Affinity mapping session — grouping user pain points into themes',
          wide: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop&auto=format',
          caption: 'Information architecture restructure — card sorting and tree testing',
        },
        {
          src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop&auto=format',
          caption: 'Design system: core component library built in Figma',
        },
        {
          src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop&auto=format',
          caption: 'Wireframe explorations: navigation patterns and dashboard layout',
          wide: true,
        },
      ],
      finalImages: [
        {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&auto=format',
          caption: 'Final design: Command centre dashboard with real-time field status',
        },
        {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&auto=format',
          caption: 'Mobile companion: offline-first field logging interface',
        },
      ],
      metrics: [
        { num: '38%', label: 'Faster task completion' },
        { num: '61%', label: 'Fewer support tickets' },
        { num: '600+', label: 'Design system components' },
        { num: '24', label: 'Engineers tested with' },
      ],
      nextSlug: 'fund-my-deductible',
    },
  },
  {
    id: 'cdm-cashpro',
    slug: 'cdm-cashpro',
    title: 'CashPro',
    subtitle: 'CDM · Fintech',
    description:
      'A zero-to-launch product design for a banking platform. Designed the full product experience from discovery to high-fidelity screens and an interactive prototype.',
    role: 'UI/UX Designer',
    categories: ['UI/UX & Product Design'],
    year: '2026',
    duration: '5 months',
    tools: ['Figma', 'FigJam', 'Lottie', 'Maze'],
    image: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/Cover_Mockup_7',
    imageBg: '#0A1628',
    accent: '#1D4ED8',
    caseStudy: {
      challenge:
        'Healthcare deductibles can blindside patients with four-figure bills at the worst possible moment. Fund My Deductible needed to make healthcare financing feel accessible, transparent, and trustworthy — in a space where incumbent apps were either confusing or predatory.',
      approach:
        'I conducted discovery research with 18 patients across income brackets, mapped the emotional journey of a medical bill, and designed a product that foregrounds transparency and empowerment. The visual language was calibrated to feel secure and human — not clinical or financial.',
      outcome:
        'The MVP launched on iOS with a 4.7 App Store rating within 90 days. The onboarding completion rate hit 84%, and the core financing flow was completed without support in over 90% of sessions.',
      processSteps: [
        { label: '01 Discover', desc: '18 user interviews exploring healthcare billing anxiety and financing behaviour.' },
        { label: '02 Empathy', desc: 'Patient journey mapping: from diagnosis to payment. Identifying emotional lows.' },
        { label: '03 Define', desc: 'Core job: make financing feel safe, fast, and shame-free.' },
        { label: '04 Ideate', desc: 'Concept exploration across 4 distinct interaction paradigms.' },
        { label: '05 Design', desc: 'iOS-native UI with custom illustration and micro-animation system.' },
        { label: '06 Test', desc: 'Unmoderated testing via Maze. 3 iterations on onboarding flow.' },
      ],
      processImages: [
        {
          src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format',
          caption: 'User research session — mapping the emotional journey of a medical bill',
          wide: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format',
          caption: 'Early wireframes exploring the financing application flow',
        },
        {
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format',
          caption: 'High-fidelity prototype: the primary repayment dashboard',
        },
      ],
      finalImages: [
        {
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop&auto=format',
          caption: 'Final product: onboarding and dashboard',
        },
        {
          src: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1400&h=900&fit=crop&auto=format',
          caption: 'Financing calculator and plan selection flow',
        },
      ],
      metrics: [
        { num: '4.7★', label: 'App Store rating' },
        { num: '84%', label: 'Onboarding completion' },
        { num: '90%+', label: 'Support-free sessions' },
        { num: '90d', label: 'To launch' },
      ],
      nextSlug: 'dbs-ux-audit',
    },
  },
  {
    id: 'spinlab-ai',
    slug: 'spinlab-ai',
    title: 'SpinLab AI',
    subtitle: 'UX Research · Interaction Design',
    description:
      'Conducted an in-depth interactive UX audit identifying 47 critical usability issues and delivering a prioritised redesign roadmap with annotated wireframes.',
    role: 'UX Researcher & Designer',
    categories: ['UI/UX & Product Design'],
    year: '2025',
    duration: '6 weeks',
    tools: ['Figma', 'Maze', 'Hotjar', 'Notion'],
    image: 'https://i.postimg.cc/BZmMqSN8/Cover-Mockup-(9).jpg',
    imageBg: '#061220',
    accent: '#0F4C81',
    caseStudy: {
      challenge:
        'DBS Interactive had accumulated significant UX debt across their digital products. High bounce rates on key conversion pages and a rising volume of user complaints signalled that something fundamental was broken — but the team lacked a structured framework to prioritise fixes.',
      approach:
        'I ran a comprehensive expert audit using Nielsen\'s heuristics, combined with session recording analysis (Hotjar), unmoderated user testing (Maze), and annotated walkthroughs. Findings were organised into a severity matrix and delivered as an actionable roadmap.',
      outcome:
        '47 usability issues identified across severity levels P1–P4. The roadmap was adopted wholesale, and the 9 P1 issues were resolved in the following sprint, resulting in a measurable improvement in conversion rate.',
      processSteps: [
        { label: '01 Audit Brief', desc: 'Scope definition, audit methodology, and stakeholder alignment.' },
        { label: '02 Heuristic Review', desc: 'Expert walkthrough using Nielsen\'s 10 usability heuristics.' },
        { label: '03 Session Analysis', desc: 'Hotjar session recordings and heatmap analysis across 500 sessions.' },
        { label: '04 User Testing', desc: 'Unmoderated testing via Maze with 20 participants. Task completion analysis.' },
        { label: '05 Synthesis', desc: 'Issues grouped, severity rated, and mapped to user impact vs fix effort.' },
        { label: '06 Recommendations', desc: 'Annotated wireframes + redesign roadmap with implementation guidance.' },
      ],
      processImages: [
        {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format',
          caption: 'Audit findings dashboard — severity matrix across 47 identified issues',
          wide: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&auto=format',
          caption: 'Annotated UX audit wireframes with issue callouts and recommendations',
        },
        {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
          caption: 'Heatmap analysis: identifying navigation dead zones',
        },
      ],
      finalImages: [
        {
          src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&h=900&fit=crop&auto=format',
          caption: 'Redesign recommendations: key screens before and after',
        },
      ],
      metrics: [
        { num: '47', label: 'Issues identified' },
        { num: '9', label: 'P1 issues resolved in sprint' },
        { num: '500+', label: 'Sessions analysed' },
        { num: '20', label: 'Users tested' },
      ],
      nextSlug: 'laptop-outlet',
    },
  },
  {
    id: 'impact-flow',
    slug: 'impact-flow',
    title: 'Impact Flow',
    subtitle: 'Web Design',
    description:
      'Analysed the full e-commerce funnel for a leading UK retailer, uncovering friction points that contributed to a projected 22% uplift in conversion rate post-redesign.',
    role: 'UX Designer',
    categories: ['UI/UX & Product Design'],
    year: '2025',
    duration: '4 weeks',
    tools: ['Figma', 'Hotjar', 'Google Analytics', 'Optimal Workshop'],
    image: 'https://i.postimg.cc/gJdN0rfh/Cover-Mockup-(12).jpg',
    imageBg: '#111111',
    wide: true,
    accent: '#374151',
    caseStudy: {
      challenge:
        'Laptop Outlet had strong organic traffic but a checkout abandonment rate of 74%. The product pages, cart, and checkout flow had accumulated years of patches that created inconsistent interactions and trust-eroding UX patterns.',
      approach:
        'A full funnel audit from landing to confirmation. I used GA4 data to identify drop-off points, Hotjar for rage-click and scroll analysis, and conducted tree testing with Optimal Workshop to validate navigation assumptions.',
      outcome:
        'The audit uncovered 31 friction points, with the top 5 directly attributable to checkout abandonment. A projected conversion rate uplift of 22% was validated through A/B testing of the redesigned checkout flow.',
      processSteps: [
        { label: '01 Analytics', desc: 'GA4 funnel analysis. Drop-off identification at every conversion step.' },
        { label: '02 Heatmaps', desc: 'Hotjar scroll, click, and rage-click analysis across 6 key pages.' },
        { label: '03 Tree Testing', desc: 'Navigation structure tested with 40 participants via Optimal Workshop.' },
        { label: '04 Expert Audit', desc: 'Heuristic walkthrough across product, cart, and checkout flows.' },
        { label: '05 Redesign', desc: 'Annotated wireframes for high-impact fixes. Checkout flow redesign.' },
        { label: '06 Validate', desc: 'A/B test setup and projected metrics validated against test data.' },
      ],
      processImages: [
        {
          src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=800&fit=crop&auto=format',
          caption: 'Funnel analysis: conversion drop-off mapped across the purchase journey',
          wide: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&auto=format',
          caption: 'Rage-click heatmap analysis — identifying broken interactive elements',
        },
        {
          src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop&auto=format',
          caption: 'Redesigned product page wireframe with improved trust signals',
        },
      ],
      finalImages: [
        {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&auto=format',
          caption: 'Checkout redesign: streamlined 3-step flow replacing the 7-step original',
        },
      ],
      metrics: [
        { num: '22%', label: 'Conversion uplift projected' },
        { num: '31', label: 'Friction points identified' },
        { num: '74%', label: 'Original cart abandonment' },
        { num: '40', label: 'Tree test participants' },
      ],
      nextSlug: 'talentforge',
    },
  },
  {
    id: 'talentforge',
    slug: 'talentforge',
    title: 'TalentForge',
    subtitle: 'HR SaaS · Web Design',
    description:
      'End-to-end product design for an AI-powered talent management platform — covering user flows, component library, and a comprehensive design system for scale.',
    role: 'UI/UX Designer',
    categories: ['UI/UX & Product Design'],
    year: '2026',
    duration: '6 months',
    tools: ['Figma'],
    image: 'https://i.postimg.cc/zD2SsdXH/Cover-Mockup-(10).jpg',
    imageBg: '#0F1923',
    accent: '#1E3A5F',
    caseStudy: {
      challenge:
        'TalentForge needed to go from a feature-list to a product people actually wanted to use. HR managers — their primary users — were drowning in spreadsheets and fragmented tools. The platform had potential, but no coherent UX vision or design foundation.',
      approach:
        'I joined as the first product designer on the team. Starting from zero: user research with 12 HR managers, product vision workshops with founders, information architecture for the full platform, and a design system built to scale as the team grew.',
      outcome:
        'Delivered a complete product design for the core platform — hiring pipeline, candidate profiles, offer management, and onboarding. The design system has been maintained through 3 additional product launches.',
      processSteps: [
        { label: '01 Discovery', desc: 'Interviews with 12 HR managers. Mapping current workflows and pain points.' },
        { label: '02 Vision', desc: 'Product vision workshops with founders. Defining the north-star experience.' },
        { label: '03 Architecture', desc: 'Full information architecture. Navigation design and content strategy.' },
        { label: '04 Design System', desc: 'Token-based design system: 400+ components, 6 core modules.' },
        { label: '05 Core Flows', desc: 'Hiring pipeline, candidate profiles, offer management, and onboarding.' },
        { label: '06 Prototype', desc: 'High-fidelity interactive prototype for investor and user validation.' },
      ],
      processImages: [
        {
          src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&auto=format',
          caption: 'Product vision workshop — mapping the hiring manager\'s ideal workflow',
          wide: true,
        },
        {
          src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&auto=format',
          caption: 'Information architecture: full site map and navigation structure',
        },
        {
          src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop&auto=format',
          caption: 'Design system foundations: colour tokens, typography, and spacing',
        },
      ],
      finalImages: [
        {
          src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&h=900&fit=crop&auto=format',
          caption: 'Hiring pipeline: kanban-style candidate tracking with AI match scoring',
        },
        {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&auto=format',
          caption: 'Candidate profile: structured view with assessment results and timeline',
        },
      ],
      metrics: [
        { num: '400+', label: 'Design system components' },
        { num: '12', label: 'HR managers interviewed' },
        { num: '3', label: 'Additional product launches' },
        { num: '6', label: 'Core product modules' },
      ],
      nextSlug: 'amentum-onpoint',
    },
  },
  {
    id: 'dura-lawn-care',
    slug: 'dura-lawn-care',
    title: 'DURA LAWN CARE',
    subtitle: 'Branding · Identity Design',
    description:
      'Created cohesive visual identities across multiple brand projects — from logo design and typography systems to full brand guidelines and marketing collateral.',
    role: 'Brand Designer',
    categories: ['Graphics & Marketing'],
    subCategory: 'Branding & Identity',
    year: '2025',
    duration: 'Ongoing',
    tools: ['Illustrator', 'Photoshop'],
    image: 'https://i.postimg.cc/3w7sqRdN/Cover-Mockup-(6).jpg',
    imageBg: '#1A1A18',
    accent: '#78350F',
    galleryView: true,
    caseStudy: {
      challenge:
        'Brands across sectors needed visual identities that could cut through saturated markets and communicate clearly across digital and print touchpoints. Each project required a distinct personality while remaining commercially viable.',
      approach:
        'Every brand project begins with discovery — brand strategy workshops, competitive landscape mapping, and audience profiling. From a clear strategic foundation, the visual identity evolves: mark, wordmark, colour, typography, tone.',
      outcome:
        'Delivered 12+ complete brand identity systems across tech, hospitality, healthcare, and consumer sectors. Each brand system includes logo suite, colour system, typography, brand guidelines, and a core set of collateral templates.',
      processSteps: [
        { label: '01 Strategy', desc: 'Brand positioning, audience profiling, and competitive landscape.' },
        { label: '02 Explore', desc: 'Moodboarding, concept directions, and initial sketches.' },
        { label: '03 Mark Design', desc: 'Logo mark and wordmark development across 3 concepts.' },
        { label: '04 System', desc: 'Colour palette, typography, iconography, and pattern system.' },
        { label: '05 Collateral', desc: 'Business cards, letterhead, social templates, presentation decks.' },
        { label: '06 Guidelines', desc: 'Comprehensive brand guidelines document — the source of truth.' },
      ],
      processImages: [
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/1', caption: '', wide: true },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/2', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/3', caption: '' },
      ],
      finalImages: [
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/4', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/5', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/6', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/7', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/8', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/9', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/10', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/11', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/12', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/13', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/14', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/15', caption: '' },   
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/16', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/17', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/18', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/19', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/20', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/21', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/22', caption: '' },
        { src: 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/23', caption: '' },
      ], 
      metrics: [
        { num: '12+', label: 'Brand identities delivered' },
        { num: '4', label: 'Sectors covered' },
        { num: '100%', label: 'Client satisfaction rate' },
        { num: '6wk', label: 'Average delivery time' },
      ],
      nextSlug: 'amentum-onpoint',
    },
  },
];

export interface GfxItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageBg: string;
  tall?: boolean;
}

export const gfxItems: GfxItem[] = [
  {
    id: 'g1',
    title: 'Dashboard Panel',
    category: 'Web App Designs',
    year: '2024',
    image: 'https://i.postimg.cc/zXChbqM0/Cash-Pro-Mockup.jpg',
    imageBg: '#1A1209',
    tall: true,
  },
  {
    id: 'g2',
    title: 'App Screenshots',
    category: 'Mobile App Designs',
    year: '2026',
    image: 'https://i.postimg.cc/MKj3ffbJ/Irapay.jpg',
    imageBg: '#0D1F0A',
  },
  {
    id: 'g3',
    title: 'Kiosk Design',
    category: 'Product Design',
    year: '2025',
    image: 'https://i.postimg.cc/wMgk3FHM/9869a790-96ba-464a-8397-1b925d67c518-1-copy.png',
    imageBg: '#0A0A18',
    tall: true,
  },
  {
    id: 'g4',
    title: 'App Design',
    category: 'Mobile App Designs',
    year: '2024',
    image: 'https://i.postimg.cc/0y4BzGhk/Himolatech.jpg',
    imageBg: '#1A1410',
  },
  {
    id: 'g5',
    title: 'Brand Guidelines',
    category: 'Marketing',
    year: '2023',
    image: 'https://i.postimg.cc/FszRmNvF/1.png',
    imageBg: '#0F0F0D',
  },
  {
    id: 'g6',
    title: 'Brand Guidelines',
    category: 'Presentation Design',
    year: '2023',
    image: 'https://i.postimg.cc/VsGfKptf/2.png',
    imageBg: '#0A0F1A',
  },
  {
    id: 'g7',
    title: 'Brand Guidelines',
    category: 'Marketing',
    year: '2023',
    image: 'https://i.postimg.cc/VkMzLNHV/3.png',
    imageBg: '#120A18',
  },
];
