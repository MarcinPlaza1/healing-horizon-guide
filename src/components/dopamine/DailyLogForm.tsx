
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function DailyLogForm() {
  const [screenTime, setScreenTime] = useState("");
  const [tasks, setTasks] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('dopamine_detox_logs')
        .insert({
          user_id: user.id,
          screen_time_minutes: parseInt(screenTime),
          completed_tasks: tasks.split(',').map(task => task.trim()).filter(Boolean),
          notes,
          activity_date: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Log submitted successfully",
        description: "Your daily progress has been recorded.",
      });

      // Reset form
      setScreenTime("");
      setTasks("");
      setNotes("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting log",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Progress Log</CardTitle>
        <CardDescription>Track your digital wellness and focus progress</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="screenTime">Screen Time (minutes)</Label>
            <Input
              id="screenTime"
              type="number"
              value={screenTime}
              onChange={(e) => setScreenTime(e.target.value)}
              placeholder="Enter total screen time in minutes"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tasks">Completed Tasks</Label>
            <Input
              id="tasks"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder="Enter tasks completed (comma-separated)"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple tasks with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your day..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Log"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
