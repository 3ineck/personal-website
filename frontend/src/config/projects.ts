import type { Project } from '../types/projects';

export const projects: readonly Project[] = [
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
    id: 'sample-delivered',
    title: 'Sample Delivered Project',
    description:
      'Short description of a project that has been completed and handed off. Replace with one of your own.',
    date: '2024',
    technologies: ['Node.js', 'PostgreSQL'],
    status: 'delivered',
    github: 'https://github.com/3ineck',
  },
  {
    id: 'sample-in-production',
    title: 'Sample Production Project',
    description:
      'Short description of a project currently running in production. Replace with one of your own.',
    date: '2025',
    technologies: ['Next.js', 'TypeScript', 'MongoDB'],
    status: 'in-production',
    github: 'https://github.com/3ineck',
  },
];
