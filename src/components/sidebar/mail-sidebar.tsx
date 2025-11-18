import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { boxToTitle } from '@/lib/mail-box';

const data = [{ from: 'TCH2', title: 'IDK' }];

export function MailSidebar({
  box,
  ...props
}: { box: string } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" {...props}>
      <SidebarRail />
      <SidebarHeader className="gap-3.5 p-4">
        <h1 className="text-foreground text-base font-medium">
          {boxToTitle(box)}
        </h1>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarMenu>
            {data.map((mail) => (
              <SidebarMenuItem key={mail.title}>
                <SidebarMenuButton className="rounded-none border-solid border-y-sidebar-ring py-2 border-y block h-min">
                  <Avatar>
                    <AvatarFallback>{mail.from.charAt(0)}</AvatarFallback>
                  </Avatar>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
