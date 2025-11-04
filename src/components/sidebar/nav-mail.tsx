import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export function NavMail() {
  const navpath = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Mail</SidebarGroupLabel>
      <SidebarMenu></SidebarMenu>
    </SidebarGroup>
  );
}
