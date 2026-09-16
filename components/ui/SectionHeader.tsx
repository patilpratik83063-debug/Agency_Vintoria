import { cn } from '@/lib/utils';

/**
 * Shared section header: eyebrow pill + two-line headline (with a
 * gradient emphasis span) + right-aligned intro copy. Was duplicated
 * ~10x across sections with drift.
 */
interface SectionHeaderProps {
  eyebrow: string;
  titleLead: string;
  /** Rendered as the gradient emphasis line under titleLead. */
  titleAccent?: string;
  intro?: string;
  className?: string;
  align?: 'split' | 'center';
}

export function SectionHeader({
  eyebrow,
  titleLead,
  titleAccent,
  intro,
  className,
  align = 'split',
}: SectionHeaderProps) {
  const headline = (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-white">
      {titleLead}
      {titleAccent ? (
        <>
          <br />
          <span className="bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </>
      ) : null}
    </h2>
  );

  if (align === 'center') {
    return (
      <div className={cn('flex flex-col items-center gap-6 text-center', className)}>
        <Eyebrow>{eyebrow}</Eyebrow>
        {headline}
        {intro ? (
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-300">{intro}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end', className)}>
      <div className="flex flex-col gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        {headline}
      </div>
      {intro ? (
        <p className="text-base sm:text-lg leading-relaxed text-zinc-300 lg:pb-2">{intro}</p>
      ) : null}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-full border border-hairline-raised bg-overlay px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-xl',
        className
      )}
    >
      {children}
    </span>
  );
}
