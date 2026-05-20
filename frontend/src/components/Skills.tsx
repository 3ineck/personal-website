import {
  Cloud,
  Database,
  Layout,
  Server,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from './Section';
import { skills } from '../config/skills';
import type { SkillCategoryId } from '../types/skills';

const ICONS: Record<SkillCategoryId, LucideIcon> = {
  frontend: Layout,
  backend: Server,
  databases: Database,
  'cloud-devops': Cloud,
  tools: Wrench,
  'testing-quality': ShieldCheck,
};

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {skills.map(({ id, title, items }) => {
          const Icon = ICONS[id];
          return (
            <article
              key={id}
              className="group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-surface/40 p-6 transition-colors hover:border-accent/60"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-surface text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-700 bg-surface/60 px-2.5 py-1 text-xs text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
