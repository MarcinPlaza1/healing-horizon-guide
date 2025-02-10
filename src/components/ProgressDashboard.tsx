
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ChartLine, Target, Trophy, TrendingUp, Clock, Activity, Star, Award, Calendar, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { MilestoneProgressChart } from "./analytics/MilestoneProgressChart";

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
    total_milestones: number;
    recovery_rate: number;
    recent_milestones: Array<{
      milestone_type: string;
      description: string;
      milestone_date: string;
      days_clean: number;
    }>;
    addiction_streaks: Array<{
      name: string;
      clean_since: string;
      days_clean: number;
      status: string;
    }>;
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

        // Fetch addiction stats with milestones
        const { data: addictionData, error: addictionError } = await supabase
          .from('addictions')
          .select(`
            id,
            name,
            clean_since,
            status,
            recovery_milestones (
              id,
              milestone_type,
              description,
              milestone_date,
              days_clean
            )
          `)
          .eq('user_id', user.id);

        if (addictionError) throw addictionError;

        const now = new Date();
        let longest_clean_streak = 0;
        let current_clean_streak = 0;
        let total_milestones = 0;
        const recent_milestones: any[] = [];
        const addiction_streaks: any[] = [];

        addictionData?.forEach(addiction => {
          if (addiction.clean_since) {
            const cleanDays = Math.floor((now.getTime() - new Date(addiction.clean_since).getTime()) / (1000 * 60 * 60 * 24));
            current_clean_streak = Math.max(current_clean_streak, cleanDays);
            longest_clean_streak = Math.max(longest_clean_streak, cleanDays);

            addiction_streaks.push({
              name: addiction.name,
              clean_since: addiction.clean_since,
              days_clean: cleanDays,
              status: addiction.status
            });
          }
          if (addiction.recovery_milestones) {
            total_milestones += addiction.recovery_milestones.length;
            recent_milestones.push(...addiction.recovery_milestones);
          }
        });

        // Sort milestones by date and get the 5 most recent
        recent_milestones.sort((a, b) => new Date(b.milestone_date).getTime() - new Date(a.milestone_date).getTime());
        const latest_milestones = recent_milestones.slice(0, 5);

        const total_active = addictionData?.filter(a => a.status === 'active').length || 0;
        const total_recovered = addictionData?.filter(a => a.status === 'recovered').length || 0;
        const total = total_active + total_recovered;
        const recovery_rate = total > 0 ? (total_recovered / total) * 100 : 0;

        const addiction_stats = {
          total_active,
          total_recovered,
          longest_clean_streak,
          current_clean_streak,
          total_milestones,
          recovery_rate,
          recent_milestones: latest_milestones,
          addiction_streaks
        };

        if (profileData) {
          const weekly_mood_counts: ProgressStats['weekly_mood_counts'] = {
            great: 0,
            good: 0,
            okay: 0,
            difficult: 0,
            struggling: 0,
            ...profileData.weekly_mood_counts as Record<string, number>
          };

          setStats({
            streak_count: profileData.streak_count || 0,
            longest_streak: profileData.longest_streak || 0,
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

  const milestonesByPeriod = {
    weekly: stats.addiction_stats?.recent_milestones.filter(m => m.days_clean <= 7).length || 0,
    monthly: stats.addiction_stats?.recent_milestones.filter(m => m.days_clean <= 30).length || 0,
    quarterly: stats.addiction_stats?.recent_milestones.filter(m => m.days_clean <= 90).length || 0,
    yearly: stats.addiction_stats?.recent_milestones.filter(m => m.days_clean <= 365).length || 0
  };

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
            Track your wellness achievements and recovery milestones
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
                <p className="text-sm font-medium text-muted-foreground">Longest Clean Streak</p>
                <h3 className="text-2xl font-bold mt-1">{stats.addiction_stats?.longest_clean_streak || 0} days</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.round(stats.addiction_stats?.recovery_rate || 0)}%
                </h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChartLine className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Milestones</p>
                <h3 className="text-2xl font-bold mt-1">{stats.addiction_stats?.total_milestones || 0}</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Recent Milestones
            </h3>
            <div className="space-y-4">
              {stats.addiction_stats?.recent_milestones.map((milestone, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 py-2">
                  <h4 className="font-medium text-sm">{milestone.milestone_type}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(milestone.milestone_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {(!stats.addiction_stats?.recent_milestones || stats.addiction_stats.recent_milestones.length === 0) && (
                <p className="text-muted-foreground text-sm">No milestones recorded yet. Keep going!</p>
              )}
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Active Recovery Streaks
            </h3>
            <div className="space-y-4">
              {stats.addiction_stats?.addiction_streaks.map((streak, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{streak.name}</span>
                    <span className="text-sm text-muted-foreground">{streak.days_clean} days clean</span>
                  </div>
                  <Progress 
                    value={Math.min((streak.days_clean / 365) * 100, 100)} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Clean since: {new Date(streak.clean_since).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {(!stats.addiction_stats?.addiction_streaks || stats.addiction_stats.addiction_streaks.length === 0) && (
                <p className="text-muted-foreground text-sm">No active recovery streaks. Start your journey today!</p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Progress Tracking
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Daily Check-in Streak</span>
                  <span className="text-sm font-medium">{stats.streak_count} days</span>
                </div>
                <Progress 
                  value={(stats.streak_count / Math.max(stats.longest_streak, 7)) * 100} 
                  className="h-2" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current Clean Streak</span>
                  <span className="text-sm font-medium">{stats.addiction_stats?.current_clean_streak || 0} days</span>
                </div>
                <Progress 
                  value={(stats.addiction_stats?.current_clean_streak || 0) / 
                    Math.max(stats.addiction_stats?.longest_clean_streak || 1, 7) * 100} 
                  className="h-2" 
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Recovery Progress</span>
                  <span className="text-sm font-medium">
                    {stats.addiction_stats?.total_recovered || 0} / {(stats.addiction_stats?.total_active || 0) + (stats.addiction_stats?.total_recovered || 0)} recovered
                  </span>
                </div>
                <Progress 
                  value={stats.addiction_stats?.recovery_rate || 0}
                  className="h-2" 
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Weekly Mood Distribution
            </h3>
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

        <div className="mt-8">
          <MilestoneProgressChart milestoneCounts={milestonesByPeriod} />
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
