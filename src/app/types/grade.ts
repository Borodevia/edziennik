export type Grade = {
  value: number;
  description: string;
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
  teacher?: string;
  date?: string;
};

export type SubjectGrades = {
  subject: string;
  grades: Grade[];
};

export type GradesDataType = SubjectGrades[];
