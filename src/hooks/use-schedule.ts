import { LessonWithException, ScheduleData } from '@/types/schedule';
import { DateTime } from 'luxon';

export const useSchedule = (data: ScheduleData, currentDate?: string) => {
  const { schoolTimezone, weeklySchedule, exceptions } = data;

  const timeInSchool =
    currentDate ?
      DateTime.fromISO(currentDate, { zone: schoolTimezone })
    : DateTime.now().setZone(schoolTimezone);

  const dayOfWeek = timeInSchool.weekday;
  const schoolDate = timeInSchool.toFormat('yyyy-MM-dd');

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
