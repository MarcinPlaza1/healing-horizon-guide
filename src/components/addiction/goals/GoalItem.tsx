
import { cn } from "@/lib/utils";
import { Goal } from "@/types/addiction";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface GoalItemProps {
  goal: Goal;
  onToggle: () => void;
}

export const GoalItem = ({ goal, onToggle }: GoalItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 transition-colors",
        goal.completed ? "bg-green-500/5 border-green-500/20" : "bg-card hover:bg-muted/50"
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 w-8 p-0 rounded-full",
          goal.completed && "text-green-500"
        )}
        onClick={onToggle}
      >
        <CheckCircle className="h-4 w-4" />
      </Button>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium",
          goal.completed && "text-muted-foreground line-through"
        )}>
          {goal.title}
        </p>
        {goal.target_date && (
          <p className="text-xs text-muted-foreground mt-1">
            Target: {new Date(goal.target_date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
