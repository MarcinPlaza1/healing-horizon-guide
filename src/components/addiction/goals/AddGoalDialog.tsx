
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Goal } from "@/types/addiction";

interface AddGoalDialogProps {
  onAddGoal: (goal: Omit<Goal, "completed">) => Promise<void>;
  onClose: () => void;
}

export const AddGoalDialog = ({ onAddGoal, onClose }: AddGoalDialogProps) => {
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

    await onAddGoal(newGoal);
    setNewGoal({ title: "", target_date: "" });
    onClose();
  };

  return (
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
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddGoal}>
          Add Goal
        </Button>
      </div>
    </DialogContent>
  );
};
