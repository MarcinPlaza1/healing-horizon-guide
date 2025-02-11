
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { HealthMetrics } from "./health/HealthMetrics";
import { RecoveryOverview } from "./health/RecoveryOverview";

interface HealthSummaryData {
  mood_average: string | null;
  journal_entries: number;
}

interface AddictionStats {
  active: number;
  recovered: number;
  relapsed: number;
  total_milestones: number;
  clean_days: number;
}

const HealthSummary = () => {
  const [summary, setSummary] = useState<HealthSummaryData | null>(null);
  const [addictionStats, setAddictionStats] = useState<AddictionStats>({
    active: 0,
    recovered: 0,
    relapsed: 0,
    total_milestones: 0,
    clean_days: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError("Please sign in to view your health summary");
          return;
        }

        // Fetch health summary
        const { data: healthData, error: healthError } = await supabase
          .from('health_summaries')
          .select('*')
          .eq('user_id', user.id)
          .eq('summary_date', new Date().toISOString().split('T')[0])
          .maybeSingle();

        if (healthError) {
          console.error('Error fetching health summary:', healthError);
          setError("Failed to load health summary");
          return;
        }

        if (healthData) {
          setSummary(healthData);
        } else {
          setSummary({
            mood_average: null,
            journal_entries: 0
          });
        }

        // Fetch addiction statistics
        const { data: addictionData, error: addictionError } = await supabase
          .from('addictions')
          .select('status, clean_since, last_relapse_date')
          .eq('user_id', user.id);

        if (addictionError) {
          console.error('Error fetching addiction data:', addictionError);
          return;
        }

        const { data: milestoneData } = await supabase
          .from('recovery_milestones')
          .select('id')
          .eq('user_id', user.id);

        if (addictionData) {
          const stats = addictionData.reduce((acc, curr) => ({
            ...acc,
            [curr.status]: (acc[curr.status as keyof typeof acc] || 0) + 1,
            clean_days: acc.clean_days + (curr.clean_since ? 
              Math.floor((new Date().getTime() - new Date(curr.clean_since).getTime()) / (1000 * 60 * 60 * 24)) : 0)
          }), { active: 0, recovered: 0, relapsed: 0, clean_days: 0 });

          setAddictionStats({
            ...stats,
            total_milestones: milestoneData?.length || 0
          });
        }
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6 glass-card fade-in">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary/10 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-primary/5 rounded"></div>
            ))}
          </div>
          <div className="h-40 bg-primary/5 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 glass-card fade-in">
        <div className="text-center text-muted-foreground">
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  if (!summary) return null;

  return (
    <Card className="p-6 glass-card fade-in">
      <h3 className="text-lg font-semibold mb-4">Today's Health Summary</h3>
      
      <HealthMetrics
        moodAverage={summary.mood_average}
        journalEntries={summary.journal_entries}
        totalMilestones={addictionStats.total_milestones}
      />

      <RecoveryOverview
        active={addictionStats.active}
        recovered={addictionStats.recovered}
        relapsed={addictionStats.relapsed}
        cleanDays={addictionStats.clean_days}
      />
    </Card>
  );
};

export default HealthSummary;
