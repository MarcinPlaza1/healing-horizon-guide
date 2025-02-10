
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ChartLine, Target, Trophy, TrendingUp, Clock, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProgressStats {
  streak_count: number;
  longest_streak: number;
  last_check_in: string | null;
  weekly_mood_counts: {
    great: number;
    good: number;
    okay: number;
    difficult: number;
    struggling: number;
  };
  addiction_stats?: {
    total_active: number;
    total_recovered: number;
    longest_clean_streak: number;
    current_clean_streak: number;
  };
}

const ProgressDashboard = () => {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch profile stats
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('streak_count, longest_streak, last_check_in, weekly_mood_counts')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        // Fetch addiction stats
        const { data: addictionData, error: addictionError } = await supabase
          .from('addictions')
          .select('clean_since, status')
          .eq('user_id', user.id);

        if (addictionError) throw addictionError;

        let longest_clean_streak = 0;
        let current_clean_streak = 0;
        const now = new Date();

        addictionData?.forEach(addiction => {
          if (addiction.clean_since) {
            const cleanDays = Math.floor((now.getTime() - new Date(addiction.clean_since).getTime()) / (1000 * 60 * 60 * 24));
            current_clean_streak = Math.max(current_clean_streak, cleanDays);
            longest_clean_streak = Math.max(longest_clean_streak, cleanDays);
          }
        });

        const addiction_stats = {
          total_active: addictionData?.filter(a => a.status === 'active').length || 0,
          total_recovered: addictionData?.filter(a => a.status === 'recovered').length || 0,
          longest_clean_streak,
          current_clean_streak,
        };

        if (profileData) {
          // Ensure weekly_mood_counts is properly typed
          const weekly_mood_counts = profileData.weekly_mood_counts as ProgressStats['weekly_mood_counts'] || {
            great: 0,
            good: 0,
            okay: 0,
            difficult: 0,
            struggling: 0
          };

          setStats({
            streak_count: profileData.streak_count,
            longest_streak: profileData.longest_streak,
            last_check_in: profileData.last_check_in,
            weekly_mood_counts,
            addiction_stats
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching progress",
          description: "Could not load your progress data. Please try again later.",
        });
      }
    };

    fetchProgress();
  }, [toast]);

  if (!stats) return null;

  const totalMoods = Object.values(stats.weekly_mood_counts).reduce((a, b) => a + b, 0);
  const positivePercentage = totalMoods > 0 
    ? ((stats.weekly_mood_counts.great + stats.weekly_mood_counts.good) / totalMoods) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
            Your Progress Journey
          </h1>
          <p className="text-muted-foreground">
            Track your wellness achievements and growth over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <h3 className="text-2xl font-bold mt-1">{stats.streak_count} days</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clean Streak</p>
                <h3 className="text-2xl font-bold mt-1">{stats.addiction_stats?.current_clean_streak || 0} days</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekly Progress</p>
                <h3 className="text-2xl font-bold mt-1">{Math.round(positivePercentage)}%</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChartLine className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.addiction_stats ? 
                    Math.round((stats.addiction_stats.total_recovered / 
                      (stats.addiction_stats.total_recovered + stats.addiction_stats.total_active)) * 100) : 0}%
                </h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4">Streak Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <span className="text-sm font-medium">{stats.streak_count} days</span>
                </div>
                <Progress 
                  value={(stats.streak_count / Math.max(stats.longest_streak, 7)) * 100} 
                  className="h-2" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Best Streak</span>
                  <span className="text-sm font-medium">{stats.longest_streak} days</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Clean Streak</span>
                  <span className="text-sm font-medium">{stats.addiction_stats?.current_clean_streak || 0} days</span>
                </div>
                <Progress 
                  value={(stats.addiction_stats?.current_clean_streak || 0) / 
                    Math.max(stats.addiction_stats?.longest_clean_streak || 1, 7) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4">Weekly Mood Distribution</h3>
            <div className="space-y-4">
              {Object.entries(stats.weekly_mood_counts).map(([mood, count]) => (
                <div key={mood}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground capitalize">{mood}</span>
                    <span className="text-sm font-medium">{count} check-ins</span>
                  </div>
                  <Progress 
                    value={(count / Math.max(totalMoods, 1)) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;

