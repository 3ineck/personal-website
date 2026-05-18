import type { ExperienceEntry } from '../types/experience';

export const experiences: readonly ExperienceEntry[] = [
  {
    company: 'EZ Cert Certificação Digital',
    role: 'Full Stack Developer Junior',
    startDate: '12/2023',
    endDate: null,
    description: [
      'Design and develop a full-stack web system for the organization — an e-commerce with an administrative area for managing orders, users, commissions, and reports, using JavaScript, Node.js, React, and PostgreSQL on AWS, including a notification center and a payment compensation module.',
      'Responsible for training company employees, system maintenance, and adding new features.',
      'Develop parallel systems to the main one in order to automate and improve the organization’s processes.',
    ],
    tools: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Express',
      'CI/CD (GitHub Actions)',
      'Docker',
      'PostgreSQL',
      'Discord',
    ],
  },
  {
    company: 'EZ Cert Certificação Digital',
    role: 'IT Specialist',
    startDate: '11/2019',
    endDate: '12/2023',
    description: [
      'Responsible for identifying and resolving technical issues in systems and equipment.',
      'Managed the hardware and software inventory.',
      'Ensured data protection and system security.',
      'Responsible for technical support (helpdesk) and for operational support.',
    ],
    tools: ['OTRS', 'Jira', 'Lecom'],
  },
  {
    company: 'Vendor Digital Certificação Digital',
    role: 'IT Analyst',
    startDate: '10/2017',
    endDate: '11/2019',
    description: [
      'Installed operating systems and configured computers.',
      'Provided technical support (helpdesk).',
      'Performed financial analysis, results reporting, and commission calculations for business partners.',
    ],
  },
  {
    company: 'Vendor Digital Certificação Digital',
    role: 'Registration Agent',
    startDate: '06/2012',
    endDate: '10/2017',
    description: [
      'Provided customer service and technical assistance.',
      'Responsible for issuing digital certificates.',
    ],
  },
];
