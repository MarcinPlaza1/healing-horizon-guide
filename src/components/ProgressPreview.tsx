
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface ProgressData {
  streak_count: number;
  longest_streak: number;
  last_check_in: string | null;
}

const ProgressPreview = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('streak_count, longest_streak, last_check_in')
        .eq('id', user.id)
        .single();

      if (data) {
        setProgressData(data);
      }
    };

    fetchProgress();
  }, []);

  if (!progressData) return null;

  return (
    <Card className="p-6 glass-card fade-in">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Current Streak</span>
            <span className="text-sm text-primary">{progressData.streak_count} days</span>
          </div>
          <Progress 
            value={(progressData.streak_count / Math.max(progressData.longest_streak, 7)) * 100} 
            className="h-2" 
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Longest Streak</span>
            <span className="text-sm text-primary">{progressData.longest_streak} days</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Last check-in: {progressData.last_check_in 
              ? new Date(progressData.last_check_in).toLocaleDateString() 
              : 'Never'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressPreview;
