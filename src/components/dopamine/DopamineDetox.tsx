
import { Brain, Target, Clock, Battery, Trophy, ListTodo, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddChallengeDialog } from "./AddChallengeDialog";
import { ChallengeList } from "./ChallengeList";
import { DailyLogForm } from "./DailyLogForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  currentStreak: number;
  bestStreak: number;
  focusScore: number;
  dailyGoalsCompleted: number;
  totalGoals: number;
  digitalWellnessScore: number;
}

export const DopamineDetox = () => {
  const [stats, setStats] = useState<Stats>({
    currentStreak: 0,
    bestStreak: 0,
    focusScore: 0,
    dailyGoalsCompleted: 0,
    totalGoals: 5,
    digitalWellnessScore: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch today's log
      const today = new Date().toISOString().split('T')[0];
      const { data: logData } = await supabase
        .from('dopamine_detox_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_date', today)
        .maybeSingle();

      // Fetch active challenges
      const { data: challengeData } = await supabase
        .from('dopamine_detox_challenges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (logData) {
        const completedTasks = logData.completed_tasks?.length || 0;
        setStats(prev => ({
          ...prev,
          focusScore: logData.focus_score || 0,
          dailyGoalsCompleted: completedTasks,
          digitalWellnessScore: logData.digital_wellness_score || 0
        }));
      }

      // Calculate current streak from challenges
      if (challengeData && challengeData.length > 0) {
        const streaks = challengeData.map(challenge => {
          const start = new Date(challenge.start_date);
          const now = new Date();
          return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        });

        setStats(prev => ({
          ...prev,
          currentStreak: Math.max(...streaks),
          bestStreak: Math.max(...streaks, prev.bestStreak)
        }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Dopamine Detox
          </h1>
          <p className="text-muted-foreground mt-2">
            Reset your brain's reward system and improve focus through mindful digital habits
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak} days</div>
              <p className="text-xs text-muted-foreground mt-1">Best: {stats.bestStreak} days</p>
              <Progress value={(stats.currentStreak / Math.max(stats.bestStreak, 1)) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.focusScore}%</div>
              <Progress value={stats.focusScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Based on daily activities</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Goals</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.dailyGoalsCompleted}/{stats.totalGoals}</div>
              <Progress value={(stats.dailyGoalsCompleted / stats.totalGoals) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Tasks completed today</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Digital Wellness</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.digitalWellnessScore}%</div>
              <Progress value={stats.digitalWellnessScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Overall wellness score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Challenges</CardTitle>
                  <CardDescription>Your ongoing dopamine detox challenges</CardDescription>
                </div>
                <AddChallengeDialog />
              </CardHeader>
              <CardContent>
                <ChallengeList />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Milestones in your detox journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-primary/60" />
                    <div>
                      <p className="font-medium">First Day Complete</p>
                      <p className="text-sm text-muted-foreground">
                        Completed a full day of digital detox
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-primary/60" />
                    <div>
                      <p className="font-medium">Early Bird</p>
                      <p className="text-sm text-muted-foreground">
                        Avoided screens for the first hour after waking
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <DailyLogForm onLogSubmitted={fetchStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DopamineDetox;
