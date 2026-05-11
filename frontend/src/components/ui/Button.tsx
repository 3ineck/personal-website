import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-background hover:bg-accent-hover',
  secondary:
    'border border-zinc-700 text-foreground hover:border-accent hover:text-accent',
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type Props = ButtonProps | AnchorProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button({ variant = 'primary', className = '', children, ...rest }, ref) {
    const classes = `${base} ${variants[variant]} ${className}`.trim();

    if (rest.as === 'a') {
      const { as: _as, ...anchorProps } = rest as AnchorProps;
      void _as;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { as: _as, ...buttonProps } = rest as ButtonProps;
    void _as;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
