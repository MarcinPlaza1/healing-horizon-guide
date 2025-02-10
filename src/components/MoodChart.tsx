
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const MoodChart = () => {
  const [moodData, setMoodData] = useState<any>(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('weekly_mood_counts')
        .eq('id', user.id)
        .single();

      if (profile?.weekly_mood_counts) {
        const chartData = Object.entries(profile.weekly_mood_counts).map(([mood, count]) => ({
          mood: mood.charAt(0).toUpperCase() + mood.slice(1),
          count: count as number
        }));
        setMoodData(chartData);
      }
    };

    fetchMoodData();
  }, []);

  if (!moodData) return null;

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-semibold mb-4">Weekly Mood Distribution</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={moodData}>
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MoodChart;
