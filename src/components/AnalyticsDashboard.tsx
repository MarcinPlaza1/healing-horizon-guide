
import { TrendingUp, Award, Calendar, Activity, Target, ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { KeyMetricsCard } from "./analytics/KeyMetricsCard";
import { MoodDistributionChart } from "./analytics/MoodDistributionChart";
import { MilestoneProgressChart } from "./analytics/MilestoneProgressChart";
import { useAnalytics, DEFAULT_MOOD_TRENDS, DEFAULT_MILESTONE_COUNTS } from "./analytics/useAnalytics";

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
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KeyMetricsCard
          title="Current Streak"
          value={`${analytics.streak_data.current} days`}
          subtitle={`Weekly avg: ${analytics.streak_data.weekly_average.toFixed(1)} days`}
          icon={TrendingUp}
        />

        <KeyMetricsCard
          title="Recovery Rate"
          value={`${Math.round((analytics.recovery_stats.completed_records / 
            (analytics.recovery_stats.active_records + analytics.recovery_stats.completed_records)) * 100)}%`}
          subtitle={`${analytics.recovery_stats.completed_records} completed records`}
          icon={Target}
        />

        <KeyMetricsCard
          title="Total Clean Days"
          value={analytics.recovery_stats.total_clean_days}
          subtitle="Across all records"
          icon={Calendar}
        />

        <KeyMetricsCard
          title="Relapse Rate"
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
  );
};

export default AnalyticsDashboard;
