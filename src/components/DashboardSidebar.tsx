
import { ChevronRight, Heart, Calendar, Settings2, LayoutDashboard, TrendingUp, CheckSquare, Pill, BarChart, LineChart, Brain, Apple, Activity, Grid3X3, Target, RotateCcw } from "lucide-react";
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
    title: "Overview",
    icon: Grid3X3,
    to: "/dashboard",
    description: "General overview of your progress"
  },
  {
    title: "Activities",
    icon: Activity,
    to: "/dashboard/progress",
    description: "Track your daily activities"
  },
  {
    title: "Analytics",
    icon: LineChart,
    to: "/dashboard/analytics",
    description: "Detailed analytics and insights"
  },
  {
    title: "Daily Check-in",
    icon: CheckSquare,
    to: "/dashboard/daily-checkin",
    description: "Record your daily well-being"
  },
  {
    title: "Recovery Progress",
    icon: Target,
    to: "/dashboard/addiction",
    description: "Monitor your recovery journey"
  },
  {
    title: "Dopamine Reset",
    icon: RotateCcw,
    to: "/dashboard/dopamine-detox",
    description: "Manage dopamine detox activities"
  },
  {
    title: "Nutrition Log",
    icon: Apple,
    to: "/dashboard/nutrition",
    description: "Track your nutrition intake"
  },
  {
    title: "Health Stats",
    icon: BarChart,
    to: "/dashboard/stats",
    description: "View your health statistics"
  },
  {
    title: "Calendar",
    icon: Calendar,
    to: "/dashboard/calendar",
    description: "Schedule and plan activities"
  },
  {
    title: "Settings",
    icon: Settings2,
    to: "/dashboard/settings",
    description: "Customize your experience"
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
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors relative group",
                      "hover:bg-secondary hover:text-foreground",
                      "focus:bg-secondary focus:text-foreground",
                      "active:bg-secondary/80",
                      location.pathname === item.to && "bg-secondary text-foreground"
                    )}
                  >
                    <Link to={item.to} className="flex items-center w-full">
                      <item.icon className="w-4 h-4 shrink-0" />
                      <div className="ml-3">
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground hidden group-hover:block">
                          {item.description}
                        </p>
                      </div>
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
