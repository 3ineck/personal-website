import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { IconLink } from './ui/IconLink';
import { site } from '../config/site';
import { titles } from '../config/titles';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = useSmoothScroll();

  return (
    <footer className="border-t border-zinc-900/80 px-4 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-center md:gap-8">
          <button
            onClick={() => scrollTo('hero')}
            className="group text-left focus-visible:outline-none"
            aria-label="Back to top"
          >
            <p className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent group-focus-visible:text-accent md:text-2xl">
              {site.author}
            </p>
            <p className="mt-1 text-sm text-muted md:text-base">
              {titles[0]}
            </p>
          </button>

          <ul className="flex flex-wrap gap-6 md:flex-nowrap md:justify-center md:gap-4 lg:gap-6">
            {site.sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 md:justify-end">
            <IconLink href={site.links.linkedin} label="LinkedIn profile">
              <Linkedin size={20} />
            </IconLink>
            <IconLink href={site.links.github} label="GitHub profile">
              <Github size={20} />
            </IconLink>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-2 border-t border-zinc-900/80 pt-6 text-sm text-muted">
          <p>
            © {year} {site.author}. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
