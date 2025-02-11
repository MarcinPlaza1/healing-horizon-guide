
import { Brain, BookText, Trophy } from "lucide-react";

interface HealthMetricsProps {
  moodAverage: string | null;
  journalEntries: number;
  totalMilestones: number;
}

export const HealthMetrics = ({ moodAverage, journalEntries, totalMilestones }: HealthMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Mood</p>
          <p className="font-medium">
            {moodAverage || "Not recorded"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <BookText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Journal Entries</p>
          <p className="font-medium">{journalEntries} today</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Recovery Progress</p>
          <p className="font-medium">{totalMilestones} milestones</p>
        </div>
      </div>
    </div>
  );
};
