
import { Heart, Calendar, Settings2, LayoutDashboard, CheckSquare, Apple, Target, ChevronRight } from "lucide-react";
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
import { useTranslation } from "react-i18next";

export function DashboardSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('sidebar.overview'),
      icon: LayoutDashboard,
      to: "/dashboard",
      description: t('sidebar.description.overview')
    },
    {
      title: t('sidebar.dailyCheckin'),
      icon: CheckSquare,
      to: "/dashboard/daily-checkin",
      description: t('sidebar.description.dailyCheckin')
    },
    {
      title: t('sidebar.recovery'),
      icon: Target,
      to: "/dashboard/addiction",
      description: t('sidebar.description.recovery')
    },
    {
      title: t('sidebar.nutrition'),
      icon: Apple,
      to: "/dashboard/nutrition",
      description: t('sidebar.description.nutrition')
    },
    {
      title: t('sidebar.calendar'),
      icon: Calendar,
      to: "/dashboard/calendar",
      description: t('sidebar.description.calendar')
    },
    {
      title: t('sidebar.settings'),
      icon: Settings2,
      to: "/dashboard/settings",
      description: t('sidebar.description.settings')
    }
  ];

  return (
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden">
      <div className="flex h-16 items-center border-b border-border/50 px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Heart className="w-6 h-6 text-primary mr-2 animate-pulse relative" />
        </div>
        <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
          {t('general.appName')}
        </span>
        <SidebarTrigger className="ml-auto h-8 w-8 hover:bg-primary/10 transition-colors rounded-lg group">
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        </SidebarTrigger>
      </div>
      <SidebarContent className="px-2 overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-medium px-4 py-2">
            {t('general.dashboard')}
          </SidebarGroupLabel>
          <SidebarGroupContent className="overflow-x-hidden">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all duration-300 relative group",
                      "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
                      "focus:bg-primary/10 focus:text-primary focus:translate-x-1",
                      "active:bg-primary/5",
                      location.pathname === item.to && [
                        "bg-primary/10 text-primary translate-x-1",
                        "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                        "before:w-1 before:h-8 before:bg-primary before:rounded-r-full",
                        "after:absolute after:inset-0 after:bg-primary/5 after:rounded-lg after:-z-10"
                      ]
                    )}
                  >
                    <Link to={item.to} className="flex items-center w-full">
                      <div className="relative flex items-center justify-center w-10 h-10">
                        <item.icon className={cn(
                          "w-5 h-5 shrink-0",
                          "transition-all duration-300",
                          "group-hover:scale-110 group-hover:rotate-3",
                          location.pathname === item.to && [
                            "scale-110 text-primary",
                            "drop-shadow-[0_0_6px_rgba(var(--primary),0.4)]"
                          ]
                        )} />
                        {location.pathname === item.to && (
                          <div className="absolute inset-0 bg-primary/10 rounded-full -z-10 animate-pulse" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={cn(
                          "font-medium text-sm truncate",
                          "transition-all duration-300",
                          location.pathname === item.to && "font-semibold"
                        )}>
                          {item.title}
                        </span>
                        <p className={cn(
                          "text-[11px] text-muted-foreground/70 truncate",
                          "transition-all duration-300",
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
