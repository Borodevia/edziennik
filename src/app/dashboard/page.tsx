'use client';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TypographyH2,
  TypographyH3,
  TypographyMedium,
  TypographyMuted,
} from '@/components/ui/typography';
import { parseTime } from '@/lib/timetable-utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const data = {
  timetable: {
    monday: [
      {
        lessonNumber: 1,
        startTime: '8:00',
        endTime: '8:45',
        roomNumber: '12',
        teacher: 'A. Kowalski',
        subject: 'Matematyka',
      },
      {
        lessonNumber: 2,
        startTime: '8:50',
        endTime: '9:35',
        roomNumber: '15',
        teacher: 'M. Nowak',
        subject: 'Język polski',
      },
      {
        lessonNumber: 3,
        startTime: '9:40',
        endTime: '10:25',
        roomNumber: '8',
        teacher: 'P. Wiśniewski',
        subject: 'Fizyka',
      },
      {
        lessonNumber: 4,
        startTime: '10:30',
        endTime: '11:15',
        roomNumber: '22',
        teacher: 'K. Dąbrowska',
        subject: 'Historia',
      },
      {
        lessonNumber: 5,
        startTime: '11:35',
        endTime: '12:20',
        roomNumber: '5',
        teacher: 'J. Lewandowski',
        subject: 'Chemia',
      },
      {
        lessonNumber: 6,
        startTime: '12:30',
        endTime: '13:15',
        roomNumber: '18',
        teacher: 'P. Kowalczyk',
        subject: 'Geografia',
      },
      {
        lessonNumber: 7,
        startTime: '13:20',
        endTime: '14:15',
        roomNumber: '18',
        teacher: 'A. Wójcik',
        subject: 'Informatyka',
      },
      {
        lessonNumber: 8,
        startTime: '14:20',
        endTime: '15:05',
        roomNumber: '18',
        teacher: 'M. Grabowski',
        subject: 'Muzyka',
      },
      {
        lessonNumber: 9,
        startTime: '15:10',
        endTime: '15:55',
        roomNumber: '18',
        teacher: 'S. Majewska',
        subject: 'Biologia',
      },
      {
        lessonNumber: 10,
        startTime: '16:00',
        endTime: '16:45',
        roomNumber: '18',
        teacher: 'T. Kaczmarek',
        subject: 'Wychowanie fizyczne',
      },
    ],
    tuesday: [
      {
        lessonNumber: 1,
        startTime: '8:00',
        endTime: '8:45',
        roomNumber: '21',
        teacher: 'E. Kaczmarek',
        subject: 'Język angielski',
      },
      {
        lessonNumber: 2,
        startTime: '8:50',
        endTime: '9:35',
        roomNumber: '15',
        teacher: 'M. Nowak',
        subject: 'Biologia',
      },
      {
        lessonNumber: 3,
        startTime: '9:40',
        endTime: '10:25',
        roomNumber: '7',
        teacher: 'P. Zieliński',
        subject: 'Wiedza o społeczeństwie',
      },
      {
        lessonNumber: 4,
        startTime: '10:30',
        endTime: '11:15',
        roomNumber: '12',
        teacher: 'A. Kowalski',
        subject: 'Matematyka',
      },
      {
        lessonNumber: 5,
        startTime: '11:35',
        endTime: '12:20',
        roomNumber: '3',
        teacher: 'B. Szymańska',
        subject: 'Plastyka',
      },
      {
        lessonNumber: 6,
        startTime: '12:30',
        endTime: '13:15',
        roomNumber: '18',
        teacher: 'P. Kowalczyk',
        subject: 'Geografia',
      },
    ],
    wednesday: [
      {
        lessonNumber: 1,
        startTime: '8:00',
        endTime: '8:45',
        roomNumber: '10',
        teacher: 'K. Dąbrowska',
        subject: 'Historia',
      },
      {
        lessonNumber: 2,
        startTime: '8:50',
        endTime: '9:35',
        roomNumber: '15',
        teacher: 'M. Nowak',
        subject: 'Język polski',
      },
      {
        lessonNumber: 3,
        startTime: '9:40',
        endTime: '10:25',
        roomNumber: '8',
        teacher: 'P. Wiśniewski',
        subject: 'Fizyka',
      },
      {
        lessonNumber: 4,
        startTime: '10:30',
        endTime: '11:15',
        roomNumber: '14',
        teacher: 'A. Wójcik',
        subject: 'Informatyka',
      },
      {
        lessonNumber: 5,
        startTime: '11:35',
        endTime: '12:20',
        roomNumber: '5',
        teacher: 'J. Lewandowski',
        subject: 'Chemia',
      },
    ],
    thursday: [
      {
        lessonNumber: 1,
        startTime: '8:00',
        endTime: '8:45',
        roomNumber: '12',
        teacher: 'A. Kowalski',
        subject: 'Matematyka',
      },
      {
        lessonNumber: 2,
        startTime: '8:50',
        endTime: '9:35',
        roomNumber: '22',
        teacher: 'K. Dąbrowska',
        subject: 'Historia',
      },
      {
        lessonNumber: 3,
        startTime: '9:40',
        endTime: '10:25',
        roomNumber: '18',
        teacher: 'P. Kowalczyk',
        subject: 'Geografia',
      },
      {
        lessonNumber: 4,
        startTime: '10:30',
        endTime: '11:15',
        roomNumber: '9',
        teacher: 'M. Grabowski',
        subject: 'Muzyka',
      },
      {
        lessonNumber: 5,
        startTime: '11:35',
        endTime: '12:20',
        roomNumber: '4',
        teacher: 'S. Majewska',
        subject: 'Biologia',
      },
      {
        lessonNumber: 6,
        startTime: '12:30',
        endTime: '13:15',
        roomNumber: '18',
        teacher: 'T. Kaczmarek',
        subject: 'Wychowanie fizyczne',
      },
    ],
    friday: [
      {
        lessonNumber: 1,
        startTime: '8:00',
        endTime: '8:45',
        roomNumber: '11',
        teacher: 'B. Szymańska',
        subject: 'Plastyka',
      },
      {
        lessonNumber: 2,
        startTime: '8:50',
        endTime: '9:35',
        roomNumber: '15',
        teacher: 'M. Nowak',
        subject: 'Język polski',
      },
      {
        lessonNumber: 3,
        startTime: '9:40',
        endTime: '10:25',
        roomNumber: '8',
        teacher: 'P. Wiśniewski',
        subject: 'Fizyka',
      },
      {
        lessonNumber: 4,
        startTime: '10:30',
        endTime: '11:15',
        roomNumber: '12',
        teacher: 'A. Kowalski',
        subject: 'Matematyka',
      },
      {
        lessonNumber: 5,
        startTime: '11:35',
        endTime: '12:20',
        roomNumber: '3',
        teacher: 'E. Kaczmarek',
        subject: 'Język angielski',
      },
    ],
    saturday: [],
    sunday: [],
  },
};

