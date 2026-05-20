export type SkillCategoryId =
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'cloud-devops'
  | 'tools'
  | 'testing-quality';

export type SkillCategory = {
  id: SkillCategoryId;
  title: string;
  items: readonly string[];
};
