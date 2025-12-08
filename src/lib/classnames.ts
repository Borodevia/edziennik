import { cva } from 'class-variance-authority';

export const gradeButton = cva(
  'w-full text-left inline-flex items-center gap-4 rounded-lg px-3 py-2 transition-colors border focus:outline-none focus-visible:ring-2',
  {
    variants: {
      selected: {
        true: 'border-border bg-muted/70',
        false: 'border-transparent hover:bg-muted/30',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);
