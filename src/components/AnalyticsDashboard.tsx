import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Award,
  Calendar,
  Activity,
  Target,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface AnalyticsSummary {
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

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#6b7280'];

const DEFAULT_MOOD_TRENDS = {
  great: 0,
  good: 0,
  okay: 0,
  difficult: 0,
  struggling: 0,
};

const DEFAULT_MILESTONE_COUNTS = {
  weekly: 0,
  monthly: 0,
  quarterly: 0,
  yearly: 0,
};

const DEFAULT_STREAK_DATA = {
  current: 0,
  longest: 0,
  weekly_average: 0,
};

const DEFAULT_RECOVERY_STATS = {
  total_clean_days: 0,
  active_records: 0,
  completed_records: 0,
  relapse_rate: 0,
};

const AnalyticsDashboard = () => {
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
          // Convert the JSON data to match our AnalyticsSummary interface
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-primary/10 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-primary/5 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-80 bg-primary/5 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">No analytics data available</p>
        </Card>
      </div>
    );
  }

  const moodTrendsData = Object.entries(analytics?.mood_trends || DEFAULT_MOOD_TRENDS).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
  }));

  const milestoneData = Object.entries(analytics?.milestone_counts || DEFAULT_MILESTONE_COUNTS).map(([period, count]) => ({
    name: period.charAt(0).toUpperCase() + period.slice(1),
    count,
  }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <h3 className="text-2xl font-bold mt-1">{analytics.streak_data.current} days</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Weekly avg: {analytics.streak_data.weekly_average.toFixed(1)} days
              </p>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Recovery Rate</p>
              <h3 className="text-2xl font-bold mt-1">
                {Math.round((analytics.recovery_stats.completed_records / 
                  (analytics.recovery_stats.active_records + analytics.recovery_stats.completed_records)) * 100)}%
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.recovery_stats.completed_records} completed records
              </p>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Clean Days</p>
              <h3 className="text-2xl font-bold mt-1">{analytics.recovery_stats.total_clean_days}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Across all records
              </p>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Relapse Rate</p>
              <h3 className="text-2xl font-bold mt-1">{analytics.recovery_stats.relapse_rate}%</h3>
              <div className="flex items-center gap-1 mt-1">
                {analytics.recovery_stats.relapse_rate < 50 ? (
                  <ArrowDown className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowUp className="h-3 w-3 text-red-500" />
                )}
                <p className="text-xs text-muted-foreground">
                  Overall trend
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Mood Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodTrendsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodTrendsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Milestone Progress</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={milestoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
