import { cn } from '@/lib/utils';

/**
 * Shared dark-glass form controls. Previous inputs used
 * focus:border-white focus:outline-none, which gave keyboard users
 * essentially no visible focus — the global :focus-visible ring in
 * globals.css now covers these.
 */
const field =
  'w-full rounded-xl border border-hairline-raised bg-overlay-soft px-4 py-3 text-sm text-white placeholder:text-zinc-500 backdrop-blur-xl transition-[border-color,background-color] duration-300 ease-smooth hover:border-hairline-bright focus:border-white';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, 'min-h-32 resize-y', className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(field, 'appearance-none pr-10', className)} {...props}>
      {children}
    </select>
  );
}

export function FieldLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'mb-2 block font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-400',
        className
      )}
      {...props}
    />
  );
}
