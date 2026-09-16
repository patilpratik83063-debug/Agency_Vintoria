import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * The card recipe for the whole site, with exactly three surface
 * steps so cards read as a hierarchy over the video backdrop instead
 * of fourteen slightly different frosted panes.
 */
const glassCard = cva(
  'rounded-2xl border backdrop-blur-xl transition-[border-color,background-color,box-shadow,transform] duration-300 ease-smooth',
  {
    variants: {
      surface: {
        soft: 'border-hairline bg-overlay-soft',
        standard: 'border-hairline-raised bg-overlay',
        strong: 'border-hairline-raised bg-overlay-strong',
      },
      interactive: {
        none: '',
        hover: 'hover:border-hairline-bright hover:bg-black/80',
      },
    },
    defaultVariants: { surface: 'standard', interactive: 'none' },
  }
);

interface GlassCardProps
  extends VariantProps<typeof glassCard>,
    React.HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ className, surface, interactive, children, ...props }: GlassCardProps) {
  return (
    <div className={cn(glassCard({ surface, interactive }), className)} {...props}>
      {children}
    </div>
  );
}

export { glassCard };
