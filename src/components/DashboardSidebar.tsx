
import { ChevronRight, Heart, Calendar, Settings2, LayoutDashboard, TrendingUp, CheckSquare, Pill, BarChart, LineChart } from "lucide-react";
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
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Main Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    title: "Progress",
    icon: TrendingUp,
    to: "/dashboard/progress",
  },
  {
    title: "Analytics",
    icon: LineChart,
    to: "/dashboard/analytics",
  },
  {
    title: "Daily Check-in",
    icon: CheckSquare,
    to: "/dashboard/daily-checkin",
  },
  {
    title: "Addiction Recovery",
    icon: Pill,
    to: "/dashboard/addiction",
  },
  {
    title: "Health Statistics",
    icon: BarChart,
    to: "/dashboard/stats",
  },
  {
    title: "Calendar",
    icon: Calendar,
    to: "/dashboard/calendar",
  },
  {
    title: "Settings",
    icon: Settings2,
    to: "/dashboard/settings",
  }
];

export function DashboardSidebar() {
  const location = useLocation();

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
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors",
                      "hover:bg-secondary hover:text-foreground",
                      "focus:bg-secondary focus:text-foreground",
                      "active:bg-secondary/80",
                      location.pathname === item.to && "bg-secondary text-foreground"
                    )}
                  >
                    <Link to={item.to}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
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
