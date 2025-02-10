
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

interface MoodCounts {
  great: number;
  good: number;
  okay: number;
  difficult: number;
  struggling: number;
}

interface MoodDistributionProps {
  weekly_mood_counts: MoodCounts;
}

export const MoodDistribution = ({ weekly_mood_counts }: MoodDistributionProps) => {
  const totalMoods = Object.values(weekly_mood_counts).reduce((a, b) => a + b, 0);

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="h-5 w-5 mr-2" />
        Weekly Mood Distribution
      </h3>
      <div className="space-y-4">
        {Object.entries(weekly_mood_counts).map(([mood, count]) => (
          <div key={mood}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground capitalize">{mood}</span>
              <span className="text-sm font-medium">{count} check-ins</span>
            </div>
            <Progress 
              value={(count / Math.max(totalMoods, 1)) * 100} 
              className="h-2" 
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
