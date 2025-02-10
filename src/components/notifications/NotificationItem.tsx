
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/hooks/use-notifications";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Info, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
}

const icons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variants = {
  success: "text-green-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  const Icon = icons[notification.type];

  const handleClick = () => {
    if (!notification.read) {
      markAsRead.mutate(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full p-4 text-left flex items-start space-x-4 hover:bg-muted/50 transition-colors",
        !notification.read && "bg-muted/30"
      )}
      onClick={handleClick}
    >
      <Icon className={cn("w-5 h-5 mt-0.5", variants[notification.type])} />
      <div className="flex-1 space-y-1">
        <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(notification.created_at), "PPp")}
        </p>
      </div>
    </Button>
  );
};
