
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LogActivityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addictionId: string;
}

export const LogActivityDialog = ({
  isOpen,
  onOpenChange,
  addictionId,
}: LogActivityDialogProps) => {
  const [activityNote, setActivityNote] = useState("");
  const { toast } = useToast();

  const handleLogActivity = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: activityError } = await supabase
        .from('addiction_activity_logs')
        .insert({
          addiction_id: addictionId,
          user_id: user.id,
          activity_date: new Date().toISOString(),
        });

      if (activityError) throw activityError;

      if (activityNote.trim()) {
        const { error: noteError } = await supabase
          .from('activity_notes')
          .insert({
            addiction_id: addictionId,
            user_id: user.id,
            content: activityNote,
          });

        if (noteError) throw noteError;
      }

      toast({
        title: "Activity Logged",
        description: "Your activity has been recorded and the counter has been reset.",
      });

      onOpenChange(false);
      setActivityNote("");
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging activity",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
          <DialogDescription>
            Record your activity and optionally add a note about what happened.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note">Add a note (optional)</Label>
            <Textarea
              id="note"
              placeholder="How are you feeling? What triggered this?"
              value={activityNote}
              onChange={(e) => setActivityNote(e.target.value)}
            />
          </div>
          <Button onClick={handleLogActivity} className="w-full">
            Log Activity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
