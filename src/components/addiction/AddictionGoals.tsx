
import { useState } from "react";
import { Plus, Goal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Goal as GoalType } from "@/types/addiction";
import { AddGoalDialog } from "./goals/AddGoalDialog";
import { GoalList } from "./goals/GoalList";

interface AddictionGoalsProps {
  goals?: GoalType[];
  addictionId: string;
  onGoalsUpdate: () => void;
}

export const AddictionGoals = ({ goals = [], addictionId, onGoalsUpdate }: AddictionGoalsProps) => {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const { toast } = useToast();

  const handleAddGoal = async (newGoal: Omit<GoalType, "completed">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updatedGoals = [
        ...goals,
        { ...newGoal, completed: false }
      ] as GoalType[];

      const { error } = await supabase
        .from('addictions')
        .update({ goals: updatedGoals })
        .eq('id', addictionId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Goal Added",
        description: "Your new recovery goal has been added.",
      });

      onGoalsUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding goal",
        description: error.message,
      });
    }
  };

  const toggleGoal = async (goalIndex: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updatedGoals = goals.map((goal, index) =>
        index === goalIndex ? { ...goal, completed: !goal.completed } : goal
      ) as GoalType[];

      const { error } = await supabase
        .from('addictions')
        .update({ goals: updatedGoals })
        .eq('id', addictionId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Goal Updated",
        description: "Your goal has been updated.",
      });
      
      onGoalsUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating goal",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium flex items-center gap-2">
          <Goal className="h-4 w-4" />
          Recovery Goals
        </h5>
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <AddGoalDialog
            onAddGoal={handleAddGoal}
            onClose={() => setIsAddGoalOpen(false)}
          />
        </Dialog>
      </div>
      
      <GoalList
        goals={goals}
        onToggleGoal={toggleGoal}
      />
    </div>
  );
};
