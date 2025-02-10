
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface AddictionStreak {
  name: string;
  clean_since: string;
  days_clean: number;
}

interface RecoveryStreaksProps {
  streaks: AddictionStreak[];
}

export const RecoveryStreaks = ({ streaks }: RecoveryStreaksProps) => {
  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Active Recovery Streaks
      </h3>
      <div className="space-y-4">
        {streaks.map((streak, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{streak.name}</span>
              <span className="text-sm text-muted-foreground">{streak.days_clean} days clean</span>
            </div>
            <Progress 
              value={Math.min((streak.days_clean / 365) * 100, 100)} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              Clean since: {new Date(streak.clean_since).toLocaleDateString()}
            </p>
          </div>
        ))}
        {(!streaks || streaks.length === 0) && (
          <p className="text-muted-foreground text-sm">No active recovery streaks. Start your journey today!</p>
        )}
      </div>
    </Card>
  );
};
