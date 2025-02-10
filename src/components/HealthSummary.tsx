
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, JournalText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface HealthSummaryData {
  mood_average: string | null;
  mindfulness_minutes: number;
  journal_entries: number;
}

const HealthSummary = () => {
  const [summary, setSummary] = useState<HealthSummaryData | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('health_summaries')
        .select('*')
        .eq('user_id', user.id)
        .eq('summary_date', new Date().toISOString().split('T')[0])
        .maybeSingle();

      if (data) {
        setSummary(data);
      }
    };

    fetchSummary();
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
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mindfulness</p>
            <p className="font-medium">{summary.mindfulness_minutes} minutes</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <JournalText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Journal Entries</p>
            <p className="font-medium">{summary.journal_entries} today</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthSummary;
