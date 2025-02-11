
import { Trophy } from "lucide-react";
import { format } from "date-fns";
import { Milestone } from "@/types/addiction";

interface MilestonesListProps {
  milestones: Milestone[];
}

export const MilestonesList = ({ milestones }: MilestonesListProps) => {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium flex items-center gap-2">
        <Trophy className="h-4 w-4 text-yellow-500" />
        Recovery Milestones
      </h5>
      <div className="grid gap-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-center gap-4 rounded-lg border bg-card/50 p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-medium">
                {milestone.milestone_type}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{milestone.days_clean} days</span>
                <span>•</span>
                <span>{format(new Date(milestone.milestone_date), "PPP")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
