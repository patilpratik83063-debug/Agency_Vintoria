import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Single source of truth for every CTA on the site. Replaces the ~20
 * hand-typed pill recipes that drifted in size, weight and padding.
 * Renders as <a> when `href` is given, <button> otherwise.
 */
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-smooth active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:bg-white/88 shadow-glass',
        secondary:
          'bg-overlay text-white border border-hairline-raised backdrop-blur-xl hover:border-hairline-bright hover:bg-black/80',
        outline:
          'bg-transparent text-white border border-hairline-raised hover:border-white hover:bg-white/5',
        ghost: 'bg-transparent text-zinc-300 hover:text-white',
        accent:
          'bg-accent text-black hover:bg-emerald-300 shadow-[0_8px_32px_rgb(52_211_153/0.25)]',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

type ButtonProps = VariantProps<typeof button> & {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(button({ variant, size }), className);
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { button as buttonVariants };
