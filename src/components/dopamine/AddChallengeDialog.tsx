
import { useState } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type ChallengeType = 
  | "social_media_break"
  | "digital_sunset"
  | "morning_routine"
  | "mindful_browsing"
  | "app_limits"
  | "notification_detox"
  | "device_free_meals"
  | "reading_time";

const challengeTypes = [
  { value: "social_media_break" as const, label: "Social Media Break" },
  { value: "digital_sunset" as const, label: "Digital Sunset" },
  { value: "morning_routine" as const, label: "Morning Routine" },
  { value: "mindful_browsing" as const, label: "Mindful Browsing" },
  { value: "app_limits" as const, label: "App Limits" },
  { value: "notification_detox" as const, label: "Notification Detox" },
  { value: "device_free_meals" as const, label: "Device-Free Meals" },
  { value: "reading_time" as const, label: "Reading Time" },
];

const difficultyLevels = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

interface AddChallengeDialogProps {
  onChallengeCreated?: () => void;
}

export function AddChallengeDialog({ onChallengeCreated }: AddChallengeDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [challengeType, setChallengeType] = useState<ChallengeType | "">("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [durationDays, setDurationDays] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("medium");
  const [targetReductionHours, setTargetReductionHours] = useState("");
  const [dailyGoals, setDailyGoals] = useState<Array<{ title: string }>>([]);
  const [newGoal, setNewGoal] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !challengeType || !startDate || !durationDays) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + parseInt(durationDays));

      const { error } = await supabase
        .from('dopamine_detox_challenges')
        .insert({
          challenge_type: challengeType,
          name,
          description,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          duration_days: parseInt(durationDays),
          user_id: user.id,
          status: 'active',
          difficulty_level: difficultyLevel,
          target_reduction_hours: targetReductionHours ? parseInt(targetReductionHours) : null,
          daily_goals: dailyGoals,
          current_streak: 0,
          best_streak: 0
        });

      if (error) throw error;

      toast({
        title: "Challenge created",
        description: "Your new dopamine detox challenge has been created.",
      });

      if (onChallengeCreated) {
        onChallengeCreated();
      }

      setOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Error creating challenge:", error);
      toast({
        variant: "destructive",
        title: "Error creating challenge",
        description: error.message,
      });
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setChallengeType("");
    setStartDate(new Date());
    setDurationDays("");
    setDifficultyLevel("medium");
    setTargetReductionHours("");
    setDailyGoals([]);
    setNewGoal("");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
    }
  };

  const addDailyGoal = () => {
    if (newGoal.trim()) {
      setDailyGoals([...dailyGoals, { title: newGoal.trim() }]);
      setNewGoal("");
    }
  };

  const removeDailyGoal = (index: number) => {
    setDailyGoals(dailyGoals.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Challenge</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Dopamine Detox Challenge</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Challenge Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter challenge name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Challenge Type</Label>
            <Select value={challengeType} onValueChange={(value: ChallengeType) => setChallengeType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select challenge type" />
              </SelectTrigger>
              <SelectContent>
                {challengeTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              placeholder="Enter duration in days"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetReduction">Target Screen Time Reduction (hours)</Label>
            <Input
              id="targetReduction"
              type="number"
              min="1"
              value={targetReductionHours}
              onChange={(e) => setTargetReductionHours(e.target.value)}
              placeholder="Enter target reduction in hours"
            />
          </div>
          <div className="space-y-2">
            <Label>Daily Goals</Label>
            <div className="flex gap-2">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a daily goal"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDailyGoal();
                  }
                }}
              />
              <Button type="button" size="icon" onClick={addDailyGoal}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {dailyGoals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                  <span className="text-sm">{goal.title}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDailyGoal(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter challenge description"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Challenge</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
