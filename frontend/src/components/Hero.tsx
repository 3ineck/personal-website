import { motion } from 'framer-motion';
import { Download, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/Button';
import { IconLink } from './ui/IconLink';
import { Typewriter } from './Typewriter';
import { site } from '../config/site';
import { titles } from '../config/titles';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-4 pt-20 md:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.p
            variants={item}
            className="text-sm font-medium uppercase tracking-widest text-accent"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {site.author}
          </motion.h1>

          <motion.h2
            variants={item}
            aria-label={titles[0]}
            className="text-xl font-semibold text-muted md:text-2xl"
          >
            <Typewriter words={titles} />
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-4 flex flex-wrap items-center gap-3 md:gap-4"
          >
            <Button as="a" href={site.links.cv} download>
              <Download size={18} />
              Download CV
            </Button>

            <IconLink href={site.links.linkedin} label="LinkedIn profile">
              <Linkedin size={20} />
            </IconLink>

            <IconLink href={site.links.github} label="GitHub profile">
              <Github size={20} />
            </IconLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