type DayKey = keyof typeof data.timetable;

const generateTimetable = function (day: DayKey) {
  const lessons = data.timetable[day];
  if (!lessons || lessons.length === 0)
    return { hours: [], lessons: [], totalHeight: 0 };

  const startMinutes = Math.min(
    ...lessons.map((lesson) => parseTime(lesson.startTime))
  );
  const endMinutes = Math.max(
    ...lessons.map((lesson) => parseTime(lesson.endTime))
  );

  const startHour = Math.floor(startMinutes / 60);
  const endHour = Math.ceil(endMinutes / 60);

  const pixelsPerMinute = 2; // Adjust this value to control spacing

  const hours = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const hourMinutes = hour * 60;
    const topOffset = (hourMinutes - startMinutes) * pixelsPerMinute;
    hours.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      topOffset,
    });
  }

  const lessonsWithPositions = lessons.map((lesson) => {
    const lessonStartMinutes = parseTime(lesson.startTime);
    const lessonEndMinutes = parseTime(lesson.endTime);

    const topOffset = (lessonStartMinutes - startMinutes) * pixelsPerMinute;
    const height = (lessonEndMinutes - lessonStartMinutes) * pixelsPerMinute;

    return {
      ...lesson,
      topOffset,
      height,
    };
  });

  const totalHeight = (endMinutes - startMinutes) * pixelsPerMinute;

  return { hours, lessons: lessonsWithPositions, totalHeight };
};

