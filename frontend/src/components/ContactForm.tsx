import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Button } from './ui/Button';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as
  | string
  | undefined;

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FieldKey = 'name' | 'email' | 'subject' | 'message';
type FieldErrors = Partial<Record<FieldKey, string>>;

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
};

function validateFields(values: typeof initialFields): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim() === '') errors.name = 'Name is required.';
  if (values.email.trim() === '') errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (values.subject.trim() === '') errors.subject = 'Subject is required.';
  if (values.message.trim() === '') errors.message = 'Message is required.';
  return errors;
}

const inputClass =
  'w-full rounded-lg border border-zinc-800 bg-surface/60 px-3 py-2 text-base text-foreground placeholder:text-muted/50 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50';

export function ContactForm({ open, onClose, triggerRef }: Props) {
  const titleId = useId();
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'submitting') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, status, onClose]);

  const handleClose = () => {
    if (status === 'submitting') return;
    onClose();
    window.setTimeout(() => {
      triggerRef?.current?.focus();
    }, 0);
  };

  const handleChange = (key: keyof typeof initialFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (key !== 'company' && fieldErrors[key as FieldKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as FieldKey];
        return next;
      });
    }
  };

  const resetForm = () => {
    setFields(initialFields);
    setFieldErrors({});
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (fields.company.trim() !== '') {
      setStatus('success');
      resetForm();
      return;
    }

    const errors = validateFields(fields);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    if (!turnstileToken) {
      setStatus('error');
      setErrorMessage('Please complete the captcha before sending.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, turnstileToken }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      setStatus('success');
      resetForm();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error && err.message
          ? `Couldn't send the message: ${err.message}. Please try again or email me directly.`
          : "Couldn't send the message. Please try again or email me directly.",
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-surface shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={status === 'submitting'}
              aria-label="Close contact form"
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted transition-colors hover:text-accent disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              {status === 'success' ? (
                <h3
                  id={titleId}
                  className="text-xl font-bold tracking-tight text-emerald-400 md:text-2xl"
                >
                  Message sent!
                  <br />
                  I'll reply to you as soon as I can.
                </h3>
              ) : (
                <>
                  <h3
                    id={titleId}
                    className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
                  >
                    Send me a message
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Fill out the form and I'll get back to you as soon as I can.
                  </p>
                </>
              )}

              {status === 'success' ? null : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-foreground">
                        Name
                      </span>
                      <input
                        ref={firstFieldRef}
                        type="text"
                        required
                        autoComplete="name"
                        value={fields.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={status === 'submitting'}
                        aria-invalid={Boolean(fieldErrors.name)}
                        className={inputClass}
                      />
                      {fieldErrors.name && (
                        <p
                          role="alert"
                          className="mt-1 text-xs text-rose-300"
                        >
                          {fieldErrors.name}
                        </p>
                      )}
                    </label>

                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-foreground">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={fields.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        disabled={status === 'submitting'}
                        aria-invalid={Boolean(fieldErrors.email)}
                        className={inputClass}
                      />
                      {fieldErrors.email && (
                        <p
                          role="alert"
                          className="mt-1 text-xs text-rose-300"
                        >
                          {fieldErrors.email}
                        </p>
                      )}
                    </label>
                  </div>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">
                      Subject
                    </span>
                    <input
                      type="text"
                      required
                      value={fields.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      disabled={status === 'submitting'}
                      aria-invalid={Boolean(fieldErrors.subject)}
                      className={inputClass}
                    />
                    {fieldErrors.subject && (
                      <p role="alert" className="mt-1 text-xs text-rose-300">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </label>

                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-foreground">
                      Message
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={fields.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      disabled={status === 'submitting'}
                      aria-invalid={Boolean(fieldErrors.message)}
                      className={`${inputClass} resize-y`}
                    />
                    {fieldErrors.message && (
                      <p role="alert" className="mt-1 text-xs text-rose-300">
                        {fieldErrors.message}
                      </p>
                    )}
                  </label>

                  <div
                    aria-hidden
                    className="sr-only"
                    style={{ position: 'absolute', left: '-9999px' }}
                  >
                    <label>
                      Company (leave empty)
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={fields.company}
                        onChange={(e) =>
                          handleChange('company', e.target.value)
                        }
                      />
                    </label>
                  </div>

                  {TURNSTILE_SITE_KEY ? (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                      options={{ theme: 'dark' }}
                    />
                  ) : null}

                  {status === 'error' && errorMessage && (
                    <p
                      role="alert"
                      className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleClose}
                      disabled={status === 'submitting'}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={
                        status === 'submitting' ||
                        (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)
                      }
                    >
                      <Send size={18} />
                      {status === 'submitting' ? 'Sending…' : 'Send message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
