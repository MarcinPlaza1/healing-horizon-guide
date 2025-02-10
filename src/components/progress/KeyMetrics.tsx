
import { Card } from "@/components/ui/card";
import { TrendingUp, Trophy, ChartLine, Star } from "lucide-react";

interface KeyMetricsProps {
  streak_count: number;
  longest_clean_streak: number;
  recovery_rate: number;
  total_milestones: number;
}

export const KeyMetrics = ({ 
  streak_count, 
  longest_clean_streak, 
  recovery_rate, 
  total_milestones 
}: KeyMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
            <h3 className="text-2xl font-bold mt-1">{streak_count} days</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Longest Clean Streak</p>
            <h3 className="text-2xl font-bold mt-1">{longest_clean_streak} days</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
            <h3 className="text-2xl font-bold mt-1">
              {Math.round(recovery_rate)}%
            </h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <ChartLine className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Milestones</p>
            <h3 className="text-2xl font-bold mt-1">{total_milestones}</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Star className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};
