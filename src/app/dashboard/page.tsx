import { ExamsCard } from '@/components/exams/exams-card';
import { GradesCard } from '@/components/grades/grades-card';
import { ScheduleCard } from '@/components/schedule/schedule-card';
import { mockScheduleData } from '@/data/mockSchedule';

export default function Home() {
  const todayDate = new Date().toISOString();
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] grid-rows-2 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] p-4 gap-4 overflow-hidden">
      <GradesCard />
      <ScheduleCard scheduleData={mockScheduleData} todayDate={todayDate} />
      <ExamsCard />
    </div>
  );
}
