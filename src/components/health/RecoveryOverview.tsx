
import { Activity, Target, Pill, Clock } from "lucide-react";

interface RecoveryOverviewProps {
  active: number;
  recovered: number;
  relapsed: number;
  cleanDays: number;
}

export const RecoveryOverview = ({ active, recovered, relapsed, cleanDays }: RecoveryOverviewProps) => {
  return (
    <div className="mt-6">
      <h4 className="text-md font-semibold mb-3">Recovery Overview</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Active Records</p>
          </div>
          <p className="font-medium text-lg">{active}</p>
        </div>
        <div className="p-3 bg-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Recovered</p>
          </div>
          <p className="font-medium text-lg">{recovered}</p>
        </div>
        <div className="p-3 bg-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Need Support</p>
          </div>
          <p className="font-medium text-lg">{relapsed}</p>
        </div>
        <div className="p-3 bg-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Total Clean Days</p>
          </div>
          <p className="font-medium text-lg">{cleanDays}</p>
        </div>
      </div>
    </div>
  );
};
