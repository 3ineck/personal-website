import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          <span className="text-accent">#</span> {title}
        </h2>
        <div className="text-base leading-relaxed text-muted md:text-lg">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
