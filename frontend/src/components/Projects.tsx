import { Github } from 'lucide-react';
import { Section } from './Section';
import { projects } from '../config/projects';
import type { ProjectStatus } from '../types/projects';

type StatusStyle = {
  label: string;
  bar: string;
  tag: string;
  hoverBorder: string;
  hoverIcon: string;
};

const STATUS_ORDER: Record<ProjectStatus, number> = {
  'in-production': 0,
  maintaining: 1,
  active: 2,
  delivered: 3,
};

const STATUS_STYLES: Record<ProjectStatus, StatusStyle> = {
  active: {
    label: 'Active',
    bar: 'bg-emerald-500',
    tag: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    hoverBorder: 'hover:border-emerald-500/60',
    hoverIcon: 'hover:text-emerald-400',
  },
  'in-production': {
    label: 'In Production',
    bar: 'bg-sky-500',
    tag: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
    hoverBorder: 'hover:border-sky-500/60',
    hoverIcon: 'hover:text-sky-400',
  },
  delivered: {
    label: 'Delivered',
    bar: 'bg-violet-500',
    tag: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
    hoverBorder: 'hover:border-violet-500/60',
    hoverIcon: 'hover:text-violet-400',
  },
  maintaining: {
    label: 'Maintaining',
    bar: 'bg-amber-500',
    tag: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    hoverBorder: 'hover:border-amber-500/60',
    hoverIcon: 'hover:text-amber-400',
  },
};

export function Projects() {
  const sortedProjects = [...projects].sort((a, b) => {
    const byStatus = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (byStatus !== 0) return byStatus;
    return b.date.localeCompare(a.date);
  });

  return (
    <Section id="projects" title="Projects">
      <p className="max-w-3xl">
        A selection of projects I’ve built and shipped over the years.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {sortedProjects.map((project) => {
          const style = STATUS_STYLES[project.status];
          return (
            <article
              key={project.id}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-surface/40 transition-colors ${style.hoverBorder}`}
            >
              <div className={`h-1.5 w-full ${style.bar}`} aria-hidden />

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.tag}`}
                  >
                    {style.label}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                      className={`text-muted transition-colors ${style.hoverIcon}`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>

                <p className="text-sm text-muted">{project.description}</p>

                <p className="text-xs uppercase tracking-widest text-muted/70">
                  {project.date}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-zinc-700 bg-surface/60 px-2.5 py-1 text-xs text-foreground/90"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
