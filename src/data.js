// All site content lives here. Anything in [brackets] is a placeholder —
// it's shown dimmed on the site until you replace it.

export const profile = {
  name: 'Nico Liao',
  fullName: 'Chun Hao (Nico) Liao',
  initials: 'NL',
  school: 'University of Toronto',
  program: 'Computer Science',
  location: 'Toronto, ON',
  tagline:
    'Computer Science student at the University of Toronto, working across AI, backend engineering, and game development — from chess engines to Unreal Engine combat systems.',
  email: 'ch.liao9557@gmail.com',
  github: 'https://github.com/NicoLiao',
  linkedin: 'https://linkedin.com/in/nico-liao',
  resume: '/resume.pdf',
}

export const typewriterWords = [
  'chess engines.',
  'backend systems.',
  'games.',
  'neural networks.',
]

export const about = {
  paragraphs: [
    "I'm Nico, a Computer Science student at the University of Toronto, drawn to the places where artificial intelligence, software engineering, and game development meet.",
    "I got my start in competitive programming — reaching the USACO Gold Division and competing in Meta Hacker Cup — and I've been building small games, crawlers, and AI experiments ever since.",
    "Recently I've built backend tooling for network hardware at Accton, trained policy–value networks for a chess engine with UTMIST, and prototyped turn-based combat in Unreal Engine 5 at Softstar. Outside of work, I help run game jams for the UofT Game Design and Development Club.",
  ],
  facts: [
    { label: 'School', value: 'University of Toronto' },
    { label: 'Degree', value: 'HBSc, Computer Science' },
    { label: 'Graduating', value: 'May 2028 (expected)' },
    { label: 'Languages', value: 'Mandarin · English · Japanese' },
  ],
  awards: [
    { title: 'USACO Gold Division', year: '2024' },
    { title: 'International Merit Admission Award', year: '2024' },
    { title: 'Meta Hacker Cup Certificate', year: '2022 – 2023' },
  ],
}

export const experience = [
  {
    company: 'Accton Technology',
    role: 'Full-Stack Developer Intern',
    period: 'May 2026 – Aug. 2026',
    points: [
      'Built internal web tools with Django, Django Ninja, and Tailwind CSS for monitoring network devices and reducing manual setup work.',
      'Created a PySerial interface for USB barcode and QR scanners that handled device detection, serial commands, and IP verification.',
      'Used Huey and Redis to move long-running device diagnostics to background tasks and cache frequently requested data.',
      'Connected ESP32 devices to the backend over MQTT to collect live hardware metrics and device status.',
      'Containerized the web application, background workers, and Redis with Docker to keep development and testing environments consistent across the team.',
    ],
    tags: ['Django', 'Django Ninja', 'Redis', 'Huey', 'MQTT', 'ESP32', 'PySerial', 'Docker'],
  },
  {
    company: 'Softstar Entertainment',
    role: 'Assistant Developer Intern',
    period: 'May 2025 – Aug. 2025',
    points: [
      'Built a turn-based 3D combat prototype in Unreal Engine 5 using C++ and Blueprints, including turn order, character stats, and basic enemy behavior.',
      'Created combat menus, action prompts, and status displays with Unreal Motion Graphics (UMG).',
      'Presented demo builds during design meetings and iterated on the combat system and UI based on feedback from the team.',
    ],
    tags: ['Unreal Engine 5', 'C++', 'Blueprints', 'UMG'],
  },
  {
    company: 'UofT Game Design and Development Club',
    role: 'Event Coordinator',
    period: 'Apr. 2025 – Present',
    points: [
      'Organized game jams and competitions for 100+ students, coordinating schedules, judging, prizes, and collaboration with other student clubs.',
      'Reached out to external sponsors and secured prizes for club competitions and events.',
      'Helped members debug gameplay systems and mechanics in Unity and Godot projects during game jams and club activities.',
    ],
    tags: ['Unity', 'Godot', 'Game Jams', 'Sponsorships'],
  },
]

