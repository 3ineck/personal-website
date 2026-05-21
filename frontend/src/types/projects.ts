export type ProjectStatus =
  | 'active'
  | 'delivered'
  | 'in-production'
  | 'maintaining';

export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  technologies: readonly string[];
  status: ProjectStatus;
  github?: string;
};
