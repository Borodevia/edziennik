'use client';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  TypographyH2,
  TypographyLarge,
  TypographyMuted,
} from '@/components/ui/typography';
import { useSchedule } from '@/hooks/use-schedule';
import { ScheduleData } from '@/types/schedule';
import { addDays, format, parseISO } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { ArrowLeft, ArrowRight, Undo } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { LessonItem } from './lesson-item';

type ScheduleCardProps = {
  scheduleData: ScheduleData;
  todayDate?: Date;
};

const localDateString = (date: Date, timeZone: string) =>
  formatInTimeZone(date, timeZone, 'yyyy-MM-dd');

const getSchoolDayStart = (date: Date, timeZone: string) =>
  fromZonedTime(`${localDateString(date, timeZone)}T00:00:00`, timeZone);

const shiftSchoolDay = (date: Date, timeZone: string, offset: number) => {
  const currentLocal = localDateString(date, timeZone);
  const shiftedLocal = format(
    addDays(parseISO(currentLocal), offset),
    'yyyy-MM-dd'
  );
  return fromZonedTime(`${shiftedLocal}T00:00:00`, timeZone);
};

const isSameSchoolDay = (a: Date, b: Date, timeZone: string) =>
  formatInTimeZone(a, timeZone, 'yyyy-MM-dd') ===
  formatInTimeZone(b, timeZone, 'yyyy-MM-dd');

export function ScheduleCard({ scheduleData, todayDate }: ScheduleCardProps) {
  const t = useTranslations('schedule-card');
  const schoolTimezone = scheduleData.schoolTimezone;
  const todayInSchool = useMemo(
    () => getSchoolDayStart(todayDate ?? new Date(), schoolTimezone),
    [todayDate, schoolTimezone]
  );

  const [selectedDate, setSelectedDate] = useState<Date>(todayInSchool);

  const { todaysLessons } = useSchedule(scheduleData, selectedDate);
  const formattedDay = formatInTimeZone(selectedDate, schoolTimezone, 'EEEE');
  const formattedDate = formatInTimeZone(
    selectedDate,
    schoolTimezone,
    'dd.MM.yyyy'
  );
  const isTodaySelected = isSameSchoolDay(
    selectedDate,
    todayInSchool,
    schoolTimezone
  );

  const handleToday = () => {
    setSelectedDate(todayInSchool);
  };

  const handlePreviousDay = () => {
    setSelectedDate((current) => shiftSchoolDay(current, schoolTimezone, -1));
  };

  const handleNextDay = () => {
    setSelectedDate((current) => shiftSchoolDay(current, schoolTimezone, 1));
  };
  return (
    <Card className="row-span-2 p-6 flex flex-col min-h-0 w-full sm:w-75 lg:w-100">
      <TypographyH2 className="mb-4">{t('title')}</TypographyH2>
      <div className="flex items-center justify-between gap-4">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" onClick={handlePreviousDay}>
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextDay}>
              <ArrowRight />
            </Button>
          </ButtonGroup>
          <AnimatePresence initial={false} mode="wait">
            {!isTodaySelected && (
              <motion.div
                key="today-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <ButtonGroup>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" onClick={handleToday}>
                        <Undo />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('today')}</p>
                    </TooltipContent>
                  </Tooltip>
                </ButtonGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </ButtonGroup>
        <div className="flex flex-col items-end text-right leading-tight">
          <TypographyLarge>{formattedDay}</TypographyLarge>
          <TypographyMuted>{formattedDate}</TypographyMuted>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto gap-2">
        {todaysLessons.length > 0 ?
          todaysLessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))
        : <p className="text-gray-500">{t('empty')}</p>}
      </div>
    </Card>
  );
}
