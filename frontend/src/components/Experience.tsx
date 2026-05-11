import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <p className="max-w-3xl">
        My professional journey will be detailed here soon — including the
        roles, teams, and projects I've contributed to.
      </p>
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-surface/40 p-6 md:p-8">
        <p className="text-sm uppercase tracking-widest text-accent">
          Coming soon
        </p>
        <p className="mt-2 text-foreground">
          Detailed experience timeline is on its way.
        </p>
      </div>
    </Section>
  );
}
