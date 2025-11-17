import { School } from 'lucide-react';
import * as React from 'react';

import { NavMail } from '@/components/sidebar/nav-mail';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import { StudentSwitcher } from '@/components/sidebar/student-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  students: [
    {
      school: 'Technikum Mechatroniczne nr 1 im. Piotra Drzewieckiego',
      symbol: 'TM1',
      logo: School,
      student: 'Krzysztof Jurkowski',
      id: 1,
    },
    {
      school: 'Liceum Ogólnokształcące im. Mikołaja Kopernika',
      symbol: 'LOK',
      logo: School,
      student: 'Anna Nowak',
      id: 2,
    },
    {
      school: 'Zespół Szkół Elektronicznych',
      symbol: 'ZSE',
      logo: School,
      student: 'Piotr Wiśniewski',
      id: 3,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StudentSwitcher students={data.students} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavMail />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
