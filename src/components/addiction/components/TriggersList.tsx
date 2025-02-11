
import { Target } from "lucide-react";

interface TriggersListProps {
  triggers: string[];
}

export const TriggersList = ({ triggers }: TriggersListProps) => {
  if (!triggers || triggers.length === 0) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium flex items-center gap-2">
        <Target className="h-4 w-4" />
        Known Triggers
      </h5>
      <div className="flex flex-wrap gap-2">
        {triggers.map((trigger, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full bg-destructive/10 text-destructive px-3 py-1 text-sm font-medium"
          >
            {trigger}
          </span>
        ))}
      </div>
    </div>
  );
};
