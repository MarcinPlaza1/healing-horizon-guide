
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
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center border-b border-border/50 px-6 bg-primary/5">
        <Heart className="w-6 h-6 text-primary mr-2 animate-pulse" />
        <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {t('general.appName')}
        </span>
        <SidebarTrigger className="ml-auto h-8 w-8 hover:bg-primary/10 transition-colors rounded-lg">
          <ChevronRight className="h-4 w-4" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-medium px-6 py-2">
            {t('general.dashboard')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-300 relative group mx-2",
                      "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
                      "focus:bg-primary/10 focus:text-primary",
                      "active:bg-primary/5",
                      location.pathname === item.to && [
                        "bg-primary/10 text-primary translate-x-1",
                        "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                        "before:w-1 before:h-8 before:bg-primary before:rounded-r-full"
                      ]
                    )}
                  >
                    <Link to={item.to} className="flex items-center w-full">
                      <div className="relative">
                        <item.icon className={cn(
                          "w-5 h-5 shrink-0",
                          "transition-all duration-300",
                          "group-hover:scale-110 group-hover:rotate-3",
                          location.pathname === item.to && "scale-110 text-primary"
                        )} />
                        {location.pathname === item.to && (
                          <div className="absolute -inset-2 bg-primary/10 rounded-full -z-10 animate-pulse" />
                        )}
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className={cn(
                          "font-medium text-sm",
                          location.pathname === item.to && "font-semibold"
                        )}>
                          {item.title}
                        </span>
                        <p className={cn(
                          "text-[11px] text-muted-foreground/70",
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
