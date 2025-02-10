
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ProgressStats {
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

export const useProgressStats = () => {
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

  return stats;
};
