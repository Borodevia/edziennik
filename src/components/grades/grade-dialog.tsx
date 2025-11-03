'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { stylesFor } from '@/lib/categoryStyles';
import { useEffect, useRef, useState, type ReactElement } from 'react';

import type { Grade } from '@/app/dashboard/grades/page';

type Props = {
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
}: Props): ReactElement {
  const [selected, setSelected] = useState<number | null>(
    grades.length ? initialIndex : null
  );

  useEffect(() => {
    if (open) setSelected(grades.length ? initialIndex : null);
  }, [open, grades, initialIndex]);

  const detailsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        detailsRef.current?.focus();
      }, 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  const current = selected !== null ? grades[selected] : undefined;

  // use centralized styles helper
  const getStyles = (cat?: string) => stylesFor(cat);

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-6xl sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>
            Lista ocen oraz szczegóły wybranej oceny
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-[36%_64%] max-h-[80vh] overflow-hidden">
          <Card className="p-4 sm:p-3 overflow-auto min-h-[200px]">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Oceny
            </div>
            <div className="flex flex-col gap-2">
              {grades.map((g, i) => {
                const s = getStyles(g.category);
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(i);
                    }}
                    aria-pressed={i === selected}
                    className={`w-full text-left inline-flex items-center gap-4 rounded-lg px-3 py-2 transition-colors border ${
                      i === selected ?
                        `border-border bg-muted/70 ${s.selectedTintClasses}`
                      : 'border-transparent hover:bg-muted/30'
                    } focus:outline-none focus-visible:ring-2  ${s.focusRingClass}`}
                  >
                    <Badge
                      variant="outline"
                      className={`font-semibold text-base p-0 w-10 h-10 flex items-center justify-center ${s.badgeClasses}`}
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
                      {g.date ?? ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-8 sm:p-6 overflow-auto min-h-[200px]">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Szczegóły oceny
            </div>
            {current ?
              <div className="grid gap-4">
                <div
                  className="flex items-start gap-8 focus:outline-none"
                  ref={detailsRef}
                  tabIndex={-1}
                >
                  <div
                    className={`text-8xl sm:text-6xl font-extrabold leading-none w-28 flex items-center justify-center ${getStyles(current?.category).bigGradeClass}`}
                  >
                    {current.value}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl sm:text-xl font-semibold truncate">
                      {current.category}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground truncate">
                      {current.teacher ?? 'Brak nauczyciela'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {current.date ?? ''}
                    </div>
                    <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                      {current.description || 'Brak opisu.'}
                    </div>
                  </div>
                </div>
              </div>
            : <div className="text-sm text-muted-foreground">
                Brak wybranej oceny
              </div>
            }
          </Card>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChangeAction(false)}
            className="ml-auto rounded-md px-4 py-2 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            Zamknij
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
