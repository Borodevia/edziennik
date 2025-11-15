// Base lesson definition used across the schedule views.
export type Lesson = {
  id: number; // Unique identifier of the lesson slot.
  day: number; // Day index in the weekly schedule (0 = Monday).
  start: number; // Start time encoded as minutes from midnight.
  end: number; // End time encoded as minutes from midnight.
  room: string; // Classroom or location label.
  teacher: string; // Name or identifier of the teacher.
  subject: string; // Subject name shown to the student.
};

// Enumerated schedule change states shared across exception objects.
export type ExceptionType = 'substitution' | 'canceled' | 'moved';

// Change descriptor applied when a single lesson diverges from the base plan.
export type Exception = {
  date: string; // ISO date (YYYY-MM-DD) when the exception applies.
  type: ExceptionType; // Nature of the schedule change.
  lessonId: number; // Reference to the affected lesson by its id.
  newData?: Partial<Lesson>; // Updated fields when the lesson is substituted or moved.
};

// Aggregated schedule payload retrieved from the backend layer.
export type ScheduleData = {
  schoolTimezone: string; // Timezone identifier used to render times correctly.
  weeklySchedule: Lesson[]; // Base weekly rotation without one-off changes.
  exceptions: Exception[]; // Per-date overrides mapped to the base schedule.
};

// Lesson enriched with any matching exception for easier rendering.
export type LessonWithException = Lesson & {
  exception?: Exception; // The exception applied to this lesson on a specific date.
};
