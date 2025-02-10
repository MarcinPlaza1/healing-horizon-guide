
import { format } from "date-fns";
import { Trophy, AlertTriangle, CheckCircle, Clock, MoreVertical, Calendar, Target, FileText } from "lucide-react";
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
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'recovered':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'relapsed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className={cn(
        "absolute inset-0 w-1",
        getStatusColor(addiction.status)
      )} />
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-semibold tracking-tight">{addiction.name}</h4>
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              getStatusColor(addiction.status)
            )}>
              {getStatusIcon(addiction.status)}
              {addiction.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="h-3.5 w-3.5" />
              {addiction.type}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Started {format(new Date(addiction.start_date), "PPP")}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'active')}>
              <Clock className="mr-2 h-4 w-4" />
              Mark Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'recovered')}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Recovered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'relapsed')}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Mark Relapsed
            </DropdownMenuItem>
            {onDelete && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(addiction)}
              >
                Delete Record
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {addiction.clean_since && (
            <div className="rounded-lg bg-green-500/5 border border-green-500/10 p-3">
              <p className="text-lg font-semibold text-green-500">
                {calculateCleanDays(addiction.clean_since)} days clean
              </p>
              <p className="text-sm text-muted-foreground">
                Since {format(new Date(addiction.clean_since), "PPP")}
              </p>
            </div>
          )}

          {addiction.notes && (
            <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">{addiction.notes}</p>
            </div>
          )}
          
          {addiction.triggers && addiction.triggers.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Known Triggers
              </h5>
              <div className="flex flex-wrap gap-2">
                {addiction.triggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-muted/80"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddMilestone(addiction)}
              className="w-full"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
          
          {milestones?.length > 0 && (
            <div className="space-y-2 pt-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Recovery Milestones
              </h5>
              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-medium truncate">
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
