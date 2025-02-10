
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
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center border-b border-border/50 px-6 bg-primary/5">
        <Heart className="w-6 h-6 text-primary mr-2 animate-pulse" />
        <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          MindfulRecovery
        </span>
        <SidebarTrigger className="ml-auto h-8 w-8 hover:bg-primary/10 transition-colors rounded-lg">
          <ChevronRight className="h-4 w-4" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-medium px-6 py-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 relative group mx-2",
                      "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
                      "focus:bg-primary/10 focus:text-primary",
                      "active:bg-primary/5",
                      location.pathname === item.to && "bg-primary/10 text-primary translate-x-1"
                    )}
                  >
                    <Link to={item.to} className="flex items-center w-full">
                      <div className="relative">
                        <item.icon className={cn(
                          "w-4 h-4 shrink-0",
                          "transition-transform duration-200",
                          "group-hover:scale-110",
                          location.pathname === item.to && "scale-110"
                        )} />
                        {location.pathname === item.to && (
                          <div className="absolute -left-1 -right-1 -bottom-1 h-0.5 bg-primary rounded-full" />
                        )}
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className="font-medium text-sm">{item.title}</span>
                        <p className={cn(
                          "text-[11px] text-muted-foreground/70",
                          "transition-all duration-200",
                          "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
                          location.pathname === item.to && "opacity-100 translate-y-0"
                        )}>
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
