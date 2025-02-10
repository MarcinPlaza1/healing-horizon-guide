
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Calendar, Trophy } from "lucide-react";
import { Addiction, Milestone } from "@/types/addiction";

interface AddictionStatsProps {
  addictions: Addiction[] | undefined;
  milestones: Milestone[] | undefined;
}

export const AddictionStats = ({ addictions, milestones }: AddictionStatsProps) => {
  const getStatusCounts = () => {
    if (!addictions) return { active: 0, recovered: 0, relapsed: 0 };
    return addictions.reduce((acc, addiction) => ({
      ...acc,
      [addiction.status]: (acc[addiction.status as keyof typeof acc] || 0) + 1
    }), { active: 0, recovered: 0, relapsed: 0 });
  };

  const getTotalCleanDays = () => {
    if (!addictions) return 0;
    return addictions.reduce((total, addiction) => {
      if (addiction.clean_since) {
        const cleanDays = Math.floor(
          (new Date().getTime() - new Date(addiction.clean_since).getTime()) / (1000 * 60 * 60 * 24)
        );
        return total + cleanDays;
      }
      return total;
    }, 0);
  };

  const statusCounts = getStatusCounts();
  const totalCleanDays = getTotalCleanDays();

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Records</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusCounts.active}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Currently tracking
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recovered</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statusCounts.recovered}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Success stories
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clean Days</CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCleanDays}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Combined recovery time
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{milestones?.length || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Achievements unlocked
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

