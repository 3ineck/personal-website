import type { SiteConfig } from '../types/site';

export const site: SiteConfig = {
  name: 'eineck.dev',
  author: 'Raphael Thiago Eineck',
  description:
    'Web developer driven by curiosity and a passion for technology. Backed by 10+ years bridging business and IT. Proactive, adaptable, and always learning.',
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
