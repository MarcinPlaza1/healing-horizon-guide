
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Milestone {
  milestone_type: string;
  description: string;
  milestone_date: string;
}

interface RecentMilestonesProps {
  milestones: Milestone[];
}

export const RecentMilestones = ({ milestones }: RecentMilestonesProps) => {
  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Trophy className="h-5 w-5 mr-2" />
        Recent Milestones
      </h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="border-l-2 border-primary pl-4 py-2">
            <h4 className="font-medium text-sm">{milestone.milestone_type}</h4>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(milestone.milestone_date).toLocaleDateString()}
            </p>
          </div>
        ))}
        {(!milestones || milestones.length === 0) && (
          <p className="text-muted-foreground text-sm">No milestones recorded yet. Keep going!</p>
        )}
      </div>
    </Card>
  );
};
