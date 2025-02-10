
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KeyMetricProps {
  title: string;
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
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Card>
  );
};
