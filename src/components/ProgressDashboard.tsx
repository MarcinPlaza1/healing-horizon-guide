import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MilestoneProgressChart } from "./analytics/MilestoneProgressChart";
import { KeyMetrics } from "./progress/KeyMetrics";
import { RecentMilestones } from "./progress/RecentMilestones";
import { RecoveryStreaks } from "./progress/RecoveryStreaks";
import { ProgressTracking } from "./progress/ProgressTracking";
import { MoodDistribution } from "./progress/MoodDistribution";

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

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('streak_count, longest_streak, last_check_in, weekly_mood_counts')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

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

        <KeyMetrics 
          streak_count={stats.streak_count}
          longest_clean_streak={stats.addiction_stats?.longest_clean_streak || 0}
          recovery_rate={stats.addiction_stats?.recovery_rate || 0}
          total_milestones={stats.addiction_stats?.total_milestones || 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RecentMilestones 
            milestones={stats.addiction_stats?.recent_milestones || []}
          />
          <RecoveryStreaks 
            streaks={stats.addiction_stats?.addiction_streaks || []}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressTracking 
            streak_count={stats.streak_count}
            longest_streak={stats.longest_streak}
            current_clean_streak={stats.addiction_stats?.current_clean_streak || 0}
            longest_clean_streak={stats.addiction_stats?.longest_clean_streak || 0}
            total_recovered={stats.addiction_stats?.total_recovered || 0}
            total_active={stats.addiction_stats?.total_active || 0}
            recovery_rate={stats.addiction_stats?.recovery_rate || 0}
          />
          <MoodDistribution 
            weekly_mood_counts={stats.weekly_mood_counts}
          />
        </div>

        <div className="mt-8">
          <MilestoneProgressChart milestoneCounts={milestonesByPeriod} />
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
