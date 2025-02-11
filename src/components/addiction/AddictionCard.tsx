
import { format } from "date-fns";
import { AlertTriangle, CheckCircle, Clock, MoreVertical, Target, FileText, Plus, Goal, Trophy, HeartPulse, Brain, PillBottle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Addiction, Milestone } from "@/types/addiction";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

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
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target_date: "" });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activityNote, setActivityNote] = useState("");
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const { toast } = useToast();

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

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'substance':
        return <PillBottle className="h-4 w-4" />;
      case 'behavioral':
        return <Brain className="h-4 w-4" />;
      default:
        return <HeartPulse className="h-4 w-4" />;
    }
  };

  const calculateCleanDays = (cleanSince?: string) => {
    if (!cleanSince) return 0;
    const start = new Date(cleanSince);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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
        ...(addiction.goals || []),
        { ...newGoal, completed: false }
      ];

      const { error } = await supabase
        .from('addictions')
        .update({ goals: updatedGoals })
        .eq('id', addiction.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Goal Added",
        description: "Your new recovery goal has been added.",
      });

      setNewGoal({ title: "", target_date: "" });
      setIsAddGoalOpen(false);
      
      // Refresh the page to show the new goal
      window.location.reload();
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

      const updatedGoals = addiction.goals?.map((goal, index) =>
        index === goalIndex ? { ...goal, completed: !goal.completed } : goal
      ) || [];

      const { error } = await supabase
        .from('addictions')
        .update({ goals: updatedGoals })
        .eq('id', addiction.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Goal Updated",
        description: "Your goal has been updated.",
      });
      
      // Refresh the page to show the updated goal
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating goal",
        description: error.message,
      });
    }
  };

  const logActivity = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // First log the activity
      const { error: activityError } = await supabase
        .from('addiction_activity_logs')
        .insert({
          addiction_id: addiction.id,
          user_id: user.id,
          activity_date: new Date().toISOString(),
        });

      if (activityError) throw activityError;

      // Then add the note if provided
      if (activityNote.trim()) {
        const { error: noteError } = await supabase
          .from('activity_notes')
          .insert({
            addiction_id: addiction.id,
            user_id: user.id,
            content: activityNote,
          });

        if (noteError) throw noteError;
      }

      toast({
        title: "Activity Logged",
        description: "Your activity has been recorded and the counter has been reset.",
      });

      setIsLogActivityOpen(false);
      setActivityNote("");
      
      // Refresh the page to show the updated status
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging activity",
        description: error.message,
      });
    }
  };

  const [activityDates, setActivityDates] = useState<Date[]>([]);

  // Fetch activity logs when component mounts
  useEffect(() => {
    const fetchActivityLogs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('addiction_activity_logs')
        .select('activity_date')
        .eq('addiction_id', addiction.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching activity logs:', error);
        return;
      }

      setActivityDates(data.map(log => new Date(log.activity_date)));
    };

    fetchActivityLogs();
  }, [addiction.id]);

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
                <CheckCircle className="h-4 w-4" />
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

      <CardContent className="pl-6 space-y-6">
        {addiction.notes && (
          <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">{addiction.notes}</p>
          </div>
        )}

        <Dialog open={isLogActivityOpen} onOpenChange={setIsLogActivityOpen}>
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
              <Button onClick={logActivity} className="w-full">
                Log Activity
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
            {addiction.goals?.map((goal, index) => (
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
                      Target: {format(new Date(goal.target_date), "PPP")}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {(!addiction.goals || addiction.goals.length === 0) && (
              <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                <Goal className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No goals set yet</p>
                <p className="text-xs mt-1">Add your first recovery goal to track your progress</p>
              </div>
            )}
          </div>
        </div>
        
        {addiction.triggers && addiction.triggers.length > 0 && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Known Triggers
            </h5>
            <div className="flex flex-wrap gap-2">
              {addiction.triggers.map((trigger, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-destructive/10 text-destructive px-3 py-1 text-sm font-medium"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        )}

        {milestones?.length > 0 && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              Recovery Milestones
            </h5>
            <div className="grid gap-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-4 rounded-lg border bg-card/50 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-medium">
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
      </CardContent>
    </Card>
  );
};
