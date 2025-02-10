
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface KeyMetricProps {
  title: ReactNode;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    direction: "up" | "down";
    color: "red" | "green";
  };
}

export const KeyMetricsCard = ({ title, value, subtitle, icon: Icon, trend }: KeyMetricProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {subtitle}
              {trend && (
                <span className={`inline-flex items-center ${
                  trend.color === "green" ? "text-green-500" : "text-red-500"
                }`}>
                  {trend.direction === "up" ? "↑" : "↓"}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Card>
  );
};
