import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from './Section';
import { experiences } from '../config/experience';
import type { ExperienceEntry } from '../types/experience';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(value: string): string {
  const [month, year] = value.split('/');
  const idx = Number(month) - 1;
  if (idx < 0 || idx > 11 || !year) return value;
  return `${MONTHS[idx]} ${year}`;
}

function formatRange(entry: ExperienceEntry): string {
  const start = formatDate(entry.startDate);
  const end = entry.endDate ? formatDate(entry.endDate) : 'Present';
  return `${start} – ${end}`;
}

function formatDuration(entry: ExperienceEntry): string {
  const [sMonth, sYear] = entry.startDate.split('/').map(Number);
  const endRef = entry.endDate ? entry.endDate.split('/').map(Number) : null;
  const now = new Date();
  const eMonth = endRef ? endRef[0] : now.getMonth() + 1;
  const eYear = endRef ? endRef[1] : now.getFullYear();
  const totalMonths = (eYear - sYear) * 12 + (eMonth - sMonth);
  if (totalMonths < 1) return '<1 mo';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function Experience() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const total = experiences.length;

  const go = useCallback(
    (delta: number) => {
      setIndex(([current]) => [(current + delta + total) % total, delta]);
    },
    [total],
  );

  const goTo = useCallback(
    (target: number) => {
      setIndex(([current]) => [target, target > current ? 1 : -1]);
    },
    [],
  );

  const entry = experiences[index];

  return (
    <Section id="experience" title="Experience">
      <p className="max-w-3xl">
        Projects and companies I’ve worked on throughout my professional
        experience.
      </p>

      <div
        className="relative mt-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="Professional experience"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(-1);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(1);
          }
        }}
        tabIndex={0}
      >
        <div className="flex items-stretch gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous experience"
            className="hidden shrink-0 self-center rounded-full border border-zinc-800 bg-surface/60 p-2 text-foreground transition-colors hover:border-accent hover:text-accent md:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative h-[38rem] flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-surface/40 sm:h-[32rem] md:h-[30rem]">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.article
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex h-full flex-col gap-5 p-6 md:p-8"
                aria-label={`${entry.role} at ${entry.company}`}
              >
                <header className="space-y-1">
                  <p className="flex items-center gap-2 text-sm uppercase tracking-widest text-accent">
                    <Briefcase className="h-4 w-4" />
                    {entry.endDate ? 'Past role' : 'Current role'}
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                    {entry.role}
                  </h3>
                  <p className="text-lg text-foreground/90">{entry.company}</p>
                  <p className="text-sm text-muted">
                    {formatRange(entry)}
                    <span className="mx-2 text-zinc-600">·</span>
                    {formatDuration(entry)}
                  </p>
                </header>

                <ul className="list-disc space-y-2 pl-5 text-base text-muted md:text-[1.0625rem]">
                  {entry.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>

                {entry.tools && (
                  <div className="mt-auto pt-2">
                    <BadgeRow label="Tools" items={entry.tools} />
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next experience"
            className="hidden shrink-0 self-center rounded-full border border-zinc-800 bg-surface/60 p-2 text-foreground transition-colors hover:border-accent hover:text-accent md:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous experience"
            className="rounded-full border border-zinc-800 bg-surface/60 p-2 text-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Select experience"
          >
            {experiences.map((exp, i) => (
              <button
                key={`${exp.company}-${exp.startDate}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to ${exp.role} at ${exp.company}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next experience"
            className="rounded-full border border-zinc-800 bg-surface/60 p-2 text-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}

function BadgeRow({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-widest text-muted/70">
        {label}
      </p>
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
    </div>
  );
}
