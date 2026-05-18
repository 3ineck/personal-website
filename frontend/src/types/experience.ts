export type ExperienceEntry = {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: readonly string[];
  tools?: readonly string[];
};
