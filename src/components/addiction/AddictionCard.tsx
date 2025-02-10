
import { format } from "date-fns";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Addiction, Milestone } from "@/types/addiction";

interface AddictionCardProps {
  addiction: Addiction;
  milestones: Milestone[];
  onUpdateStatus: (addiction: Addiction, newStatus: string) => void;
  onAddMilestone: (addiction: Addiction) => void;
}

export const AddictionCard = ({
  addiction,
  milestones,
  onUpdateStatus,
  onAddMilestone,
}: AddictionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'recovered':
        return 'bg-green-500/10 text-green-500';
      case 'relapsed':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const calculateCleanDays = (cleanSince?: string) => {
    if (!cleanSince) return 0;
    const start = new Date(cleanSince);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="relative hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h4 className="font-medium text-lg">{addiction.name}</h4>
            <p className="text-sm text-muted-foreground">
              {addiction.type} • Started {format(new Date(addiction.start_date), "PPP")}
            </p>
            {addiction.clean_since && (
              <p className="text-sm text-green-500 font-medium">
                {calculateCleanDays(addiction.clean_since)} days clean
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium inline-block",
              getStatusColor(addiction.status)
            )}>
              {addiction.status}
            </div>
            <div className="flex gap-2">
              {addiction.status !== 'recovered' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(addiction, 'recovered')}
                  className="hover:bg-green-500/10 hover:text-green-500"
                >
                  Mark Recovered
                </Button>
              )}
              {addiction.status === 'recovered' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(addiction, 'relapsed')}
                  className="hover:bg-red-500/10 hover:text-red-500"
                >
                  Mark Relapsed
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddMilestone(addiction)}
              >
                Add Milestone
              </Button>
            </div>
          </div>
        </div>
        {addiction.notes && (
          <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-3 rounded-md">
            {addiction.notes}
          </p>
        )}
        
        {/* Milestones section */}
        {milestones?.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h5 className="text-sm font-medium mb-2">Recovery Milestones</h5>
            <div className="space-y-2">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  className="flex items-center gap-2 text-sm bg-primary/5 p-2 rounded-md"
                >
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{milestone.milestone_type}</span>
                  <span className="text-muted-foreground">
                    {milestone.days_clean} days • {format(new Date(milestone.milestone_date), "PPP")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

