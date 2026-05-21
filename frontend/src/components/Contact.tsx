import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from './Section';
import { Button } from './ui/Button';
import { ContactForm } from './ContactForm';
import { site } from '../config/site';

type LinkChannel = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  kind: 'link';
  href: string;
};

type CopyChannel = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  kind: 'copy';
  copyText: string;
};

type Channel = LinkChannel | CopyChannel;

const channels: Channel[] = [
  {
    id: 'email',
    label: 'Email',
    value: site.email,
    icon: Mail,
    kind: 'copy',
    copyText: site.email,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: handleFromUrl(site.links.linkedin, '/in/'),
    icon: Linkedin,
    kind: 'link',
    href: site.links.linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: handleFromUrl(site.links.github, 'github.com/'),
    icon: Github,
    kind: 'link',
    href: site.links.github,
  },
];

function handleFromUrl(url: string, marker: string): string {
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length).replace(/\/+$/, '');
}

const cardClass =
  'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-zinc-800 bg-surface/40 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-surface/60';

export function Contact() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

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
        {channels.map((channel) => {
          const { id, label, value, icon: Icon } = channel;
          const copied = copiedId === id;

          const body = (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-surface text-accent transition-colors group-hover:border-accent/60">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                {channel.kind === 'copy' ? (
                  copied ? (
                    <Check
                      className="h-5 w-5 text-accent transition-all duration-300"
                      aria-hidden
                    />
                  ) : (
                    <Copy
                      className="h-5 w-5 text-muted transition-colors duration-300 group-hover:text-accent"
                      aria-hidden
                    />
                  )
                ) : (
                  <ArrowUpRight
                    className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted/70">
                  {label}
                </p>
                <p className="mt-1 break-all text-base font-medium text-foreground transition-colors group-hover:text-accent">
                  {copied ? 'Copied to clipboard!' : value}
                </p>
              </div>
            </>
          );

          if (channel.kind === 'copy') {
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleCopy(id, channel.copyText)}
                aria-label={
                  copied
                    ? `${label} copied to clipboard`
                    : `Copy ${label.toLowerCase()} address ${value} to clipboard`
                }
                className={cardClass}
              >
                {body}
              </button>
            );
          }

          return (
            <a
              key={id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label}: ${value}`}
              className={cardClass}
            >
              {body}
            </a>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">
          Prefer to send a message right here?
        </p>
        <Button
          ref={triggerRef}
          type="button"
          variant="primary"
          onClick={() => setIsFormOpen(true)}
        >
          <Send size={18} />
          Send a message
        </Button>
      </div>

      <ContactForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        triggerRef={triggerRef}
      />
    </Section>
  );
}
