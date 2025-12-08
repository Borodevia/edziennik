'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { gradeButton } from '@/lib/classnames';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type ReactElement } from 'react';

import type { Grade } from '@/app/dashboard/grades/types/grade';
import {
  getGradeColor,
  gradeBadgeVariants,
  gradeBigTextVariants,
  gradeFocusRingVariants,
  gradeSelectedTintVariants,
} from './grade-variants';

type GradeDialogProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  subject: string;
  grades: Grade[];
  initialIndex?: number;
};

export default function GradeDialog({
  open,
  onOpenChangeAction,
  subject,
  grades,
  initialIndex = 0,
}: GradeDialogProps): ReactElement {
  const t = useTranslations('grade-dialog');
  const [selected, setSelected] = useState<number | null>(
    grades.length ? initialIndex : null
  );

  useEffect(() => {
    if (open) setSelected(grades.length ? initialIndex : null);
  }, [open, grades, initialIndex]);

  const detailsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        detailsRef.current?.focus();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const current = selected !== null ? grades[selected] : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-6xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-[36%_64%] max-h-[80vh] overflow-hidden">
          <Card className="p-4 sm:p-3 overflow-auto min-h-[200px]">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              {t('grades')}
            </div>
            <div className="flex flex-col gap-2">
              {grades.map((g, i) => {
                const color = getGradeColor(g.category);
                return (
                  <button
                    key={`${g.value}-${g.date}-${g.category}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(i);
                    }}
                    aria-pressed={i === selected}
                    className={cn(
                      gradeButton({ selected: i === selected }),
                      gradeSelectedTintVariants({ color }),
                      gradeFocusRingVariants({ color })
                    )}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        'font-semibold text-base p-0 w-10 h-10 flex items-center justify-center',
                        gradeBadgeVariants({ color })
                      )}
                    >
                      {g.value}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {g.category}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {g.teacher ?? ''}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {g.date ? new Date(g.date).toLocaleDateString() : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-8 sm:p-6 overflow-auto min-h-[200px]">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              {t('details')}
            </div>
            {current ?
              <div className="grid gap-4">
                <div
                  className="flex items-start gap-8 focus:outline-none"
                  ref={detailsRef}
                  tabIndex={-1}
                >
                  <div
                    className={cn(
                      'text-8xl sm:text-6xl font-extrabold leading-none w-28 flex items-center justify-center',
                      gradeBigTextVariants({
                        color: getGradeColor(current?.category),
                      })
                    )}
                  >
                    {current.value}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl sm:text-xl font-semibold truncate">
                      {current.category}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground truncate">
                      {current.teacher ?? t('noTeacher')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {current.date ?
                        new Date(current.date).toLocaleDateString()
                      : ''}
                    </div>
                    <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                      {current.description || t('noDescription')}
                    </div>
                  </div>
                </div>
              </div>
            : <div className="text-sm text-muted-foreground">
                {t('noSelected')}
              </div>
            }
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChangeAction(false)}>
            {t('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
