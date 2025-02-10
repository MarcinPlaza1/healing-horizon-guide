
import { useState } from "react";
import { Plus, Goal, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Goal {
  title: string;
  completed: boolean;
  target_date?: string;
  [key: string]: string | boolean | undefined; // Add index signature to match Json type
}

interface AddictionGoalsProps {
  goals?: Goal[];
  addictionId: string;
  onGoalsUpdate: () => void;
}

export const AddictionGoals = ({ goals = [], addictionId, onGoalsUpdate }: AddictionGoalsProps) => {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target_date: "" });
  const { toast } = useToast();

  const handleAddGoal = async () => {
    if (!newGoal.title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a goal title",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updatedGoals = [
        ...goals,
        { ...newGoal, completed: false }
      ] as Goal[];

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

      setNewGoal({ title: "", target_date: "" });
      setIsAddGoalOpen(false);
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
      ) as Goal[];

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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Recovery Goal</DialogTitle>
              <DialogDescription>
                Set a new goal for your recovery journey
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your goal"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_date">Target Date (Optional)</Label>
                <Input
                  id="target_date"
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target_date: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-3">
        {goals.map((goal, index) => (
          <div
            key={index}
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
              onClick={() => toggleGoal(index)}
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
        ))}
        {goals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
            <Goal className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No goals set yet</p>
            <p className="text-xs mt-1">Add your first recovery goal to track your progress</p>
          </div>
        )}
      </div>
    </div>
  );
};
