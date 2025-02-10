
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Calendar, Trophy, Medal, TrendingUp } from "lucide-react";
import { Addiction, Milestone } from "@/types/addiction";
import { Progress } from "@/components/ui/progress";

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
  const recoveryRate = addictions?.length 
    ? ((statusCounts.recovered / addictions.length) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-background to-yellow-500/5">
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
        
        <Card className="bg-gradient-to-br from-background to-green-500/5">
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

        <Card className="bg-gradient-to-br from-background to-blue-500/5">
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

        <Card className="bg-gradient-to-br from-background to-purple-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <Trophy className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{milestones?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Progress</CardTitle>
            <Medal className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Recovery Rate</span>
                  <span className="text-sm font-medium">{recoveryRate}%</span>
                </div>
                <Progress value={Number(recoveryRate)} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on the ratio of recovered vs. total records
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Achievements</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones?.slice(0, 2).map((milestone, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="rounded-full p-1.5 bg-primary/10">
                    <Trophy className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{milestone.milestone_type}</p>
                    <p className="text-xs text-muted-foreground">{milestone.days_clean} days clean</p>
                  </div>
                </div>
              ))}
              {(!milestones || milestones.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No milestones achieved yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
