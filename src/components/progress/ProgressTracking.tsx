
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface ProgressTrackingProps {
  streak_count: number;
  longest_streak: number;
  current_clean_streak: number;
  longest_clean_streak: number;
  total_recovered: number;
  total_active: number;
  recovery_rate: number;
}

export const ProgressTracking = ({
  streak_count,
  longest_streak,
  current_clean_streak,
  longest_clean_streak,
  total_recovered,
  total_active,
  recovery_rate,
}: ProgressTrackingProps) => {
  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Target className="h-5 w-5 mr-2" />
        Progress Tracking
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Daily Check-in Streak</span>
            <span className="text-sm font-medium">{streak_count} days</span>
          </div>
          <Progress 
            value={(streak_count / Math.max(longest_streak, 7)) * 100} 
            className="h-2" 
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Clean Streak</span>
            <span className="text-sm font-medium">{current_clean_streak} days</span>
          </div>
          <Progress 
            value={(current_clean_streak / Math.max(longest_clean_streak, 7)) * 100} 
            className="h-2" 
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Recovery Progress</span>
            <span className="text-sm font-medium">
              {total_recovered} / {total_active + total_recovered} recovered
            </span>
          </div>
          <Progress 
            value={recovery_rate}
            className="h-2" 
          />
        </div>
      </div>
    </Card>
  );
};
