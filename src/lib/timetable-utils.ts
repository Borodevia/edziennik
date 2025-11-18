// Define the Lesson type
export interface Lesson {
  lessonNumber: number;
  startTime: string;
  endTime: string;
  roomNumber: string;
  teacher: string;
  subject: string;
}

// Convert "8:00" → 480 (minutes from midnight)
export function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

// Convert 480 → "8:00"
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}

// Find earliest time from lesson array
export function getEarliestTime(lessons: Lesson[]): number {
  if (lessons.length === 0) {
    throw new Error("getEarliestTime called with empty lessons array");
  }
  return Math.min(...lessons.map(lesson => parseTime(lesson.startTime)));
}

// Find latest time from lesson array
export function getLatestTime(lessons: Lesson[]): number {
  if (lessons.length === 0) {
    throw new Error("getLatestTime called with empty lessons array");
  }
  return Math.max(...lessons.map(lesson => parseTime(lesson.endTime)));
}