export default function Home() {
  const [dayIndex, setDayIndex] = useState<number>(() => {
    const d = new Date().getDay();
    return d === 0 ? 7 : d;
  });
  const dayMap: Record<number, DayKey> = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    7: 'sunday',
  };

  const dayMapPL: Record<number, string> = {
    1: 'Poniedziałek',
    2: 'Wtorek',
    3: 'Środa',
    4: 'Czwartek',
    5: 'Piątek',
    6: 'Sobota',
    7: 'Niedziela',
  };

  const todayKey = dayMap[dayIndex];
  const { hours, lessons, totalHeight } = generateTimetable(todayKey);

  // Handlers to move the displayed day forward/backward (wrap around 1..7)
  const prevDay = () => setDayIndex((d) => (d === 1 ? 7 : d - 1));
  const nextDay = () => setDayIndex((d) => (d === 7 ? 1 : d + 1));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] grid-rows-2 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] p-4 gap-4 overflow-hidden">
      <Card className="p-6">
        <TypographyH2 className="mb-4">Oceny</TypographyH2>
        <TypographyMuted>Twoje najnowsze oceny</TypographyMuted>
      </Card>
      <Card className="row-span-2 p-6 flex flex-col min-h-0 pr-6">
        <TypographyH2 className="mb-4">Plan Lekcji</TypographyH2>
        <div className="flex flex-row justify-between pr-6">
          <TypographyH3>{dayMapPL[dayIndex]}</TypographyH3>
          <ButtonGroup>
            <Button
              variant="outline"
              size="lg"
              onClick={prevDay}
              aria-label="Poprzedni dzień"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={nextDay}
              aria-label="Następny dzień"
            >
              <ArrowRight />
            </Button>
          </ButtonGroup>
        </div>
        <ScrollArea className="flex-1 overflow-auto min-h-0 pr-6">
          <div className="flex flex-row h-full">
            <div
              className="w-[60px] relative"
              style={{ height: `${totalHeight}px` }}
            >
              {hours.map((hour) => (
                <div
                  key={hour.time}
                  className="flex items-start absolute before:content-[''] before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:w-[60px] before:bg-accent"
                  style={{ top: `${hour.topOffset}px` }}
                >
                  <TypographyMuted>{hour.time}</TypographyMuted>
                </div>
              ))}
            </div>
            <div
              className="relative ml-4"
              style={{ height: `${totalHeight}px` }}
            >
              <div className="w-[300px]" aria-hidden />
              {lessons.map((lesson) => (
                <Card
                  className="absolute flex flex-row p-2 w-[300px]"
                  key={lesson.lessonNumber}
                  style={{
                    top: `${lesson.topOffset}px`,
                    height: `${lesson.height}px`,
                  }}
                >
                  <div className="text-sm">
                    <TypographyMedium>{lesson.subject}</TypographyMedium>
                    <TypographyMuted>
                      {lesson.startTime} - {lesson.endTime} • Sala{' '}
                      {lesson.roomNumber}
                    </TypographyMuted>
                    <TypographyMuted>{lesson.teacher} </TypographyMuted>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </Card>
      <Card className="p-6">
        <TypographyH2 className="mb-4">Sprawdziany</TypographyH2>
        <TypographyMuted>Nadchodzące sprawdziany</TypographyMuted>
      </Card>
    </div>
  );
}
