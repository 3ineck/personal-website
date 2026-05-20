import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from './Section';
import { site } from '../config/site';

type Channel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

const channels: Channel[] = [
  {
    id: 'email',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: handleFromUrl(site.links.linkedin, '/in/'),
    href: site.links.linkedin,
    icon: Linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: handleFromUrl(site.links.github, 'github.com/'),
    href: site.links.github,
    icon: Github,
  },
];

function handleFromUrl(url: string, marker: string): string {
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length).replace(/\/+$/, '');
}

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Let's work together?
        </h3>
        <p className="mt-3">
          I'm always open to interesting projects and friendly conversations.
          Pick whichever channel suits you best and say hi.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {channels.map(({ id, label, value, href, icon: Icon }) => {
          const isExternal = !href.startsWith('mailto:');
          return (
            <a
              key={id}
              href={href}
              {...(isExternal
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              aria-label={`${label}: ${value}`}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-zinc-800 bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-surface/60"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-surface text-accent transition-colors group-hover:border-accent/60">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted/70">
                  {label}
                </p>
                <p className="mt-1 break-all text-base font-medium text-foreground transition-colors group-hover:text-accent">
                  {value}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
