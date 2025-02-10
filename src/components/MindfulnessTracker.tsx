
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Pause, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const MindfulnessTracker = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [settings, setSettings] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('mindfulness_settings')
        .eq('id', user.id)
        .single();

      if (data?.mindfulness_settings) {
        setSettings(data.mindfulness_settings);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('mindfulness_activities')
      .insert({
        user_id: user.id,
        activity_type: 'meditation',
        duration: time,
        completed_at: new Date().toISOString()
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error saving session",
        description: "There was an error saving your mindfulness session."
      });
    } else {
      toast({
        title: "Session completed",
        description: `Great job! You completed ${formatTime(time)} of mindfulness practice.`
      });
    }

    setTime(0);
    setIsActive(false);
  };

  return (
    <Card className="p-6 glass-card fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Mindfulness Session</h3>
        <Timer className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center space-y-4">
        <div className="text-4xl font-bold text-primary">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant={isActive ? "destructive" : "default"}
            onClick={toggleTimer}
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start
              </>
            )}
          </Button>
          {time > 0 && (
            <Button variant="outline" onClick={handleComplete}>
              Complete
            </Button>
          )}
        </div>
        {settings && (
          <p className="text-sm text-muted-foreground">
            Suggested duration: {settings.preferred_meditation_duration} minutes
          </p>
        )}
      </div>
    </Card>
  );
};

export default MindfulnessTracker;
