import { Opportunity } from '../types';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  // 1. INTERNSHIP - High profile, Closing Soon (Editorial Pick)
  {
    id: 'opp-1',
    title: 'Distributed Systems & Cloud Infrastructure Intern',
    organisation: 'Cloudflare',
    organisationWebsite: 'https://www.cloudflare.com/careers',
    category: 'internship',
    description: 'Work on edge computing engines, multi-tenant traffic routing, and resilient distributed cache systems across 300+ global data centres.',
    fullDescription: 'Join the Cloudflare Systems Engineering team for Summer 2027. You will contribute to core production services that power over 20% of the active web, writing performant Rust and Go code, observing p99 latencies, and helping build hyper-scalable global edge infrastructure.',
    location: 'San Francisco, CA / London, UK',
    workMode: 'hybrid',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '12 Weeks (Summer 2027)',
    stipend: '$52 / hour + Housing Stipend',
    eligibility: 'Enrolled in an undergraduate or graduate degree in CS/CE or related discipline, graduating in late 2027 or 2028.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['Rust', 'Go', 'Distributed Systems', 'Linux', 'Networking (TCP/IP)'],
    preferredSkills: ['eBPF', 'Docker', 'Kubernetes'],
    deadline: '2026-11-05', // 5 days away - Deadline radar!
    startDate: '2027-06-01',
    dateAdded: '2026-10-15',
    editorsPick: true,
    featured: true,
    editorialNote: "Cloudflare's internship offers genuine production ownership and one of the highest full-time conversion rates in network infrastructure.",
    verificationStatus: 'verified_official',
    sourceName: 'Cloudflare Careers Portal',
    sourceUrl: 'https://www.cloudflare.com/careers/jobs',
    applicationUrl: 'https://boards.greenhouse.io/cloudflare',
    responsibilities: [
      'Architect, develop, and benchmark high-throughput edge daemon services.',
      'Investigate production latency regressions using distributed tracing and Prometheus metrics.',
      'Collaborate with Senior Staff engineers to publish internal RFCs and participate in design reviews.',
      'Deploy changes safely using canary pipelines and automated integration suites.'
    ],
    benefits: [
      'Comprehensive monthly housing allowance or corporate apartment.',
      'Direct mentorship from Principal Infrastructure engineers.',
      'Regular technical book club and executive AMA sessions.',
      'Return offer consideration for full-time engineering positions.'
    ],
    applicationProcess: [
      'Resume review and algorithmic screening challenge.',
      'Technical phone screen focusing on concurrency and systems fundamentals.',
      'Virtual onsite consisting of two architecture interviews and one behavioral conversation.',
      'Final decision and offer rollout within 10 business days.'
    ]
  },

  // 2. HACKATHON - Global, Major Prize Pool (Editor's Pick 2)
  {
    id: 'opp-2',
    title: 'Global Autonomous Agents Hackathon 2026',
    organisation: 'Open Source AI Collective',
    organisationWebsite: 'https://huggingface.co',
    category: 'hackathon',
    description: 'Build novel multi-agent systems, tool-use evaluation benchmarks, and localized small-model orchestrations over 48 hours.',
    fullDescription: 'A premier 48-hour online hackathon bringing together 3,000+ student builders, researchers, and open-source contributors. Teams will explore state-of-the-art agent frameworks, autonomous code execution, and sandboxed reasoning pipelines.',
    location: 'Global (Virtual)',
    workMode: 'remote',
    experienceLevel: 'all',
    compensationType: 'prize',
    prizePool: '$75,000 Total Prizes + GPU Compute Credits',
    teamSize: '1 - 4 Participants',
    eventDate: '2026-11-20 to 2026-11-22',
    eligibility: 'Open to current students, recent graduates, and self-taught developers worldwide. No prior hackathon experience mandatory.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Python', 'LLM APIs', 'Agent Frameworks', 'Git'],
    preferredSkills: ['FastAPI', 'LangChain/LangGraph', 'Tailwind CSS', 'Docker'],
    deadline: '2026-11-14',
    dateAdded: '2026-10-18',
    editorsPick: true,
    verificationStatus: 'community_curated',
    sourceName: 'Devpost Community Listings',
    sourceUrl: 'https://devpost.com',
    applicationUrl: 'https://devpost.com/hackathons',
    responsibilities: [
      'Form or join a multidisciplinary team before the kickoff keynote.',
      'Submit a functional GitHub repository with an open-source MIT or Apache 2.0 license.',
      'Provide a 3-minute video walkthrough showcasing live agent execution and test logs.'
    ],
    benefits: [
      'Free $500 cloud GPU credits per verified team.',
      'Direct feedback from leading AI research lab judges.',
      'Fast-track interview pipelines for top 10 finalist teams.'
    ]
  },

  // 3. SCHOLARSHIP - Prestigious Undergraduate Grant (Editor's Pick 3)
  {
    id: 'opp-3',
    title: 'NextGen Women in Engineering Excellence Scholarship',
    organisation: 'AnitaB.org & Tech Pathways Fund',
    organisationWebsite: 'https://anitab.org',
    category: 'scholarship',
    description: '$10,000 educational stipend plus sponsored attendance and travel to the 2027 Grace Hopper Celebration.',
    fullDescription: 'Established to recognize outstanding undergraduate women and non-binary students demonstrating technical leadership and community impact in Computer Science, Software Engineering, or related engineering fields.',
    location: 'Worldwide / Virtual Ceremony',
    workMode: 'remote',
    experienceLevel: 'all',
    compensationType: 'funded',
    awardAmount: '$10,000 Merit Award + Travel Grant',
    eligibility: 'Must identify as a woman or non-binary student enrolled in an accredited undergraduate STEM program with at least one full academic year remaining.',
    eligibleYears: ['1st', '2nd', '3rd'],
    requiredSkills: ['Academic Excellence', 'Community Leadership', 'Technical Portfolio'],
    deadline: '2026-11-18',
    dateAdded: '2026-10-02',
    editorsPick: true,
    verificationStatus: 'verified_official',
    sourceName: 'AnitaB.org Foundation',
    sourceUrl: 'https://anitab.org/awards-grants',
    applicationUrl: 'https://anitab.org',
    responsibilities: [
      'Submit official university transcripts and two academic or extracurricular letters of recommendation.',
      'Write a 750-word essay detailing an initiative where you applied technology to solve a community challenge.',
      'Participate in quarterly scholar mentorship check-ins.'
    ],
    benefits: [
      'Unrestricted $10,000 wire transfer for tuition, books, or research equipment.',
      'All-expenses-paid trip to GHC 2027 including flights, hotel, and conference pass.',
      'Access to a private alumni directory spanning 400+ tech leaders.'
    ]
  },

  // 4. RESEARCH - Academic Undergrad Lab Position
  {
    id: 'opp-4',
    title: 'Undergraduate Research Fellow — Efficient ML Systems',
    organisation: 'Berkeley Artificial Intelligence Research (BAIR)',
    organisationWebsite: 'https://bair.berkeley.edu',
    category: 'research',
    researchDomain: 'Machine Learning Systems & Quantization',
    description: 'Investigate 4-bit and 2-bit weight quantization, kernel fusion, and sparse attention memory bottlenecks for edge devices.',
    fullDescription: 'Join BAIR researchers for a funded 6-month undergraduate research appointment. Fellows work alongside PhD students and postdoctoral researchers, co-authoring conference papers targeted at NeurIPS, ICML, and MLSys.',
    location: 'Berkeley, CA',
    workMode: 'hybrid',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '6 Months (Spring/Summer 2027)',
    stipend: '$2,800 / month research fellowship',
    eligibility: 'Undergraduate juniors, seniors, or early master students with coursework in Deep Learning, Linear Algebra, and Operating Systems.',
    eligibleYears: ['3rd', '4th', 'graduate'],
    requiredSkills: ['Python', 'PyTorch', 'C++', 'CUDA Basics', 'Linear Algebra'],
    preferredSkills: ['Triton', 'GPU Profiling (Nsight)', 'FlashAttention'],
    deadline: '2026-11-30',
    startDate: '2027-01-15',
    dateAdded: '2026-10-10',
    verificationStatus: 'verified_official',
    sourceName: 'UC Berkeley Research Portal',
    sourceUrl: 'https://bair.berkeley.edu',
    applicationUrl: 'https://bair.berkeley.edu',
    responsibilities: [
      'Profile memory access patterns of transformer attention layers on Nvidia Ada/Hopper architectures.',
      'Implement custom CUDA/Triton kernels to accelerate non-uniform activation quantization.',
      'Benchmark speedups against vLLM and TensorRT-LLM baselines.'
    ],
    benefits: [
      'Co-authorship opportunities on peer-reviewed academic papers.',
      'Dedicated compute cluster allocation (H100/A100 instances).',
      'Strong recommendation letters for top PhD programs.'
    ]
  },

  // 5. FELLOWSHIP - Open Source Software
  {
    id: 'opp-5',
    title: 'Open Source Software Engineering Fellowship',
    organisation: 'Major League Hacking (MLH)',
    organisationWebsite: 'https://fellowship.mlh.io',
    category: 'fellowship',
    description: 'A 12-week remote internship alternative where students contribute directly to tier-1 open source projects under staff guidance.',
    fullDescription: 'The MLH Fellowship pairs aspiring software engineers with high-impact open source repositories such as React, Babel, Solana, ClickHouse, and AWS SDKs. Fellows earn an educational stipend, receive weekly 1-on-1 code reviews from senior engineers, and build verifiable public commits.',
    location: 'Worldwide (Fully Remote)',
    workMode: 'remote',
    experienceLevel: 'beginner',
    compensationType: 'paid',
    duration: '12 Weeks (Batch Spring 2027)',
    stipend: 'Up to $5,000 Educational Grant (based on location)',
    eligibility: 'Must be 18+ and enrolled in higher education or a recent coding bootcamp graduate. Proficiency in at least one modern language required.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Git', 'GitHub', 'JavaScript', 'Python', 'Problem Solving'],
    preferredSkills: ['TypeScript', 'Testing (Jest/Pytest)', 'CI/CD Actions'],
    deadline: '2026-11-25',
    startDate: '2027-01-26',
    dateAdded: '2026-10-05',
    verificationStatus: 'verified_official',
    sourceName: 'MLH Official Fellowship Portal',
    sourceUrl: 'https://fellowship.mlh.io',
    applicationUrl: 'https://fellowship.mlh.io/apply',
    responsibilities: [
      'Triage real user issues on prominent open source libraries.',
      'Write unit and integration tests to increase test coverage above 90%.',
      'Participate in daily standups and weekly retrospective demos with cohort fellows.'
    ],
    benefits: [
      'Public GitHub contribution graph with merged PRs in world-class projects.',
      'Tailored resume reviews and mock technical interviews with tech recruiters.',
      'Lifelong alumni network spanning 15,000+ past fellows.'
    ]
  },

  // 6. COMPETITION - Algorithmic Trading & Math
  {
    id: 'opp-6',
    title: 'International Collegiate Algorithmic Trading Challenge',
    organisation: 'IMC Trading & Citadel Securities Academic Alliance',
    organisationWebsite: 'https://www.citadel.com',
    category: 'competition',
    description: 'Design and deploy statistical arbitrage algorithms against live simulated market exchanges in a 10-day algorithmic tournament.',
    fullDescription: 'Test your quantitative modeling and software optimization prowess against university teams worldwide. Your bots will trade synthetic futures, options, and order books under simulated liquidity shocks and latency constraints.',
    location: 'Online Tournament / Finals in Chicago',
    workMode: 'remote',
    experienceLevel: 'advanced',
    compensationType: 'prize',
    prizePool: '$50,000 Prize Pool + Fast-Track Trading Internships',
    teamSize: '2 - 3 Students',
    eventDate: '2026-12-05 to 2026-12-15',
    eligibility: 'Undergraduate and Master students in Mathematics, Physics, Computer Science, or Quantitative Finance.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['C++', 'Python', 'Probability & Statistics', 'Algorithms', 'Data Analysis'],
    preferredSkills: ['Market Microstructure', 'Pandas/NumPy', 'Low Latency Networking'],
    deadline: '2026-11-28',
    dateAdded: '2026-10-12',
    verificationStatus: 'community_curated',
    sourceName: 'Quantitative Finance Student Network',
    sourceUrl: 'https://www.citadel.com/careers',
    applicationUrl: 'https://www.citadel.com/careers',
    responsibilities: [
      'Write automated market-making and trend-following strategies using provided C++/Python SDKs.',
      'Backtest models on historical millisecond-resolution L2 tick data.',
      'Defend trading model risk controls before a panel of head quantitative researchers.'
    ],
    benefits: [
      'First Place: $25,000 cash grant split among team members.',
      'Finalist teams flown to Chicago for a 2-day market simulation symposium.',
      'Guaranteed first-round interview for Quantitative Researcher and Trader roles.'
    ]
  },

  // 7. INTERNSHIP - Frontend & Design Engineering
  {
    id: 'opp-7',
    title: 'Design Systems & Frontend Engineering Intern',
    organisation: 'Linear Orbit Labs',
    organisationWebsite: 'https://linear.app',
    category: 'internship',
    description: 'Craft buttery-smooth 120fps web interactions, accessible UI components, and keyboard-first navigation systems.',
    fullDescription: 'We are seeking an obsessive craftsperson who treats web software like fine architecture. You will work on our cross-platform design token architecture, canvas rendering performance, and keyboard shortcut dispatch engines.',
    location: 'San Francisco, CA or Remote (US/EU)',
    workMode: 'remote',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '14 Weeks (Summer 2027)',
    stipend: '$8,000 / month',
    eligibility: 'Current students with a portfolio showcasing exceptional interaction design, CSS mastery, and deep TypeScript knowledge.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['React', 'TypeScript', 'CSS/Tailwind', 'UI/UX Design', 'Web Performance'],
    preferredSkills: ['Figma', 'WebGL / Canvas', 'Web Audio API', 'Wasm'],
    deadline: '2026-11-10', // Closing soon!
    startDate: '2027-05-18',
    dateAdded: '2026-10-20',
    editorsPick: true,
    verificationStatus: 'demo_sample',
    sourceName: 'Linear Careers Sample Listing',
    sourceUrl: 'https://linear.app',
    applicationUrl: 'https://linear.app',
    responsibilities: [
      'Refactor complex dropdowns and dialog components to conform with WCAG AAA accessibility.',
      'Profile and optimize DOM repaints and layout thrashing across heavy lists.',
      'Design and ship custom animation curves with CSS transforms and spring physics.'
    ],
    benefits: [
      'Top-tier remote hardware setup (M3 Max MacBook Pro + Studio Display).',
      'Mentorship from pioneers in web interaction design.',
      'Company offsite participation and travel stipend.'
    ]
  },

  // 8. WORKSHOP - Cybersecurity Hands-on Training
  {
    id: 'opp-8',
    title: 'Offensive Security & Red Teaming Virtual Boot Camp',
    organisation: 'OffSec Academic Initiative',
    organisationWebsite: 'https://www.offsec.com',
    category: 'workshop',
    description: 'A 4-weekend intensive deep dive into binary exploitation, active directory attacks, and web penetration testing.',
    fullDescription: 'Guided by certified OSCP and OSEP instructors, this weekend boot camp covers offensive tradecraft, privilege escalation, heap spraying, and defensive evasion techniques with 100+ private target labs.',
    location: 'Virtual / Weekend Cohort',
    workMode: 'remote',
    experienceLevel: 'intermediate',
    compensationType: 'unpaid',
    duration: '4 Weekends (Nov 14 - Dec 06, 2026)',
    eligibility: 'Students interested in ethical hacking, network defence, or security consulting. Basic command line and Python familiarity expected.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Linux', 'Cybersecurity', 'Networking', 'Python', 'Bash'],
    preferredSkills: ['Wireshark', 'Burp Suite', 'GDB', 'x86 Assembly'],
    deadline: '2026-11-08', // Closing very soon!
    startDate: '2026-11-14',
    dateAdded: '2026-10-22',
    verificationStatus: 'verified_official',
    sourceName: 'OffSec Academic Program',
    sourceUrl: 'https://www.offsec.com',
    applicationUrl: 'https://www.offsec.com',
    responsibilities: [
      'Complete 8 structured capture-the-flag (CTF) machine write-ups.',
      'Participate in live interactive debrief sessions each Sunday.',
      'Adhere strictly to responsible disclosure guidelines and ethics contracts.'
    ],
    benefits: [
      'Complimentary 90-day access to OffSec Proving Grounds Practice labs.',
      'Voucher for 50% discount on the PEN-200 OSCP certification exam.',
      'Industry-recognized Certificate of Completion.'
    ]
  },

  // 9. STARTUP PROGRAM - Student Incubator & Seed Grant
  {
    id: 'opp-9',
    title: 'Student Founder Residency & $25K Equity-Free Grant',
    organisation: 'Pear VC & Dorm Room Fund',
    organisationWebsite: 'https://dormroomfund.com',
    category: 'startup',
    description: 'Equity-free capital, weekly office hours with unicorn founders, and demo day pitching to top Silicon Valley venture funds.',
    fullDescription: 'Designed exclusively for technical student founders building bold venture-scale technology companies while still at university. We fund software, climate, biotech, and hardware founders before they have customers or traction.',
    location: 'San Francisco, CA or Hybrid',
    workMode: 'hybrid',
    experienceLevel: 'all',
    compensationType: 'funded',
    awardAmount: '$25,000 Equity-Free Seed Check',
    duration: '10 Weeks (Spring 2027)',
    eligibility: 'At least one founding member must be an actively enrolled undergraduate or graduate student at the time of application.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['Entrepreneurship', 'Product Sense', 'Software Engineering', 'Technical Prototyping'],
    preferredSkills: ['Customer Discovery', 'Full Stack Development', 'Go-To-Market'],
    deadline: '2026-12-01',
    startDate: '2027-02-01',
    dateAdded: '2026-10-14',
    verificationStatus: 'verified_official',
    sourceName: 'Dorm Room Fund Official Application',
    sourceUrl: 'https://dormroomfund.com',
    applicationUrl: 'https://dormroomfund.com',
    responsibilities: [
      'Ship product increments weekly and publish public changelog updates.',
      'Conduct a minimum of 15 customer problem interviews each sprint.',
      'Pitch at the private SF Demo Day to over 150 angel and seed investors.'
    ],
    benefits: [
      '$25,000 non-dilutive, zero-equity wire directly to the startup account.',
      'Over $300,000 in cloud infrastructure perks (AWS, GCP, Stripe, OpenAI).',
      'Legal incorporation and Delaware C-Corp package handled free of charge.'
    ]
  },

  // 10. SCHOLARSHIP - International Graduate & Undergrad
  {
    id: 'opp-10',
    title: 'DAAD RISE Germany Research Internships in Science and Engineering',
    organisation: 'German Academic Exchange Service (DAAD)',
    organisationWebsite: 'https://www.daad.de/rise',
    category: 'scholarship',
    description: 'Fully funded summer research internship at top German university laboratories and research institutes.',
    fullDescription: 'RISE Germany pairs undergraduate students from North American, British, and Irish universities with German doctoral researchers for a paid 10-to-12-week summer research stay. Research topics span AI, physics, chemistry, biology, and mechanical engineering.',
    location: 'Germany (Various Cities)',
    workMode: 'on-site',
    experienceLevel: 'intermediate',
    compensationType: 'funded',
    awardAmount: '€992 / month + Health Insurance & Travel Subsidy',
    duration: '10 - 12 Weeks (Summer 2027)',
    eligibility: 'Full-time undergraduate students who will have completed at least 2 years of university study by the time the internship starts.',
    eligibleYears: ['2nd', '3rd'],
    requiredSkills: ['Research', 'Academic Writing', 'Laboratory Fundamentals', 'Data Analysis'],
    preferredSkills: ['German Language (Not Mandatory)', 'Python', 'MATLAB'],
    deadline: '2026-12-15',
    startDate: '2027-06-01',
    dateAdded: '2026-09-30',
    verificationStatus: 'verified_official',
    sourceName: 'DAAD Official Portal',
    sourceUrl: 'https://www.daad.de/rise/en',
    applicationUrl: 'https://www.daad.de/rise/en/rise-germany',
    responsibilities: [
      'Work closely with an assigned PhD mentor on a specific funded research question.',
      'Document experimental findings and synthesize reproducible datasets.',
      'Present research poster at the annual DAAD RISE Scholars Meeting in Heidelberg.'
    ],
    benefits: [
      'Monthly scholarship allowance, rail card discount, and comprehensive travel coverage.',
      'Free 3-day scholars meeting in Heidelberg with 300 international peers.',
      'Immersive European cultural and academic experience.'
    ]
  },

  // 11. INTERNSHIP - Machine Learning Engineer
  {
    id: 'opp-11',
    title: 'Machine Learning Engineering Intern — Speech & Audio AI',
    organisation: 'ElevenLabs',
    organisationWebsite: 'https://elevenlabs.io',
    category: 'internship',
    description: 'Scale next-generation diffusion and autoregressive audio models capable of ultra-low latency conversational voice synthesis.',
    fullDescription: 'ElevenLabs is pioneering the frontier of multimodal audio intelligence. As an ML engineering intern, you will benchmark diffusion models, optimize KV-cache memory footprints, and deploy streaming voice inference endpoints serving millions of concurrent requests.',
    location: 'London, UK / New York, NY / Remote',
    workMode: 'hybrid',
    experienceLevel: 'advanced',
    compensationType: 'paid',
    duration: '12 - 16 Weeks (Summer 2027)',
    stipend: '£6,500 / month (or $8,500 / month in US)',
    eligibility: 'Strong mathematical foundation, experience training modern neural architectures, and production Python proficiency.',
    eligibleYears: ['3rd', '4th', 'graduate'],
    requiredSkills: ['Python', 'PyTorch', 'Machine Learning', 'Audio DSP Basics', 'CUDA'],
    preferredSkills: ['Triton', 'C++', 'ONNX Runtime', 'Distributed Training (FSDP/Megatron)'],
    deadline: '2026-11-22',
    startDate: '2027-06-07',
    dateAdded: '2026-10-19',
    verificationStatus: 'verified_official',
    sourceName: 'ElevenLabs Careers',
    sourceUrl: 'https://elevenlabs.io/careers',
    applicationUrl: 'https://elevenlabs.io/careers',
    responsibilities: [
      'Evaluate vocoder latency and perceptual audio quality (PESQ/MOS).',
      'Optimize token generation kernels for real-time edge streaming.',
      'Collaborate with product teams to roll out new expressive voice models.'
    ],
    benefits: [
      'Cutting-edge compute resources with access to proprietary clusters.',
      'High-impact ownership in a fast-growing frontier AI scale-up.',
      'Generous hardware allowance and equity-eligible return offers.'
    ]
  },

  // 12. HACKATHON - Climate & CleanTech
  {
    id: 'opp-12',
    title: 'MIT Clean Energy Hackathon & Innovation Prize',
    organisation: 'MIT Energy Club',
    organisationWebsite: 'https://mitenergyclub.org',
    category: 'hackathon',
    description: 'Tackle grid decarbonization, industrial heat storage, and carbon accounting transparency with engineering innovations.',
    fullDescription: 'Join climate scientists, software engineers, and policy scholars for a weekend of rapid ideation and prototype development focused on accelerating the clean energy transition. Mentors include climate venture capitalists and national lab scientists.',
    location: 'Cambridge, MA + Hybrid Livestream',
    workMode: 'hybrid',
    experienceLevel: 'all',
    compensationType: 'prize',
    prizePool: '$40,000 Grand Prizes',
    teamSize: '2 - 5 Participants',
    eventDate: '2026-12-04 to 2026-12-06',
    eligibility: 'Open to enrolled college and graduate students from any accredited institution.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Data Science', 'Python', 'Web Development', 'Problem Solving'],
    preferredSkills: ['GIS / Spatial Data', 'IoT / Hardware', 'Financial Modeling'],
    deadline: '2026-11-26',
    dateAdded: '2026-10-16',
    verificationStatus: 'verified_official',
    sourceName: 'MIT Energy Club Portal',
    sourceUrl: 'https://mitenergyclub.org',
    applicationUrl: 'https://mitenergyclub.org',
    responsibilities: [
      'Develop a technical prototype addressing one of five published challenge tracks.',
      'Submit code, system architecture diagrams, and a quantified emissions impact model.',
      'Pitch to panel judges during the Sunday morning finalist showcase.'
    ],
    benefits: [
      '$15,000 top prize plus invitation to the MIT Energy Conference.',
      'Direct introductions to climate tech venture firms (Breakthrough Energy, Lowercarbon).',
      'Free meals, merchandise, and travel subsidies for out-of-state finalists.'
    ]
  },

  // 13. RESEARCH - Quantum Computing
  {
    id: 'opp-13',
    title: 'CERN openlab Summer Student Programme in Scientific Computing',
    organisation: 'CERN (European Organization for Nuclear Research)',
    organisationWebsite: 'https://openlab.cern',
    category: 'research',
    researchDomain: 'High Energy Physics Computing & Quantum Algorithms',
    description: 'Work at the international epicenter of particle physics on peta-scale data processing, quantum simulations, and machine learning.',
    fullDescription: 'Spend 9 weeks during the summer of 2027 at CERN in Geneva, Switzerland. Openlab summer students work on advanced computing projects alongside top IT researchers and industry partners (Intel, Google, Oracle, Micron).',
    location: 'Geneva, Switzerland',
    workMode: 'on-site',
    experienceLevel: 'intermediate',
    compensationType: 'funded',
    awardAmount: 'CHF 90 / day allowance + Full Travel Reimbursed',
    duration: '9 Weeks (June - August 2027)',
    eligibility: 'Bachelor or Master students in CS, Physics, or Mathematics with at least 3 years of full-time university studies completed by summer 2027.',
    eligibleYears: ['3rd', '4th', 'graduate'],
    requiredSkills: ['C++', 'Python', 'Linux', 'Algorithms', 'High Performance Computing'],
    preferredSkills: ['MPI / OpenMP', 'Quantum Computing (Qiskit)', 'Distributed Storage'],
    deadline: '2027-01-31',
    startDate: '2027-06-21',
    dateAdded: '2026-10-25',
    verificationStatus: 'verified_official',
    sourceName: 'CERN Careers Portal',
    sourceUrl: 'https://careers.cern/openlab-summer-student-programme',
    applicationUrl: 'https://careers.cern',
    responsibilities: [
      'Design, test, and benchmark algorithms for the Worldwide LHC Computing Grid (WLCG).',
      'Attend daily lecture series delivered by world-leading physicists and computer scientists.',
      'Submit a formal research report and present findings at the student symposium.'
    ],
    benefits: [
      'Comprehensive daily living allowance in Switzerland (tax-free).',
      'Full round-trip flight reimbursement and health insurance coverage.',
      'Exclusive behind-the-scenes guided visits to underground LHC detector caverns.'
    ]
  },

  // 14. INTERNSHIP - Product Management
  {
    id: 'opp-14',
    title: 'Associate Product Manager (APM) Intern',
    organisation: 'Notion Labs',
    organisationWebsite: 'https://www.notion.so',
    category: 'internship',
    description: 'Define product requirements, collaborate with design and engineering, and ship collaboration features used by 35M+ users.',
    fullDescription: 'Notion APM interns take direct ownership of product features from discovery to launch. You will write PRDs, run customer research sessions, analyze telemetry funnels, and partner with engineers to eliminate friction for modern knowledge workers.',
    location: 'San Francisco, CA / New York, NY',
    workMode: 'hybrid',
    experienceLevel: 'beginner',
    compensationType: 'paid',
    duration: '12 Weeks (Summer 2027)',
    stipend: '$50 / hour + $3,000 relocation',
    eligibility: 'Undergraduate students in any major graduating between December 2027 and June 2028.',
    eligibleYears: ['2nd', '3rd'],
    requiredSkills: ['Product Sense', 'Analytical Thinking', 'Communication', 'UI/UX Familiarity'],
    preferredSkills: ['SQL', 'Figma', 'Technical Prototyping'],
    deadline: '2026-11-12', // Approaching deadline!
    startDate: '2027-05-24',
    dateAdded: '2026-10-21',
    verificationStatus: 'verified_official',
    sourceName: 'Notion University Careers',
    sourceUrl: 'https://www.notion.so/careers',
    applicationUrl: 'https://www.notion.so/careers',
    responsibilities: [
      'Lead user discovery calls to uncover customer pain points in workspace administration.',
      'Author crystal-clear product specification briefs and edge case matrices.',
      'Track feature launch KPIs using Amplitude dashboards and qualitative feedback.'
    ],
    benefits: [
      'Executive mentor pairing with VP of Product or Group Product Managers.',
      'Generous wellness, equipment, and learning allowances.',
      'High conversion path to full-time APM cohort.'
    ]
  },

  // 15. FELLOWSHIP - Civic Tech & Policy
  {
    id: 'opp-15',
    title: 'Civic Digital Fellowship in Public Interest Technology',
    organisation: 'Coding it Forward',
    organisationWebsite: 'https://codingitforward.com',
    category: 'fellowship',
    description: 'Empower federal agencies with modern data science, software engineering, and accessible human-centered product design.',
    fullDescription: 'The premier technology fellowship for students in government. Fellows are placed across the U.S. Census Bureau, National Institutes of Health (NIH), and Department of Veterans Affairs to build critical civic infrastructure.',
    location: 'Washington, D.C. or Remote',
    workMode: 'remote',
    experienceLevel: 'all',
    compensationType: 'paid',
    duration: '10 Weeks (Summer 2027)',
    stipend: '$8,500 Total Living Stipend',
    eligibility: 'U.S. citizens enrolled in undergraduate or graduate university programs with demonstrable skills in coding, design, or data.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['JavaScript', 'Python', 'Data Science', 'Accessibility (WCAG)', 'Communication'],
    preferredSkills: ['React', 'Public Policy Interest', 'R / GIS'],
    deadline: '2026-12-08',
    startDate: '2027-06-07',
    dateAdded: '2026-10-08',
    verificationStatus: 'verified_official',
    sourceName: 'Coding it Forward Official Portal',
    sourceUrl: 'https://codingitforward.com',
    applicationUrl: 'https://codingitforward.com/apply',
    responsibilities: [
      'Build public-facing data dashboards and modernization pipelines for federal partners.',
      'Ensure 100% compliance with federal Section 508 accessibility standards.',
      'Participate in weekly professional development sessions on public sector technology.'
    ],
    benefits: [
      'Direct social impact touching millions of citizens who rely on federal services.',
      'Security clearance sponsorship where agency work requires public trust clearance.',
      'Extensive government tech alumni network.'
    ]
  },

  // 16. COMPETITION - Robotics & Autonomous Vehicles
  {
    id: 'opp-16',
    title: 'Indy Autonomous Challenge — University Racing League',
    organisation: 'Energy Systems Network & Clemson University',
    organisationWebsite: 'https://www.indyautonomouschallenge.com',
    category: 'competition',
    description: 'Program full-scale Dallara AV-21 racecars to compete head-to-head at speeds exceeding 175 mph with zero human intervention.',
    fullDescription: 'The world premier autonomous motorsport tournament for university teams. Teams write perception, path planning, and vehicle dynamics software that commands race cars navigating banked oval super-speedways.',
    location: 'Indianapolis Motor Speedway / Las Vegas Motor Speedway',
    workMode: 'hybrid',
    experienceLevel: 'advanced',
    compensationType: 'prize',
    prizePool: '$1,000,000 Total Tournament Purses',
    teamSize: 'University Student Engineering Teams (5-20 members)',
    eventDate: '2027-01-08 at CES Las Vegas',
    eligibility: 'Official collegiate engineering and robotics student teams affiliated with an accredited university.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['ROS / ROS 2', 'C++', 'Computer Vision', 'Control Theory', 'Linux'],
    preferredSkills: ['LiDAR SLAM', 'CAN bus', 'Kalman Filtering', 'Simulink'],
    deadline: '2026-11-15',
    dateAdded: '2026-10-01',
    verificationStatus: 'verified_official',
    sourceName: 'IAC Official Site',
    sourceUrl: 'https://www.indyautonomouschallenge.com',
    applicationUrl: 'https://www.indyautonomouschallenge.com',
    responsibilities: [
      'Develop real-time object tracking algorithms fusing multi-camera and LiDAR sensor arrays.',
      'Simulate high-speed passing maneuvers in AWS-hosted digital twin environments.',
      'Deploy and validate code trackside during official practice sessions.'
    ],
    benefits: [
      'Direct access to custom multimillion-dollar Dallara formula chassis.',
      'Recruiting preference from top autonomous driving companies (Waymo, Cruise, Zoox).',
      'Massive global media visibility during live racing broadcasts.'
    ]
  },

  // 17. INTERNSHIP - Cybersecurity / Security Engineering
  {
    id: 'opp-17',
    title: 'Product Security & Cryptography Engineering Intern',
    organisation: 'Signal Messenger',
    organisationWebsite: 'https://signal.org',
    category: 'internship',
    description: 'Work on post-quantum secure messaging protocols, zero-knowledge contact discovery, and memory-safe cryptography libraries.',
    fullDescription: 'Signal builds private communication technology used by journalists, activists, and millions worldwide. As a security intern, you will contribute to the Signal Protocol, audit open cryptographic primitives, and harden mobile clients.',
    location: 'Remote (US, Canada, Europe)',
    workMode: 'remote',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '12 Weeks (Summer 2027)',
    stipend: '$55 / hour',
    eligibility: 'Undergraduate or graduate students with strong interest in applied cryptography, security engineering, and open source software.',
    eligibleYears: ['3rd', '4th', 'graduate'],
    requiredSkills: ['Rust', 'Applied Cryptography', 'C', 'Security Auditing', 'Git'],
    preferredSkills: ['Post-Quantum Crypto (Kyber/Dilithium)', 'Kotlin', 'Swift'],
    deadline: '2026-11-19',
    startDate: '2027-06-01',
    dateAdded: '2026-10-23',
    verificationStatus: 'verified_official',
    sourceName: 'Signal Careers',
    sourceUrl: 'https://signal.org/work',
    applicationUrl: 'https://signal.org/work',
    responsibilities: [
      'Audit Rust and C crypto implementations for timing side channels.',
      'Implement regression tests verifying post-quantum key exchange ratchets.',
      'Contribute to public whitepapers and open security disclosures.'
    ],
    benefits: [
      'Contribute to the gold standard of private, non-profit communication infrastructure.',
      'Mentorship from renowned applied cryptographers.',
      'Competitive remote compensation and flexible hours.'
    ]
  },

  // 18. SCHOLARSHIP - High Impact STEM
  {
    id: 'opp-18',
    title: 'Palantir Future Scholarship for Women & Underrepresented Technologists',
    organisation: 'Palantir Technologies',
    organisationWebsite: 'https://www.palantir.com',
    category: 'scholarship',
    description: '$7,000 grant plus a fully funded multi-day developmental workshop at Palantir headquarters.',
    fullDescription: 'Designed to support and celebrate undergraduate students who are beginning their careers in technology and championing underrepresented voices in computing.',
    location: 'Palo Alto, CA / New York, NY',
    workMode: 'hybrid',
    experienceLevel: 'beginner',
    compensationType: 'funded',
    awardAmount: '$7,000 Scholarship + All-expenses-paid Summit',
    eligibility: 'Active full-time undergraduate students who identify as women, non-binary, or underrepresented ethnic minorities in tech.',
    eligibleYears: ['1st', '2nd', '3rd'],
    requiredSkills: ['Problem Solving', 'Passion for Technology', 'Academic Drive'],
    deadline: '2026-11-29',
    dateAdded: '2026-10-11',
    verificationStatus: 'verified_official',
    sourceName: 'Palantir Global Scholarships',
    sourceUrl: 'https://www.palantir.com/careers/students/scholarship',
    applicationUrl: 'https://www.palantir.com/careers/students/scholarship',
    responsibilities: [
      'Complete a technical problem-solving assessment.',
      'Submit a personal impact statement explaining your vision for tech inclusivity.',
      'Attend the 3-day tech summit in spring 2027.'
    ],
    benefits: [
      '$7,000 direct tuition assistance.',
      'Expedited interview consideration for summer 2027 software engineering internships.',
      '1-on-1 mentorship with Palantir deployment strategists.'
    ]
  },

  // 19. HACKATHON - Beginner Friendly
  {
    id: 'opp-19',
    title: 'HackTheNorth 2027 — Canada’s Biggest Collegiate Hackathon',
    organisation: 'University of Waterloo Tech Collective',
    organisationWebsite: 'https://hackthenorth.com',
    category: 'hackathon',
    description: 'Over 1,000 students, 36 hours of hacking, free hardware lab access, and hundreds of mentors.',
    fullDescription: 'Canada’s landmark student hackathon brings together creators of all experience levels to learn, build, and share. From first-time coders to experienced hackathon veterans, participants receive free travel assistance, lodging, hardware, and workshops.',
    location: 'Waterloo, ON, Canada',
    workMode: 'on-site',
    experienceLevel: 'beginner',
    compensationType: 'prize',
    prizePool: '$65,000 in Prizes & Hardware Grants',
    teamSize: '1 - 4 Members',
    eventDate: '2027-01-22 to 2027-01-24',
    eligibility: 'Open to enrolled high school, undergraduate, and graduate students from any school worldwide.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Curiosity', 'Basic Coding or Design', 'Collaboration'],
    preferredSkills: ['Web Dev', 'Mobile Dev', 'Hardware / Arduino'],
    deadline: '2026-12-10',
    dateAdded: '2026-10-17',
    verificationStatus: 'verified_official',
    sourceName: 'Hack the North Official',
    sourceUrl: 'https://hackthenorth.com',
    applicationUrl: 'https://hackthenorth.com',
    responsibilities: [
      'Build a working hardware or software project in under 36 hours.',
      'Attend at least two skill-building workshops led by sponsor engineers.',
      'Present to expo judges on Sunday afternoon.'
    ],
    benefits: [
      'Travel reimbursements available for bus, train, and domestic flights.',
      'Free meals, snacks, and exclusive swag jackets.',
      'Unmatched opportunity to meet recruiters from top tech employers.'
    ]
  },

  // 20. RESEARCH - Quantum & Physics
  {
    id: 'opp-20',
    title: 'MIT Summer Research Program in Computational Biology & Genomics (MSRP-Bio)',
    organisation: 'Massachusetts Institute of Technology (MIT)',
    organisationWebsite: 'https://biology.mit.edu',
    category: 'research',
    researchDomain: 'Computational Biology & Single-Cell Sequencing',
    description: '10 weeks of funded research in MIT laboratories, weekly seminars, and graduate school prep.',
    fullDescription: 'MSRP Bio seeks to identify talented undergraduate students with a passion for biological sciences, bioinformatics, and computational genomics. Students work full-time in an MIT faculty laboratory on an independent project.',
    location: 'Cambridge, MA',
    workMode: 'on-site',
    experienceLevel: 'intermediate',
    compensationType: 'funded',
    awardAmount: '$6,000 Stipend + Campus Housing + Travel Covered',
    duration: '10 Weeks (Summer 2027)',
    eligibility: 'Full-time undergraduates with at least a 3.5 GPA, majoring in biology, computer science, or bioinformatics.',
    eligibleYears: ['2nd', '3rd'],
    requiredSkills: ['Python', 'R', 'Bioinformatics Basics', 'Statistics', 'Research'],
    preferredSkills: ['Next-Gen Sequencing (NGS)', 'Linux', 'Pandas'],
    deadline: '2027-01-10',
    startDate: '2027-06-07',
    dateAdded: '2026-10-09',
    verificationStatus: 'verified_official',
    sourceName: 'MIT Department of Biology',
    sourceUrl: 'https://biology.mit.edu/outreach-and-diversity/msrp-bio',
    applicationUrl: 'https://biology.mit.edu',
    responsibilities: [
      'Conduct 40 hours per week of dedicated lab research.',
      'Participate in weekly research seminars and computational journal clubs.',
      'Present a poster at the MIT Summer Research Symposium.'
    ],
    benefits: [
      'Individual bedroom in MIT undergraduate dormitories.',
      'GRE waiver and application fee waiver for MIT graduate programs.',
      'Lifetime MIT alumni affiliate network.'
    ]
  },

  // 21. INTERNSHIP - Data Science / FinTech
  {
    id: 'opp-21',
    title: 'Quantitative Research & Data Science Intern',
    organisation: 'Stripe Risk & Economic Graph',
    organisationWebsite: 'https://stripe.com',
    category: 'internship',
    description: 'Detect sophisticated fraud syndicates, model global GDP trends, and train transaction risk classifiers across hundreds of billions in payment volume.',
    fullDescription: 'Stripe processes trillions of dollars for internet businesses. Our Risk Data Science interns analyze high-dimensional graph data, engineer real-time fraud features, and optimize model decision thresholds under extreme class imbalance.',
    location: 'Seattle, WA / San Francisco, CA / Dublin, Ireland',
    workMode: 'hybrid',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '12 Weeks (Summer 2027)',
    stipend: '$56 / hour + Relocation Lump Sum',
    eligibility: 'Pursuing a degree in Data Science, Statistics, Mathematics, CS, or Economics graduating in 2027 or 2028.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Data Science', 'Statistics'],
    preferredSkills: ['Spark', 'Graph Neural Networks', 'A/B Testing Frameworks'],
    deadline: '2026-11-24',
    startDate: '2027-05-31',
    dateAdded: '2026-10-15',
    verificationStatus: 'verified_official',
    sourceName: 'Stripe University Careers',
    sourceUrl: 'https://stripe.com/jobs',
    applicationUrl: 'https://stripe.com/jobs',
    responsibilities: [
      'Analyze petabyte-scale transaction graphs using SQL and PySpark.',
      'Build LightGBM / XGBoost models predicting chargeback liabilities.',
      'Present experimental offline validation metrics to Risk product managers.'
    ],
    benefits: [
      'Work with one of the most respected engineering teams on the internet.',
      'Comprehensive healthcare and housing package.',
      'High conversion to full-time Data Scientist roles.'
    ]
  },

  // 22. WORKSHOP - Cloud Architecture & DevOps
  {
    id: 'opp-22',
    title: 'Kubernetes & Cloud-Native Architecture Masterclass',
    organisation: 'Cloud Native Computing Foundation (CNCF)',
    organisationWebsite: 'https://www.cncf.io',
    category: 'workshop',
    description: 'Free 3-week guided training on container orchestration, service meshes, GitOps, and Helm packaging.',
    fullDescription: 'Learn directly from certified Kubernetes administrators. The curriculum steps through container fundamentals, declarative Pod manifests, ingress controllers, and automated CI/CD deployments using ArgoCD.',
    location: 'Online Self-Paced with Live Labs',
    workMode: 'remote',
    experienceLevel: 'beginner',
    compensationType: 'unpaid',
    duration: '3 Weeks (Nov 23 - Dec 14, 2026)',
    eligibility: 'Open to all students with basic terminal familiarity. No prior cloud experience required.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Docker', 'Linux', 'Git', 'Terminal/Bash'],
    preferredSkills: ['Go', 'YAML', 'Networking Basics'],
    deadline: '2026-11-18', // 18 days away
    startDate: '2026-11-23',
    dateAdded: '2026-10-24',
    verificationStatus: 'verified_official',
    sourceName: 'CNCF Community Groups',
    sourceUrl: 'https://community.cncf.io',
    applicationUrl: 'https://community.cncf.io',
    responsibilities: [
      'Deploy 5 practical cloud-native labs using local Minikube or Kind clusters.',
      'Configure a resilient ingress controller with automatic TLS certificates.',
      'Pass the weekly knowledge verification quizzes.'
    ],
    benefits: [
      'Free practice voucher for the Certified Kubernetes Application Developer (CKAD) exam.',
      'Digital verifiable badge for LinkedIn and GitHub profiles.',
      'Access to the CNCF student Slack workspace with 25,000+ members.'
    ]
  },

  // 23. FELLOWSHIP - AI Safety & Governance
  {
    id: 'opp-23',
    title: 'Frontier AI Safety & Alignment Research Fellowship',
    organisation: 'Centre for the Governance of AI (GovAI) & MATS',
    organisationWebsite: 'https://www.matsprogram.org',
    category: 'fellowship',
    description: 'Intensive research mentorship in mechanistic interpretability, reinforcement learning from human feedback, and red-teaming frontier models.',
    fullDescription: 'The ML Alignment Theory Scholars (MATS) program provides scholars with top-tier research mentorship, compute grants, and seminar discussions focused on reducing catastrophic risks from advanced artificial intelligence.',
    location: 'Berkeley, CA + London, UK',
    workMode: 'hybrid',
    experienceLevel: 'advanced',
    compensationType: 'paid',
    duration: '10 Weeks (Spring/Summer 2027)',
    stipend: '$10,000 Scholar Stipend + Housing Provided',
    eligibility: 'Applicants with strong technical background in ML, mathematical logic, or theoretical computer science.',
    eligibleYears: ['3rd', '4th', 'graduate'],
    requiredSkills: ['Python', 'PyTorch', 'Machine Learning', 'Linear Algebra', 'Research'],
    preferredSkills: ['TransformerLens', 'Mechanistic Interpretability', 'RLHF'],
    deadline: '2026-12-05',
    startDate: '2027-02-15',
    dateAdded: '2026-10-18',
    verificationStatus: 'verified_official',
    sourceName: 'MATS Application Portal',
    sourceUrl: 'https://www.matsprogram.org',
    applicationUrl: 'https://www.matsprogram.org',
    responsibilities: [
      'Investigate internal representation geometry and circuit discovery in open weights LLMs.',
      'Produce an independent or co-authored technical report by program conclusion.',
      'Participate in peer review and weekly alignment reading groups.'
    ],
    benefits: [
      'One-on-one mentorship from researchers at Anthropic, OpenAI, Redwood Research, and Oxford.',
      'Dedicated cluster access with 8x H100 GPU nodes.',
      'Full housing in Berkeley or London provided.'
    ]
  },

  // 24. COMPETITION - Space & Aerospace
  {
    id: 'opp-24',
    title: 'NASA Space Apps Challenge 2027 Global Innovation Prize',
    organisation: 'NASA & International Space Agencies',
    organisationWebsite: 'https://www.spaceappschallenge.org',
    category: 'competition',
    description: 'Use NASA open satellite, telemetry, and planetary data to solve real-world challenges on Earth and in space.',
    fullDescription: 'The largest global annual hackathon. Students, engineers, designers, and storytellers use free and open data from NASA, ESA, JAXA, and CSA to address climate shifts, deep space navigation, and asteroid detection.',
    location: 'Hybrid (300+ Local Cities + Global Virtual)',
    workMode: 'remote',
    experienceLevel: 'all',
    compensationType: 'prize',
    prizePool: 'Global Recognition + VIP Invitation to NASA Rocket Launch',
    teamSize: '1 - 6 Participants',
    eventDate: '2027-02-13 to 2027-02-14',
    eligibility: 'Free and open to everyone: high schoolers, undergraduates, graduate students, and professionals.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate', 'all'],
    requiredSkills: ['Data Science', 'Problem Solving', 'Python', 'UI/UX Design'],
    preferredSkills: ['GIS / Remote Sensing', '3D Graphics', 'API Integration'],
    deadline: '2027-01-20',
    dateAdded: '2026-10-25',
    verificationStatus: 'verified_official',
    sourceName: 'NASA Space Apps Official',
    sourceUrl: 'https://www.spaceappschallenge.org',
    applicationUrl: 'https://www.spaceappschallenge.org',
    responsibilities: [
      'Select one of 20 officially published challenge briefs.',
      'Build a working demo incorporating verified open Earth/Space observation data.',
      'Submit a project repository and 2-minute demonstration video.'
    ],
    benefits: [
      'Global winners invited to view a spacecraft launch at NASA Kennedy Space Center in Florida.',
      'Certificates of excellence signed by NASA leadership.',
      'Worldwide press and academic publication features.'
    ]
  },

  // 25. STARTUP PROGRAM - Seed accelerator
  {
    id: 'opp-25',
    title: 'Y Combinator Student Founder Track (W27 Batch)',
    organisation: 'Y Combinator',
    organisationWebsite: 'https://www.ycombinator.com',
    category: 'startup',
    description: '$500,000 standard investment package, 3 months of intense company building, and the world’s most powerful startup alumni network.',
    fullDescription: 'YC has funded some of the most influential student-founded startups including Stripe, Reddit, Scale AI, and Brex. If you are building software or deep tech at university, YC provides founders with capital, tactical advice, and a massive customer network.',
    location: 'San Francisco, CA',
    workMode: 'on-site',
    experienceLevel: 'all',
    compensationType: 'funded',
    awardAmount: '$500,000 Investment ($125k for 7% + $375k MFN SAFE)',
    duration: '3 Months (Jan - Mar 2027)',
    eligibility: 'Student founders working on ambitious software, AI, or hardware companies. Teams of 2 to 3 preferred.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['Software Engineering', 'Technical Prototyping', 'Product Sense'],
    preferredSkills: ['Fast Iteration', 'User Discovery', 'Resilience'],
    deadline: '2026-11-20',
    startDate: '2027-01-05',
    dateAdded: '2026-10-01',
    verificationStatus: 'verified_official',
    sourceName: 'Y Combinator Application',
    sourceUrl: 'https://www.ycombinator.com/apply',
    applicationUrl: 'https://www.ycombinator.com/apply',
    responsibilities: [
      'Focus 100% of your energy on talking to users and shipping code.',
      'Participate in bi-weekly group office hours with YC group partners.',
      'Present your progress at YC Demo Day to 1,000+ top venture investors.'
    ],
    benefits: [
      '$500,000 in immediate growth capital.',
      'Lifetime access to Bookface, the internal alumni network of 10,000+ founders.',
      'Unmatched investor, customer, and mentor introductions.'
    ]
  },

  // 26. INTERNSHIP - Full Stack / Product Engineering
  {
    id: 'opp-26',
    title: 'Full Stack Product Engineering Intern',
    organisation: 'Supabase Open Source Platform',
    organisationWebsite: 'https://supabase.com',
    category: 'internship',
    description: 'Contribute to developer tools, PostgreSQL extensions, auth workflows, and edge function infrastructure in the open.',
    fullDescription: 'Supabase is an open source Firebase alternative built on top of Postgres. Join our developer experience engineering team to build intuitive dashboards, realtime websocket primitives, and TypeScript SDK integrations.',
    location: 'Worldwide (Fully Remote)',
    workMode: 'remote',
    experienceLevel: 'intermediate',
    compensationType: 'paid',
    duration: '12 - 16 Weeks (Summer 2027)',
    stipend: '$6,000 / month',
    eligibility: 'Passionate student coders who love open source and modern web engineering.',
    eligibleYears: ['2nd', '3rd', '4th', 'graduate'],
    requiredSkills: ['TypeScript', 'React', 'PostgreSQL', 'Node.js', 'Git'],
    preferredSkills: ['Go', 'Docker', 'Next.js', 'Elixir'],
    deadline: '2026-11-16', // Closing soon!
    startDate: '2027-06-01',
    dateAdded: '2026-10-20',
    verificationStatus: 'verified_official',
    sourceName: 'Supabase Careers',
    sourceUrl: 'https://supabase.com/careers',
    applicationUrl: 'https://supabase.com/careers',
    responsibilities: [
      'Implement and test UI features in the Supabase Studio dashboard.',
      'Write end-to-end integration tests using Playwright and Jest.',
      'Answer community questions on Discord and review incoming pull requests.'
    ],
    benefits: [
      '100% remote work with flexible asynchronous schedule.',
      'Generous hardware and home-office equipment budget.',
      'Every line of code you ship is open source and permanently in your portfolio.'
    ]
  },

  // 27. SCHOLARSHIP - Regional Diversity & Excellence
  {
    id: 'opp-27',
    title: 'Google Generation Scholarship for Computer Science',
    organisation: 'Google Education Initiatives',
    organisationWebsite: 'https://buildyourfuture.withgoogle.com',
    category: 'scholarship',
    description: '$10,000 grant awarded to aspiring computer scientists who demonstrate equity, diversity, and academic strength.',
    fullDescription: 'The Generation Google Scholarship was established to help aspiring students pursue computing degrees, excel in technology, and become leaders in breaking down societal barriers.',
    location: 'North America / APAC / EMEA',
    workMode: 'remote',
    experienceLevel: 'all',
    compensationType: 'funded',
    awardAmount: '$10,000 USD (or local currency equivalent)',
    eligibility: 'Must be currently enrolled as a full-time student in a Bachelors, Masters, or PhD program in Computer Science or related technical discipline.',
    eligibleYears: ['1st', '2nd', '3rd', '4th'],
    requiredSkills: ['Academic Excellence', 'Community Leadership', 'Computer Science Fundamentals'],
    deadline: '2026-12-20',
    dateAdded: '2026-10-05',
    verificationStatus: 'verified_official',
    sourceName: 'Google Build Your Future',
    sourceUrl: 'https://buildyourfuture.withgoogle.com/scholarships',
    applicationUrl: 'https://buildyourfuture.withgoogle.com/scholarships',
    responsibilities: [
      'Submit short-answer responses highlighting leadership and community engagement.',
      'Provide an updated resume and university transcript.',
      'Attend the virtual scholar community retreat.'
    ],
    benefits: [
      'Unrestricted $10,000 academic grant.',
      'Direct peer community with past Google scholars and Google engineers.',
      'Invitation to exclusive Google tech talks and development sessions.'
    ]
  },

  // 28. HACKATHON - AI for Social Good (Simulated Demo Content)
  {
    id: 'opp-28',
    title: 'CivicAI Impact Hackathon — Urban Resilience Track',
    organisation: 'Metropolitan Future Labs (Demo Organization)',
    organisationWebsite: 'https://example.org/civicai',
    category: 'hackathon',
    description: '[Demo Content] Build predictive tools for flood mitigation, energy grid resilience, and affordable transit optimization.',
    fullDescription: 'A demonstration competition highlighting municipal data streams. Students prototype spatial maps, transit dispatch algorithms, and emergency resource allocation tools. (Note: This is a realistic simulated opportunity for testing and demonstration).',
    location: 'Chicago, IL + Virtual',
    workMode: 'hybrid',
    experienceLevel: 'beginner',
    compensationType: 'prize',
    prizePool: '$20,000 Student Awards',
    teamSize: '2 - 4 Participants',
    eventDate: '2026-11-28 to 2026-11-29',
    eligibility: 'College students from any accredited university. First-time hackathon attendees specifically encouraged.',
    eligibleYears: ['1st', '2nd', '3rd', '4th', 'all'],
    requiredSkills: ['Python', 'Data Science', 'JavaScript', 'UI/UX'],
    preferredSkills: ['Mapbox', 'Pandas', 'FastAPI'],
    deadline: '2026-11-21',
    dateAdded: '2026-10-26',
    verificationStatus: 'demo_sample',
    sourceName: 'OpportunityRadar Demo Catalog',
    sourceUrl: 'https://example.com/demo-hackathon',
    applicationUrl: 'https://example.com/demo-apply',
    responsibilities: [
      'Develop a functional prototype using open municipal datasets.',
      'Document methodology and demographic equity safeguards.',
      'Present in the live virtual demo room.'
    ],
    benefits: [
      'Top 3 teams receive cash awards and municipal incubator access.',
      'Mentorship from urban planners and data scientists.',
      'Complimentary cloud credits.'
    ]
  }
];

