'use client';

import { LayoutGroup, motion } from 'motion/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';

import type { SubjectGrades } from '@/app/dashboard/grades/types/grade';
import Subject from './subject';

type Props = {
  items: SubjectGrades[];
};

export default function SubjectsClient({ items }: Props): ReactElement {
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
        {items.map((item, idx) => {
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
