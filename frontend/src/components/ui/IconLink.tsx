import type { ReactNode } from 'react';

type Props = {
  href: string;
  label: string;
  children: ReactNode;
};

export function IconLink({ href, label, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 text-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {children}
    </a>
  );
}
