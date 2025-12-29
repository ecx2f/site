export interface Project {
  title: string
  role: string
  description: string
  tags: string[]
  link: string
  linkType: 'repo' | 'live'
  category?: 'open-source' | 'college-project' | 'commercial'
}

export const projects: Project[] = [
  {
    title: 'windots',
    role: 'solo',
    description: 'custom windows 11 dotfiles with catppuccin theming, ui refinements, terminal configs, and productivity optimizations.',
    tags: ['Windows', 'PowerShell', 'Terminal', 'Catppuccin'],
    link: 'https://github.com/ecx2f/windots',
    linkType: 'repo',
    category: 'open-source'
  },
  {
    title: 'unfollowr',
    role: 'solo',
    description: 'simple and safe twitch unfollow tool (browser extension).',
    tags: ['JavaScript', 'Browser Extension'],
    link: 'https://github.com/ecx2f/unfollowr',
    linkType: 'repo',
    category: 'open-source'
  },
  {
    title: 'vanity',
    role: 'solo',
    description: 'a discord vanity role automation bot.',
    tags: ['Node.js', 'Discord.js', 'JavaScript'],
    link: 'https://github.com/ecx2f/vanity',
    linkType: 'repo',
    category: 'open-source'
  },
  {
    title: 'ticketr',
    role: 'solo',
    description: 'modern event ticketing with role sync (college project).',
    tags: ['Java', 'Spring Boot', 'SQLite'],
    link: 'https://github.com/ecx2f/ticketr',
    linkType: 'repo',
    category: 'college-project'
  },
  {
    title: 'aura-kit',
    role: 'solo',
    description: 'opensource web app toolkit for content creators (in progress).',
    tags: ['Next.js', 'TypeScript', 'React'],
    link: 'https://github.com/ecx2f/aura-kit',
    linkType: 'repo',
    category: 'open-source'
  },
  {
    title: 'tridnio',
    role: 'cofounder',
    description: 'tridnio studios website.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/ecx2f/tridnio',
    linkType: 'live',
    category: 'commercial'
  }
]

