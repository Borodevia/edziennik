'use client';

import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'motion/react';

import type { SubjectGrades } from '@/app/dashboard/grades/types/grade';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';
import { useState, type ReactElement } from 'react';
import { Card } from '../ui/card';
import GradeDialog from './grade-dialog';
import {
  getGradeColor,
  gradeBadgeVariants,
  gradeRowAccentVariants,
  gradeRowVariants,
} from './grade-variants';

type SubjectProps = {
  item: SubjectGrades;
  idx: number;
  scrollToMe?: () => void;
  subjectRef?: React.RefObject<HTMLDivElement>;
};

function Subject({
  item,
  idx,
  scrollToMe,
  subjectRef,
}: SubjectProps): ReactElement {
  const t = useTranslations('subject');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const MotionTableRow = motion.create(TableRow);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogSelected, setDialogSelected] = useState<number>(0);
  const [disableRowAnim, setDisableRowAnim] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (
      open &&
      scrollToMe &&
      subjectRef?.current &&
      typeof window !== 'undefined'
    ) {
      const top =
        subjectRef.current.getBoundingClientRect().top + window.scrollY - 60;

      const threshold = 1;
      const docHeight =
        document.documentElement?.scrollHeight ?? document.body.scrollHeight;
      const isAtBottom =
        window.innerHeight + window.scrollY >= docHeight - threshold;

      if (isAtBottom) {
        const nudge = 16;
        const newTop = Math.max(0, window.scrollY - nudge);
        window.scrollTo({ top: newTop, behavior: 'auto' });

        setTimeout(() => {
          window.scrollTo({ top, behavior: 'smooth' });
        }, 120);
      } else {
        setTimeout(() => {
          window.scrollTo({ top, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const openDialogFor = (index: number) => {
    setDialogSelected(index);
    setDisableRowAnim(true);
    setDialogOpen(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        ease: 'easeOut',
        layout: { duration: 0.28, ease: 'easeOut' },
      }}
      ref={subjectRef}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        className="w-full transition-all duration-200"
      >
        <CollapsibleTrigger asChild>
          <Card className="mb-4 p-4 w-full">
            <motion.div layout="position" className="font-semibold mb-2">
              {item.subject}
            </motion.div>
            {isOpen ?
              <motion.div
                key="table"
                layout
                initial={{ opacity: 0, y: 8, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{
                  duration: 0.22,
                  ease: 'easeOut',
                  layout: { duration: 0.28, ease: 'easeOut' },
                }}
                className="overflow-hidden rounded-md border border-gray-100 dark:border-gray-800"
              >
                <div className="overflow-hidden">
                  <Table className="w-full overflow-hidden">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('grade')}</TableHead>
                        <TableHead>{t('category')}</TableHead>
                        <TableHead>{t('description')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item.grades.map((grade, gidx) => {
                        const color = getGradeColor(grade.category);
                        return (
                          <MotionTableRow
                            key={grade.id}
                            initial={
                              disableRowAnim ? false : { opacity: 0, x: -10 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            layout={!disableRowAnim}
                            transition={{
                              delay: 0.1 * gidx * Math.max(0.3, 1 - gidx * 0.1),
                            }}
                            className={gradeRowVariants({ color })}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              openDialogFor(gidx);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (
                                e.key === 'Enter' ||
                                e.key === ' ' ||
                                e.keyCode === 13 ||
                                e.keyCode === 32
                              ) {
                                e.stopPropagation();
                                e.preventDefault();
                                openDialogFor(gidx);
                              }
                            }}
                          >
                            <TableCell
                              className={cn(
                                'cursor-pointer',
                                gradeRowAccentVariants({ color })
                              )}
                            >
                              {grade.value}
                            </TableCell>
                            <TableCell className="cursor-pointer px-2 py-1">
                              {grade.category}
                            </TableCell>
                            <TableCell className="cursor-pointer">
                              {grade.description}
                            </TableCell>
                          </MotionTableRow>
                        );
                      })}
                    </TableBody>
                    <TableFooter></TableFooter>
                  </Table>
                </div>
              </motion.div>
            : <motion.ul layout className="list-none flex gap-2.5 flex-wrap">
                {item.grades.map((grade, gidx) => (
                  <li key={grade.id} className="">
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.18,
                        ease: 'easeOut',
                        delay: 0.1 * gidx * Math.max(0.3, 1 - gidx * 0.1),
                      }}
                      className="inline-block"
                    >
                      <Badge
                        asChild={false}
                        variant="outline"
                        className={cn(
                          'font-semibold text-sm p-3 aspect-square rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition duration-150',
                          gradeBadgeVariants({
                            color: getGradeColor(grade.category),
                          })
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          openDialogFor(gidx);
                        }}
                      >
                        {grade.value}
                      </Badge>
                    </motion.span>
                  </li>
                ))}
              </motion.ul>
            }
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
      <GradeDialog
        open={dialogOpen}
        onOpenChangeAction={(o) => {
          setDialogOpen(o);
        }}
        subject={item.subject}
        grades={item.grades}
        initialIndex={dialogSelected}
      />
    </motion.div>
  );
}

export default Subject;
