
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookText, Trophy, Target, Pill, Activity, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch health summary
      const { data: healthData } = await supabase
        .from('health_summaries')
        .select('*')
        .eq('user_id', user.id)
        .eq('summary_date', new Date().toISOString().split('T')[0])
        .maybeSingle();

      if (healthData) {
        setSummary(healthData);
      }

      // Fetch addiction statistics
      const { data: addictionData } = await supabase
        .from('addictions')
        .select('status, clean_since, last_relapse_date')
        .eq('user_id', user.id);

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
    };

    fetchData();
  }, []);

  if (!summary) return null;

  return (
    <Card className="p-6 glass-card fade-in">
      <h3 className="text-lg font-semibold mb-4">Today's Health Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mood</p>
            <p className="font-medium">
              {summary.mood_average ? (
                <Badge variant="outline" className="capitalize">
                  {summary.mood_average}
                </Badge>
              ) : (
                "Not recorded"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <BookText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Journal Entries</p>
            <p className="font-medium">{summary.journal_entries} today</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recovery Progress</p>
            <p className="font-medium">
              {addictionStats.total_milestones} milestones
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-semibold mb-3">Recovery Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Active Records</p>
            </div>
            <p className="font-medium text-lg">{addictionStats.active}</p>
          </div>
          <div className="p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Recovered</p>
            </div>
            <p className="font-medium text-lg">{addictionStats.recovered}</p>
          </div>
          <div className="p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Pill className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Need Support</p>
            </div>
            <p className="font-medium text-lg">{addictionStats.relapsed}</p>
          </div>
          <div className="p-3 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">Total Clean Days</p>
            </div>
            <p className="font-medium text-lg">{addictionStats.clean_days}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthSummary;
