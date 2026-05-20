export type SectionDef = {
  id: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  location: string;
  profileImage: string;
  email: string;
  links: {
    linkedin: string;
    github: string;
    cv: string;
  };
  sections: SectionDef[];
};
