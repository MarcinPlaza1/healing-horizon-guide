
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface AnalyticsSummary {
  mood_trends: {
    great: number;
    good: number;
    okay: number;
    difficult: number;
    struggling: number;
  };
  streak_data: {
    current: number;
    longest: number;
    weekly_average: number;
  };
  recovery_stats: {
    total_clean_days: number;
    active_records: number;
    completed_records: number;
    relapse_rate: number;
  };
  milestone_counts: {
    weekly: number;
    monthly: number;
    quarterly: number;
    yearly: number;
  };
}

export const DEFAULT_MOOD_TRENDS = {
  great: 0,
  good: 0,
  okay: 0,
  difficult: 0,
  struggling: 0,
};

export const DEFAULT_MILESTONE_COUNTS = {
  weekly: 0,
  monthly: 0,
  quarterly: 0,
  yearly: 0,
};

export const DEFAULT_STREAK_DATA = {
  current: 0,
  longest: 0,
  weekly_average: 0,
};

export const DEFAULT_RECOVERY_STATS = {
  total_clean_days: 0,
  active_records: 0,
  completed_records: 0,
  relapse_rate: 0,
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('analytics_summaries')
          .select('*')
          .eq('user_id', user.id)
          .eq('summary_date', new Date().toISOString().split('T')[0])
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const formattedData: AnalyticsSummary = {
            mood_trends: (typeof data.mood_trends === 'object' && data.mood_trends !== null) 
              ? { ...DEFAULT_MOOD_TRENDS, ...data.mood_trends as Record<string, number> }
              : DEFAULT_MOOD_TRENDS,
            streak_data: (typeof data.streak_data === 'object' && data.streak_data !== null)
              ? { ...DEFAULT_STREAK_DATA, ...data.streak_data as Record<string, number> }
              : DEFAULT_STREAK_DATA,
            recovery_stats: (typeof data.recovery_stats === 'object' && data.recovery_stats !== null)
              ? { ...DEFAULT_RECOVERY_STATS, ...data.recovery_stats as Record<string, number> }
              : DEFAULT_RECOVERY_STATS,
            milestone_counts: (typeof data.milestone_counts === 'object' && data.milestone_counts !== null)
              ? { ...DEFAULT_MILESTONE_COUNTS, ...data.milestone_counts as Record<string, number> }
              : DEFAULT_MILESTONE_COUNTS
          };
          setAnalytics(formattedData);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load analytics data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  return { analytics, isLoading };
};
