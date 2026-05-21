import type { Project } from '../types/projects';

export const projects: readonly Project[] = [
  {
    id: 'whatsmynote',
    title: 'WhatsMyNote',
    description:
      "A CLI that turns photos of highlighted book passages into Obsidian markdown notes. Reads the image through the OpenAI API or a local LLM via LM Studio, then writes the extracted highlights straight to your vault.",
    date: '2026',
    technologies: ['JavaScript', 'Node.js', 'OpenAI API', 'LM Studio'],
    status: 'active',
    github: 'https://github.com/3ineck/whatsmynote',
  },
  {
    id: 'eineck-dev',
    title: 'eineck.dev',
    description:
      'Personal portfolio site built as a small monorepo with a React frontend and an Express backend that also serves the built SPA in production.',
    date: '2026',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Express',
      'Docker',
    ],
    status: 'active',
    github: 'https://github.com/3ineck/personal-website',
  },
  {
    id: 'local-market',
    title: 'Local Market Platform',
    description:
      'E-commerce storefront and back-office management system being built for a small local market. Covers the online storefront, product catalog, inventory, sales, and administrative tooling. Details are kept general due to client confidentiality.',
    date: '2026',
    technologies: [],
    status: 'in-production',
  },
  {
    id: 'flamerino',
    title: 'Flamerino',
    description:
      'A Discord bot built for the Nocturnal Flame community in Final Fantasy XIV. Features daily reminders with interactive buttons, configurable slash commands, a birthday system, and FFXIV utilities such as retainer price lookups (Universalis API) and hunt timers.',
    date: '2023',
    technologies: [
      'JavaScript',
      'Node.js',
      'Discord.js',
      'MongoDB',
      'Mongoose',
      'Universalis API',
      'Heroku',
    ],
    status: 'delivered',
    github: 'https://github.com/3ineck/flamerino',
  },
  {
    id: 'ez-cert',
    title: 'EZ CERT',
    description:
      'Sales and partner management platform built for EZ CERT, a digital certificate company. Handles 2,000+ orders, automates billing and partner commissioning, integrates PIX and boleto payments, auto-fills client data via CNPJ/CEP APIs, and ships notifications by email and Discord. Source is closed by the company; live at ezcert.com.br.',
    date: '2026',
    technologies: [
      'JavaScript',
      'Node.js',
      'Express',
      'Bootstrap',
      'PostgreSQL',
      'Discord.js',
      'Docker',
      'CI/CD',
    ],
    status: 'maintaining',
    github: 'https://github.com/3ineck/ez-cert',
  },
];
