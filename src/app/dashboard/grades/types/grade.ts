/**
 * Represents a single grade entry for a student.
 */
export type Grade = {
  /** Unique identifier for the grade */
  id: string;
  /** The numerical value of the grade (e.g., 1-6) */
  value: number;
  /** Optional description or comment about the grade */
  description: string;
  /** The category of assessment */
  category:
    | 'Kartkówka'
    | 'Sprawdzian'
    | 'Odpowiedź ustna'
    | 'Projekt'
    | 'Laboratorium'
    | 'Prezentacja'
    | 'Zadanie domowe'
    | 'Wypracowanie'
    | 'Praca domowa';
  /** The name of the teacher who assigned the grade */
  teacher?: string;
  /** Timestamp of when the grade was given */
  date?: number;
};

/**
 * Represents a collection of grades for a specific subject.
 */
export type SubjectGrades = {
  /** The name of the subject (e.g., Mathematics) */
  subject: string;
  /** List of grades associated with this subject */
  grades: Grade[];
};

/**
 * The main data structure for holding all grades across all subjects.
 */
export type GradesDataType = SubjectGrades[];
