import { LessonWithException, ScheduleData } from '@/types/schedule';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

export const useSchedule = (data: ScheduleData, currentDate?: Date) => {
  const { schoolTimezone, weeklySchedule, exceptions } = data;

  const referenceDate = currentDate ?? new Date();
  const timeInSchool = toZonedTime(referenceDate, schoolTimezone);
  const dayOfWeek = Number(
    formatInTimeZone(referenceDate, schoolTimezone, 'i')
  );
  const schoolDate = formatInTimeZone(
    referenceDate,
    schoolTimezone,
    'yyyy-MM-dd'
  );

  const todaysLessons = weeklySchedule.filter(
    (lesson) => lesson.day === dayOfWeek
  );

  const todaysExceptions = exceptions.filter(
    (exception) => exception.date === schoolDate
  );

  const updatedTodaysLessons: LessonWithException[] = todaysLessons.map(
    (lesson) => {
      const exception = todaysExceptions.find(
        (exc) => exc.lessonId === lesson.id
      );
      return {
        ...lesson,
        ...(exception && { exception }),
      };
    }
  );

  return {
    todaysLessons: updatedTodaysLessons,
    dayOfWeek,
    schoolDate,
    timeInSchool,
  };
};
