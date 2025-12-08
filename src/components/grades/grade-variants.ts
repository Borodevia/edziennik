import { cva } from 'class-variance-authority';

export type GradeColor = 'red' | 'sky' | 'gray';

export const CATEGORY_COLOR_MAP: Record<string, GradeColor> = {
  Sprawdzian: 'red',
  Kartkówka: 'sky',
};

export const getGradeColor = (category?: string): GradeColor => {
  return category && CATEGORY_COLOR_MAP[category]
    ? CATEGORY_COLOR_MAP[category]
    : 'gray';
};

export const gradeBadgeVariants = cva(
  'border-2 transition-colors',
  {
    variants: {
      color: {
        red: 'hover:bg-red-200/50 hover:dark:bg-red-900/50 text-red-900 dark:text-red-300 border-red-500/30',
        sky: 'hover:bg-sky-200/50 dark:hover:bg-sky-900/50 text-sky-800 dark:text-sky-300 border-sky-500/30',
        gray: 'bg-transparent hover:bg-gray-100/60 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200 border-border',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export const gradeRowVariants = cva(
  '',
  {
    variants: {
      color: {
        red: 'bg-red-50/60 dark:bg-red-900/10',
        sky: 'bg-sky-50/60 dark:bg-sky-900/10',
        gray: 'bg-gray-100/60 dark:bg-gray-700/20',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export const gradeRowAccentVariants = cva(
  'pl-3 border-l-4',
  {
    variants: {
      color: {
        red: 'border-red-500/50 dark:border-red-500/60',
        sky: 'border-sky-500/50 dark:border-sky-500/60',
        gray: 'border-gray-300/50 dark:border-gray-500/60',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export const gradeSelectedTintVariants = cva(
  '',
  {
    variants: {
      color: {
        red: 'bg-red-50/60 dark:bg-red-900/10 border-red-300/70 dark:border-red-600/30',
        sky: 'bg-sky-50/60 dark:bg-sky-900/10 border-sky-300/70 dark:border-sky-600/30',
        gray: 'bg-muted/20 dark:bg-muted/50 border-gray-300/30 border-border',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export const gradeFocusRingVariants = cva(
  '',
  {
    variants: {
      color: {
        red: 'focus-visible:ring-red-300/50',
        sky: 'focus-visible:ring-sky-300/50',
        gray: 'focus-visible:ring-gray-300/40',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

export const gradeBigTextVariants = cva(
  '',
  {
    variants: {
      color: {
        red: 'text-red-600 dark:text-red-500/80',
        sky: 'text-sky-600 dark:text-sky-500/80',
        gray: 'text-gray-700 dark:text-gray-200',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);
