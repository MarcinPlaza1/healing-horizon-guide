
import { TrendingUp, Award, Calendar, Activity, Target, ArrowUp, ArrowDown, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { KeyMetricsCard } from "./analytics/KeyMetricsCard";
import { MoodDistributionChart } from "./analytics/MoodDistributionChart";
import { MilestoneProgressChart } from "./analytics/MilestoneProgressChart";
import { useAnalytics, DEFAULT_MOOD_TRENDS, DEFAULT_MILESTONE_COUNTS } from "./analytics/useAnalytics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AnalyticsDashboard = () => {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-primary/10 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-primary/5 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-80 bg-primary/5 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">No analytics data available</p>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Data updated daily
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KeyMetricsCard
            title={
              <div className="flex items-center gap-2">
                Current Streak
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of consecutive days without relapse</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={`${analytics.streak_data.current} days`}
            subtitle={`Weekly avg: ${analytics.streak_data.weekly_average.toFixed(1)} days`}
            icon={TrendingUp}
            trend={{
              direction: analytics.streak_data.current >= analytics.streak_data.weekly_average ? "up" : "down",
              color: analytics.streak_data.current >= analytics.streak_data.weekly_average ? "green" : "red"
            }}
          />

          <KeyMetricsCard
            title={
              <div className="flex items-center gap-2">
                Recovery Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of completed recovery records</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={`${Math.round((analytics.recovery_stats.completed_records / 
              (analytics.recovery_stats.active_records + analytics.recovery_stats.completed_records)) * 100)}%`}
            subtitle={`${analytics.recovery_stats.completed_records} completed records`}
            icon={Target}
            trend={{
              direction: analytics.recovery_stats.completed_records > analytics.recovery_stats.active_records ? "up" : "down",
              color: analytics.recovery_stats.completed_records > analytics.recovery_stats.active_records ? "green" : "red"
            }}
          />

          <KeyMetricsCard
            title={
              <div className="flex items-center gap-2">
                Total Clean Days
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total number of days without relapse across all records</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={analytics.recovery_stats.total_clean_days}
            subtitle="Across all records"
            icon={Calendar}
            trend={{
              direction: "up",
              color: "green"
            }}
          />

          <KeyMetricsCard
            title={
              <div className="flex items-center gap-2">
                Relapse Rate
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of records that experienced a relapse</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={`${analytics.recovery_stats.relapse_rate}%`}
            subtitle="Overall trend"
            icon={Activity}
            trend={{
              direction: analytics.recovery_stats.relapse_rate < 50 ? "down" : "up",
              color: analytics.recovery_stats.relapse_rate < 50 ? "green" : "red"
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoodDistributionChart 
            moodTrends={analytics.mood_trends || DEFAULT_MOOD_TRENDS} 
          />
          <MilestoneProgressChart 
            milestoneCounts={analytics.milestone_counts || DEFAULT_MILESTONE_COUNTS} 
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AnalyticsDashboard;