export const INITIAL_PROFILE = {
  id: 'student-demo-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  university: 'University of Washington',
  degree: 'Bachelor of Science',
  branch: 'Computer Science & Engineering',
  currentYear: '3rd' as const,
  graduationYear: '2028',
  gpa: '3.84 / 4.0',
  bio: 'Junior CS student passionate about distributed systems, modern web platforms, and open source development. Looking for high-impact summer 2027 software engineering internships and research fellowships.',
  skills: ['React', 'TypeScript', 'Python', 'Go', 'Distributed Systems', 'Git', 'Linux', 'SQL', 'Tailwind CSS'],
  interests: ['Cloud Infrastructure', 'Developer Tools', 'Open Source', 'Machine Learning', 'Systems Programming'],
  preferredCategories: ['internship', 'fellowship', 'research', 'hackathon'] as any[],
  preferredLocations: ['Remote', 'San Francisco, CA', 'Seattle, WA', 'London, UK'],
  preferredWorkModes: ['remote', 'hybrid'] as any[],
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    opportunityId: 'opp-1',
    title: 'Distributed Systems & Cloud Infrastructure Intern',
    organisation: 'Cloudflare',
    category: 'internship' as const,
    status: 'interview' as const,
    appliedDate: '2026-10-18',
    deadline: '2026-11-05',
    notes: 'Completed technical coding round on Oct 24. Virtual onsite scheduled for Nov 2 at 2:00 PM EST with two infrastructure engineers.',
    interviewDate: '2026-11-02',
    nextStep: 'Prepare concurrency in Go, distributed hash tables, and p99 latency trade-offs.',
    workMode: 'hybrid' as const,
    location: 'San Francisco, CA',
    stipendOrPrize: '$52 / hour + Housing',
    sourceUrl: 'https://www.cloudflare.com/careers/jobs',
    applicationUrl: 'https://boards.greenhouse.io/cloudflare'
  },
  {
    id: 'app-2',
    opportunityId: 'opp-5',
    title: 'Open Source Software Engineering Fellowship',
    organisation: 'Major League Hacking (MLH)',
    category: 'fellowship' as const,
    status: 'applied' as const,
    appliedDate: '2026-10-22',
    deadline: '2026-11-25',
    notes: 'Submitted application essay and code sample (my open source React library). Waiting on batch review email.',
    nextStep: 'Watch inbox for coding challenge invitation.',
    workMode: 'remote' as const,
    location: 'Worldwide (Remote)',
    stipendOrPrize: 'Up to $5,000 Grant',
    sourceUrl: 'https://fellowship.mlh.io',
    applicationUrl: 'https://fellowship.mlh.io/apply'
  },
  {
    id: 'app-3',
    opportunityId: 'opp-2',
    title: 'Global Autonomous Agents Hackathon 2026',
    organisation: 'Open Source AI Collective',
    category: 'hackathon' as const,
    status: 'interested' as const,
    appliedDate: '2026-10-28',
    deadline: '2026-11-14',
    notes: 'Connected with two teammates on Discord. We plan to build an automated PR reviewer for accessibility bugs.',
    nextStep: 'Finalize project scope and submit team registration form.',
    workMode: 'remote' as const,
    location: 'Global (Virtual)',
    stipendOrPrize: '$75,000 Prize Pool',
    sourceUrl: 'https://devpost.com',
    applicationUrl: 'https://devpost.com/hackathons'
  },
  {
    id: 'app-4',
    opportunityId: 'opp-4',
    title: 'Undergraduate Research Fellow — Efficient ML Systems',
    organisation: 'Berkeley Artificial Intelligence Research (BAIR)',
    category: 'research' as const,
    status: 'assessment' as const,
    appliedDate: '2026-10-15',
    deadline: '2026-11-30',
    notes: 'Received take-home PyTorch profiling exercise on matrix multiplication kernels. Due Nov 8.',
    nextStep: 'Complete CUDA profiling report and push benchmark script to private repo.',
    workMode: 'hybrid' as const,
    location: 'Berkeley, CA',
    stipendOrPrize: '$2,800 / month',
    sourceUrl: 'https://bair.berkeley.edu',
    applicationUrl: 'https://bair.berkeley.edu'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Deadline Approaching: Cloudflare Intern',
    message: 'The application deadline for Distributed Systems & Cloud Infrastructure Intern is in 5 days (Nov 5).',
    type: 'deadline' as const,
    read: false,
    timestamp: '2 hours ago',
    opportunityId: 'opp-1',
    link: '/opportunity/opp-1'
  },
  {
    id: 'notif-2',
    title: 'New High Match: Supabase Open Source',
    message: 'Supabase posted a Full Stack Product Engineering Intern position matching your TypeScript, React, and Git skills.',
    type: 'match' as const,
    read: false,
    timestamp: 'Yesterday',
    opportunityId: 'opp-26',
    link: '/opportunity/opp-26'
  },
  {
    id: 'notif-3',
    title: 'Application Status Updated',
    message: 'Your Cloudflare application was advanced to the Interview stage on your tracker.',
    type: 'status' as const,
    read: true,
    timestamp: '3 days ago',
    opportunityId: 'opp-1',
    link: '/my-opportunities'
  },
  {
    id: 'notif-4',
    title: 'Welcome to OpportunityRadar',
    message: 'Your personalized profile is active. Check out the "For You" tab for curated matches.',
    type: 'system' as const,
    read: true,
    timestamp: '1 week ago',
    link: '/for-you'
  }
];

