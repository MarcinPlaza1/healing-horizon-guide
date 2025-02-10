
import { Goal } from "@/types/addiction";
import { GoalItem } from "./GoalItem";
import { Goal as GoalIcon } from "lucide-react";

interface GoalListProps {
  goals: Goal[];
  onToggleGoal: (index: number) => void;
}

export const GoalList = ({ goals, onToggleGoal }: GoalListProps) => {
  if (goals.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
        <GoalIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm font-medium">No goals set yet</p>
        <p className="text-xs mt-1">Add your first recovery goal to track your progress</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {goals.map((goal, index) => (
        <GoalItem
          key={index}
          goal={goal}
          onToggle={() => onToggleGoal(index)}
        />
      ))}
    </div>
  );
};