export const featuredProject = {
  title: 'FixMyElo',
  subtitle: 'AlphaZero-style chess engine',
  org: 'UTMIST',
  role: 'Project Developer',
  period: 'Oct. 2025 – Sep. 2026',
  summary:
    'A 10-person UTMIST team building an AlphaZero-style chess engine that models move choices at different player Elo levels.',
  points: [
    'Processed PGN game archives into board positions and move data, grouping training samples by player rating.',
    'Trained a policy–value neural network in PyTorch to predict move probabilities and evaluate board positions for use with Monte Carlo Tree Search.',
  ],
  tags: ['PyTorch', 'Monte Carlo Tree Search', 'Policy–Value Network', 'Python'],
  links: {}, // add { code: 'https://github.com/...' } once the repo is public
}

// Smaller projects, mostly from my earlier portfolio (nicoliao.github.io/Nico-Web).
export const projectCategories = ['All', 'Games', 'AI', 'Tools & Web']

export const projects = [
  {
    title: 'Wizard Hop',
    category: 'Games',
    summary: 'A 2D platformer where a wizard battles monsters across three levels — clear every monster in a level to reach the goal.',
    tags: ['Unity', 'WebGL'],
    links: { demo: 'https://play.unity.com/mg/other/webgl-builds-303644' },
  },
  {
    title: 'Visual Novel',
    category: 'Games',
    summary: 'An anime-style visual novel for the web where different choices lead to different endings.',
    tags: ['JavaScript', 'HTML/CSS'],
    links: { code: 'https://github.com/NicoLiao/VisualNovel', demo: 'https://nicoliao.github.io/VisualNovel/main.html' },
  },
  {
    title: 'Alien Invasion',
    category: 'Games',
    summary: 'A spaceship shooter with three lives and a score for every alien destroyed.',
    tags: ['Python'],
    links: { code: 'https://github.com/NicoLiao/Alien-invasion', demo: 'https://replit.com/@Yokasi/AlienAi#alien.py' },
  },
  {
    title: 'AniGame',
    category: 'Games',
    summary: 'A text-based card game inspired by a Discord game — draw a random character and fight through levels of enemies.',
    tags: ['C++'],
    links: { code: 'https://github.com/NicoLiao/Anigame' },
  },
  {
    title: 'Number Guesser',
    category: 'AI',
    summary: 'A model that predicts which digit a user draws on a board.',
    tags: ['Python', 'Machine Learning'],
    links: { code: 'https://github.com/NicoLiao/Verify-Number' },
  },
  {
    title: 'Anime Predictor',
    category: 'AI',
    summary: 'Classifies anime characters from user-uploaded images.',
    tags: ['Python', 'Image Classification'],
    links: { code: 'https://github.com/NicoLiao/Anime-character-predictor' },
  },
  {
    title: 'Pixiv Downloader',
    category: 'Tools & Web',
    summary: "A desktop tool that crawls Pixiv's daily ranking page and downloads the top 50 illustrations.",
    tags: ['Python', 'Web Crawling'],
    links: {
      code: 'https://github.com/NicoLiao/Pixiv-Downloader',
      demo: 'https://github.com/NicoLiao/Pixiv-Downloader/releases/tag/v1.0',
    },
  },
  {
    title: 'FanPage',
    category: 'Tools & Web',
    summary: 'A fan site for the VTuber Amatsuka Uto.',
    tags: ['HTML/CSS'],
    links: { code: 'https://github.com/NicoLiao/Fanpage', demo: 'https://nicoliao.github.io/Fanpage/Home.html' },
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'C#', 'Java', 'C', 'JavaScript', 'SQL', 'Bash', 'HTML/CSS'] },
  { group: 'Frameworks & Libraries', items: ['Django', 'Django Ninja', 'PyTorch', 'NumPy', 'Pandas', 'Tailwind CSS', 'PySerial'] },
  { group: 'Databases & Tools', items: ['PostgreSQL', 'SQLite', 'Redis', 'Git', 'Docker', 'Docker Compose', 'Linux', 'REST APIs', 'OpenAPI', 'MQTT'] },
  { group: 'Game Development & AI', items: ['Unreal Engine 5', 'Unity', 'Godot', 'Monte Carlo Tree Search'] },
]

export const interests = [
  'Artificial Intelligence',
  'Software Engineering',
  'Game Development',
  'Backend Systems',
  'Chess Engines',
  'Competitive Programming',
]

// True for "[placeholder]" strings, so components can style them distinctly.
export const isPlaceholder = (s) => typeof s === 'string' && /^\[.*\]$/.test(s.trim())
