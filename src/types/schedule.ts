export type Lesson = {
  id: number;
  day: number;
  start: number;
  end: number;
  room: string;
  teacher: string;
  subject: string;
};

export type Exception = {
  date: string;
  type: 'substitution' | 'canceled' | 'moved';
  lessonId: number;
  newData?: Partial<Lesson>;
};

export type ScheduleData = {
  schoolTimezone: string;
  weeklySchedule: Lesson[];
  exceptions: Exception[];
};

export type LessonWithException = Lesson & {
  exception?: Exception;
};
