
import { format } from "date-fns";
import { Trophy, AlertTriangle, CheckCircle, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Addiction, Milestone } from "@/types/addiction";

interface AddictionCardProps {
  addiction: Addiction;
  milestones: Milestone[];
  onUpdateStatus: (addiction: Addiction, newStatus: string) => void;
  onAddMilestone: (addiction: Addiction) => void;
  onDelete?: (addiction: Addiction) => void;
}

export const AddictionCard = ({
  addiction,
  milestones,
  onUpdateStatus,
  onAddMilestone,
  onDelete,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4" />;
      case 'recovered':
        return <CheckCircle className="h-4 w-4" />;
      case 'relapsed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
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
    <Card className="relative overflow-hidden">
      <div className={cn(
        "absolute inset-0 w-1",
        getStatusColor(addiction.status)
      )} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h4 className="text-xl font-semibold tracking-tight">{addiction.name}</h4>
          <p className="text-sm text-muted-foreground">
            {addiction.type} • Started {format(new Date(addiction.start_date), "PPP")}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'active')}>
              Mark Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'recovered')}>
              Mark Recovered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'relapsed')}>
              Mark Relapsed
            </DropdownMenuItem>
            {onDelete && (
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(addiction)}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getStatusIcon(addiction.status)}
                <span className={cn(
                  "text-sm font-medium",
                  getStatusColor(addiction.status)
                )}>
                  {addiction.status}
                </span>
              </div>
              {addiction.clean_since && (
                <p className="text-sm font-medium text-green-500">
                  {calculateCleanDays(addiction.clean_since)} days clean
                </p>
              )}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddMilestone(addiction)}
            >
              Add Milestone
            </Button>
          </div>

          {addiction.notes && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">{addiction.notes}</p>
            </div>
          )}
          
          {addiction.triggers && addiction.triggers.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Known Triggers</h5>
              <div className="flex flex-wrap gap-2">
                {addiction.triggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {milestones?.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Recovery Milestones</h5>
              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-2 rounded-lg bg-muted p-2"
                  >
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {milestone.milestone_type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {milestone.days_clean} days • {format(new Date(milestone.milestone_date), "PPP")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
