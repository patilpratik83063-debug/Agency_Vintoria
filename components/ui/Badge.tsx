import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * One badge/chip recipe with a fixed set of surface + tone steps —
 * replaces the twelve ad-hoc "rounded-full border-white/xx bg-black/xx"
 * chip variants scattered across sections.
 */
const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em]',
  {
    variants: {
      tone: {
        neutral: 'border-hairline-raised bg-overlay-soft text-zinc-200',
        accent: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        muted: 'border-hairline bg-transparent text-zinc-400',
        bright: 'border-white/60 bg-white text-black',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

interface BadgeProps
  extends VariantProps<typeof badge>,
    React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className, tone, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badge({ tone }), className)} {...props}>
      {children}
    </span>
  );
}
