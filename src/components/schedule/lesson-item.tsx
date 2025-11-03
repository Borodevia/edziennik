import { Badge } from '@/components/ui/badge';
import { LessonWithException } from '@/types/schedule';
import { AlertTriangle, XCircle } from 'lucide-react';
import { Card } from '../ui/card';
import {
  TypographyExtraSmall,
  TypographyMedium,
  TypographySmall,
} from '../ui/typography';

type LessonItemProps = {
  lesson: LessonWithException;
};

const formatSecondsToTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);

  return date.toISOString().substring(11, 16);
};

export function LessonItem({ lesson }: LessonItemProps) {
  const isCanceled = lesson.exception?.type == 'canceled';
  const isSubstitution = lesson.exception?.type == 'substitution';

  const displaySubject = lesson.exception?.newData?.subject ?? lesson.subject;
  const displayStart = lesson.exception?.newData?.start ?? lesson.start;
  const displayEnd = lesson.exception?.newData?.end ?? lesson.end;
  const displayTeacher = lesson.exception?.newData?.teacher ?? lesson.teacher;
  const displayRoom = lesson.exception?.newData?.room ?? lesson.room;
  const accentColorClass =
    isCanceled ? 'bg-red-500/90'
    : isSubstitution ? 'dark:bg-amber-500/90 bg-amber-500/70'
    : 'dark:bg-zinc-300/50 bg-zinc-400/40';
  const bgColorClass =
    isCanceled ? 'dark:bg-red-500/15 bg-red-500/30'
    : isSubstitution ? 'dark:bg-amber-500/15 bg-amber-500/30'
    : 'dark:bg-zinc-700/5 bg-zinc-300/5';
  const strikeClass = isCanceled ? 'line-through opacity-50' : '';

  return (
    <Card
      className={`relative w-[300px] p-3 transition-colors hover:shadow-sm rounded-sm h-20 ${bgColorClass}`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${accentColorClass}`}
      />

      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <TypographyMedium
              className={`truncate font-semibold ${strikeClass}`}
            >
              {displaySubject}
            </TypographyMedium>
          </div>
          <div className="flex items-end gap-2 text-sm">
            <TypographySmall className={`whitespace-nowrap ${strikeClass}`}>
              {formatSecondsToTime(displayStart)} -{' '}
              {formatSecondsToTime(displayEnd)}
            </TypographySmall>
          </div>
        </div>

        <div
          className={`mt-1 flex items-center justify-between font-light gap-2 text-sm `}
        >
          <TypographyExtraSmall className={strikeClass}>
            {displayTeacher}, sala {displayRoom}
          </TypographyExtraSmall>

          {isCanceled ?
            <Badge
              variant="default"
              className={`gap-1 select-none ${accentColorClass} absolute right-2`}
            >
              <XCircle className="h-3 w-3" />
              Odwołane
            </Badge>
          : isSubstitution ?
            <Badge
              variant="default"
              className={`gap-1 select-none ${accentColorClass} absolute right-2`}
            >
              <AlertTriangle className="h-3 w-3" /> Zastępstwo
            </Badge>
          : null}
        </div>
      </div>
    </Card>
  );
}
