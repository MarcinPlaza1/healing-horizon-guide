
import { format } from "date-fns";
import { MoreVertical, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Addiction, Milestone } from "@/types/addiction";
import { useState } from "react";
import { AddictionGoals } from "./AddictionGoals";
import { LogActivityDialog } from "./components/LogActivityDialog";
import { TriggersList } from "./components/TriggersList";
import { MilestonesList } from "./components/MilestonesList";
import { getStatusColor, getStatusIcon, getTypeIcon, calculateCleanDays } from "./utils/statusUtils";

interface AddictionCardProps {
  addiction: Addiction;
  milestones: Milestone[];
  onUpdateStatus: (addiction: Addiction, newStatus: string) => void;
  onDelete?: (addiction: Addiction) => void;
}

export const AddictionCard = ({
  addiction,
  milestones,
  onUpdateStatus,
  onDelete,
}: AddictionCardProps) => {
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background to-muted/50">
      <div className={cn(
        "absolute inset-y-0 left-0 w-1.5",
        getStatusColor(addiction.status)
      )} />
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 pl-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              {getTypeIcon(addiction.type)}
            </div>
            <div>
              <h4 className="text-xl font-semibold tracking-tight">{addiction.name}</h4>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{addiction.type}</span>
                <span>•</span>
                <span>Started {format(new Date(addiction.start_date), "PPP")}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
              getStatusColor(addiction.status)
            )}>
              {getStatusIcon(addiction.status)}
              {addiction.status}
            </span>
            {addiction.clean_since && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
                {getStatusIcon('recovered')}
                {calculateCleanDays(addiction.clean_since)} days clean
              </span>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'active')}>
              {getStatusIcon('active')}
              Mark Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'recovered')}>
              {getStatusIcon('recovered')}
              Mark Recovered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateStatus(addiction, 'relapsed')}>
              {getStatusIcon('relapsed')}
              Mark Relapsed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsLogActivityOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
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

      <CardContent className="pl-6 space-y-6">
        {addiction.notes && (
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">{addiction.notes}</p>
          </div>
        )}

        <LogActivityDialog
          isOpen={isLogActivityOpen}
          onOpenChange={setIsLogActivityOpen}
          addictionId={addiction.id}
        />

        {addiction.goals && addiction.goals.length > 0 && (
          <AddictionGoals addiction={addiction} />
        )}
        
        <TriggersList triggers={addiction.triggers || []} />
        <MilestonesList milestones={milestones} />
      </CardContent>
    </Card>
  );
};
