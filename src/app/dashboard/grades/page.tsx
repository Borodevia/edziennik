'use client';

import type { ReactElement } from 'react';

import Subject from '@/components/grades/subject';
import { LayoutGroup, motion } from 'motion/react';
import { useRef } from 'react';

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

const gradesData: GradesDataType = [
  {
    subject: 'Matematyka',
    grades: [
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział 1: Równania liniowe — sprawdzian',
        teacher: 'dr Kowalski',
        date: '2025-10-10',
      },
      {
        value: 4,
        category: 'Kartkówka',
        description: 'Dział 2: Funkcje — kartkówka',
        teacher: 'dr Nowak',
        date: '2025-09-22',
      },
      {
        value: 3,
        category: 'Zadanie domowe',
        description: 'Zadanie domowe: Przykłady z procentów',
        teacher: 'mgr Nowak',
        date: '2025-09-01',
      },
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział 3: Całki — sprawdzian',
        teacher: 'dr Kowalski',
        date: '2025-10-03',
      },
    ],
  },
  {
    subject: 'Fizyka',
    grades: [
      {
        value: 4,
        category: 'Laboratorium',
        description: 'Ćwiczenie: Pomiar przyspieszenia — laboratorium',
        teacher: 'mgr Zielińska',
        date: '2025-06-11',
      },
      {
        value: 4,
        category: 'Kartkówka',
        description: 'Dział: Kinematyka — kartkówka',
        teacher: 'dr Wiśniewski',
        date: '2025-06-20',
      },
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział: Elektromagnetyzm — sprawdzian',
        teacher: 'dr Zieliński',
        date: '2025-06-05',
      },
    ],
  },
  {
    subject: 'Język polski',
    grades: [
      {
        value: 3,
        category: 'Odpowiedź ustna',
        description: 'Dział 3: Romantyzm — odpowiedź ustna',
        teacher: 'prof. Malinowski',
        date: '2025-05-07',
      },
      {
        value: 4,
        category: 'Kartkówka',
        description: 'Analiza tekstu: "Dziady" — kartkówka',
        teacher: 'mgr Malinowska',
        date: '2025-04-12',
      },
      {
        value: 4,
        category: 'Kartkówka',
        description: 'Dział 1: Średniowiecze — kartkówka',
        teacher: 'mgr Malinowska',
        date: '2025-03-28',
      },
      {
        value: 5,
        category: 'Prezentacja',
        description: 'Dział 4: Współczesność — prezentacja',
        teacher: 'prof. Malinowski',
        date: '2025-05-20',
      },
    ],
  },
  {
    subject: 'Biologia',
    grades: [
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział: Genetyka — sprawdzian',
        teacher: 'dr Kowalski',
        date: '2025-03-18',
      },
      {
        value: 4,
        category: 'Projekt',
        description: 'Zadanie: Projekt o ekosystemach — projekt',
        teacher: 'dr Zielińska',
        date: '2025-02-25',
      },
      {
        value: 3,
        category: 'Kartkówka',
        description: 'Dział: Tkanki — kartkówka',
        teacher: 'dr Kowalski',
        date: '2025-03-03',
      },
    ],
  },
  {
    subject: 'Chemia',
    grades: [
      {
        value: 4,
        category: 'Laboratorium',
        description: 'Ćwiczenie: Titracja — laboratorium',
        teacher: 'mgr Kwiatkowska',
        date: '2025-02-12',
      },
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział: Chemia organiczna — sprawdzian',
        teacher: 'dr Kwiatkowski',
        date: '2025-02-20',
      },
    ],
  },
  {
    subject: 'Historia',
    grades: [
      {
        value: 5,
        category: 'Prezentacja',
        description: 'Temat: Rewolucja francuska — prezentacja',
        teacher: 'dr Nowak',
        date: '2025-04-02',
      },
      {
        value: 4,
        category: 'Kartkówka',
        description: 'Dział: II wojna światowa — kartkówka',
        teacher: 'mgr Nowak',
        date: '2025-04-10',
      },
      {
        value: 3,
        category: 'Wypracowanie',
        description: 'Wypracowanie: Skutki rewolucji przemysłowej',
        teacher: 'prof. Nowak',
        date: '2025-04-15',
      },
    ],
  },
  {
    subject: 'Informatyka',
    grades: [
      {
        value: 5,
        category: 'Projekt',
        description: 'Projekt: Aplikacja webowa — projekt',
        teacher: 'mgr Wiśniewski',
        date: '2025-07-21',
      },
      {
        value: 5,
        category: 'Sprawdzian',
        description: 'Dział: Algorytmy — sprawdzian',
        teacher: 'mgr Wiśniewski',
        date: '2025-07-15',
      },
      {
        value: 4,
        category: 'Zadanie domowe',
        description: 'Zadanie domowe: Zadanie z programowania — zadanie domowe',
        teacher: 'dr Kowalski',
        date: '2025-06-30',
      },
      {
        value: 5,
        category: 'Projekt',
        description: 'Projekt: Aplikacja webowa — projekt',
        teacher: 'mgr Wiśniewski',
        date: '2025-07-28',
      },
    ],
  },
];

export default function Home(): ReactElement {
  const subjectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getScrollToFn = (idx: number) => () => {
    const ref = subjectRefs.current[idx];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <LayoutGroup>
      <motion.div layout className="m-4">
        {gradesData.map((item, idx) => {
          if (!subjectRefs.current[idx]) subjectRefs.current[idx] = null;
          const refObj = {
            current: subjectRefs.current[idx],
          } as React.RefObject<HTMLDivElement>;
          return (
            <Subject
              item={item}
              idx={idx}
              key={idx}
              scrollToMe={getScrollToFn(idx)}
              subjectRef={refObj}
            />
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
