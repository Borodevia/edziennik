export type ColorKey = 'red' | 'sky' | 'gray';

const palette = {
  red: {
    badge:
      'hover:bg-red-200/50  hover:dark:bg-red-900/50  text-red-900 dark:text-red-300 border-2 border-red-500/30',
    rowAccent: 'border-red-500/50 dark:border-red-500/60 ',
    row: 'bg-red-50/60 dark:bg-red-900/10 ',
    selectedTint:
      'bg-red-50/60  dark:bg-red-900/10  border-red-300/70 dark:border-red-600/30',
    focusRing: 'focus-visible:ring-red-300/50',
    bigGrade: 'text-red-600 dark:text-red-500/80',
  },
  sky: {
    badge:
      ' hover:bg-sky-200/50  dark:hover:bg-sky-900/50  text-sky-800 dark:text-sky-300 border-2 border-sky-500/30',
    row: 'bg-sky-50/60 dark:bg-sky-900/10 ',
    rowAccent: 'border-sky-500/50 dark:border-sky-500/60',
    selectedTint:
      'bg-sky-50/60 dark:bg-sky-900/10 border-sky-300/70 dark:border-sky-600/30',
    focusRing: 'focus-visible:ring-sky-300/50',
    bigGrade: 'text-sky-600 dark:text-sky-500/80',
  },
  gray: {
    badge:
      'bg-transparent hover:bg-gray-100/60 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200 border-2',
    row: 'bg-gray-100/60 dark:bg-gray-700/20',
    rowAccent: 'border-gray-300/50  dark:border-gray-500/60',
    selectedTint: 'bg-muted/20 dark:bg-muted/50 border-border border-gray-300/30',
    focusRing: 'focus-visible:ring-gray-300/40',
    bigGrade: 'text-gray-700 dark:text-gray-200',
  },
};

export const CATEGORY_COLOR: Record<string, ColorKey> = {
  Sprawdzian: 'red',
  Kartkówka: 'sky',
};

export function stylesFor(category?: string) {
  const key =
    category && CATEGORY_COLOR[category] ? CATEGORY_COLOR[category] : 'gray';
  const p = palette[key];
  return {
    badgeClasses: p.badge,
    rowClasses: `${p.row}`,
    rowAccentClasses: `pl-3 border-l-4 ${p.rowAccent}`,
    selectedTintClasses: p.selectedTint,
    focusRingClass: p.focusRing,
    bigGradeClass: p.bigGrade,
  };
}

export function setCategoryColor(categoryName: string, colorKey: ColorKey) {
  CATEGORY_COLOR[categoryName] = colorKey;
}
