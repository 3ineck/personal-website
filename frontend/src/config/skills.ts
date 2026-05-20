import type { SkillCategory } from '../types/skills';

export const skills: readonly SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'React', 'Next.js'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Express',
      'Python',
      'REST APIs',
      'Webhooks',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Mongoose'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud/DevOps',
    items: ['GitHub Actions', 'Docker', 'CI/CD', 'Linux'],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Scrum (Agile)',
      'Large Language Models',
      'Prompt Engineering',
      'LLM Skills',
      'LLM Agents',
      'Claude Code',
    ],
  },
  {
    id: 'testing-quality',
    title: 'Testing/Quality',
    items: ['Jest', 'Code Review', 'Clean Code'],
  },
];
