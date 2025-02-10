
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Notification as NotificationType } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/hooks/use-notifications";

export const NotificationsList = () => {
  const { notifications, isLoading, markAllAsRead, unreadCount } = useNotifications();

  if (isLoading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading notifications...
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="p-8 text-center">
        <Bell className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="text-sm font-medium">Notifications</h4>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsRead.mutate()}
            className="h-8 text-xs"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)] px-4">
        <div className="space-y-2 py-4">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
