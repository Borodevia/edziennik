import { ExamsCard } from '@/components/exams/exams-card';
import { GradesCard } from '@/components/grades/grades-card';
import { ScheduleCard } from '@/components/schedule/schedule-card';
import { mockScheduleData } from '@/data/mock-schedule';

export default function Home() {
  const todayDate = new Date();
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:grid-rows-2 h-svh max-h-svh p-2 gap-4 overflow-hidden">
      <GradesCard />
      <ScheduleCard scheduleData={mockScheduleData} todayDate={todayDate} />
      <ExamsCard />
    </div>
  );
}
