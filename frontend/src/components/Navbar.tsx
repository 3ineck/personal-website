import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '../config/site';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClick = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollTo(id));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/80 bg-background/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        <button
          onClick={() => scrollTo('hero')}
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:text-accent"
        >
          {site.name}
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {site.sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-accent md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-t border-zinc-900/80 bg-background/95 backdrop-blur md:hidden"
          >
            <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2">
              {site.sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleClick(s.id)}
                    className="block w-full py-3 text-left text-base font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
