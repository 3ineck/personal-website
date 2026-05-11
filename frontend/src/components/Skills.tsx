import { motion } from 'framer-motion';
import { skills } from '../config/skills';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export function Skills() {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-foreground md:text-2xl">
        Skills
      </h3>
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            variants={item}
            whileHover={{
              scale: 1.08,
              y: -3,
              transition: { type: 'spring', stiffness: 400, damping: 16 },
            }}
            whileTap={{
              scale: 0.94,
              transition: { duration: 0.1 },
            }}
            className="cursor-pointer rounded-full border border-zinc-700 bg-surface/40 px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
