import SubjectsClient from '@/components/grades/subjects-client';
import type { ReactElement } from 'react';
import { gradesData } from './data/gradesData';

export default function Home(): ReactElement {
  return <SubjectsClient items={gradesData} />;
}
