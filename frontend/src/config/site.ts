import type { SiteConfig } from '../types/site';

export const site: SiteConfig = {
  name: 'eineck.dev',
  author: 'Raphael Thiago Eineck',
  description:
    'Software Developer focused on building clean, reliable, and user-friendly applications. I enjoy solving real problems with code and shipping products that make a difference.',
  location: 'Itajaí, Brazil',
  profileImage: '/profile.jpg',
  email: 'raphael.rte@proton.me',
  links: {
    linkedin: 'https://www.linkedin.com/in/raphaelthiagoeineck',
    github: 'https://github.com/3ineck',
    cv: '/api/cv',
  },
  sections: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
};
