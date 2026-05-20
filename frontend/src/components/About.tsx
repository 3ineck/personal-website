import { MapPin } from 'lucide-react';
import { Section } from './Section';
import { site } from '../config/site';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
        <div className="mx-auto flex flex-col items-center gap-4 md:mx-0">
          <div className="group relative aspect-square w-56 overflow-hidden rounded-2xl border border-zinc-800 bg-surface shadow-lg ring-1 ring-zinc-800/60 transition-transform duration-300 hover:-translate-y-1 sm:w-64 md:w-72">
            <img
              src={site.profileImage}
              alt={site.author}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {site.author}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              {site.location}
            </p>
          </div>
        </div>

        <div className="max-w-3xl space-y-4">
          <p>
            I'm a Software Developer who enjoys turning complex problems into
            simple, elegant solutions. My work focuses on building reliable
            applications with a strong emphasis on developer experience,
            clean architecture, and thoughtful UX.
          </p>
          <p>
            I care about writing code that's easy to maintain, evolve, and
            reason about. When I'm not coding, I'm usually exploring new
            tools and ideas that can make me a better engineer.
          </p>
        </div>
      </div>
    </Section>
  );
}
