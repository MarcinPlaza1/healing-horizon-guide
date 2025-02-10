
import { ChevronRight, Heart, Calendar, Settings2, LayoutDashboard, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Main Dashboard",
    icon: LayoutDashboard,
    section: "dashboard",
  },
  {
    title: "Progress",
    icon: TrendingUp,
    section: "progress",
  },
  {
    title: "Wellness",
    icon: Heart,
    section: "wellness",
  },
  {
    title: "Calendar",
    icon: Calendar,
    section: "calendar",
  },
  {
    title: "Settings",
    icon: Settings2,
    section: "settings",
  }
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-border/50">
      <div className="flex h-16 items-center border-b border-border/50 px-6">
        <Heart className="w-6 h-6 text-primary mr-2" />
        <span className="font-semibold">MindfulRecovery</span>
        <SidebarTrigger className="ml-auto h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors",
                    "hover:bg-secondary hover:text-foreground",
                    "focus:bg-secondary focus:text-foreground",
                    "active:bg-secondary/80"
                  )}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
