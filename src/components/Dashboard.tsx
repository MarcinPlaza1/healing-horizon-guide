
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProgressPreview from "./ProgressPreview";
import DailyInspiration from "./DailyInspiration";
import { Brain, Target, Activity, Flame, Loader2 } from "lucide-react";
import { useProgressStats } from "@/hooks/useProgressStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HealthSummary from "./HealthSummary";

const QuickStats = () => {
  const { data: addictions } = useQuery({
    queryKey: ['dashboard-addictions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('addictions')
        .select('*')
        .eq('user_id', user.id);

      return data;
    }
  });

  const { data: detoxChallenges } = useQuery({
    queryKey: ['dashboard-detox'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('dopamine_detox_challenges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      return data;
    }
  });

  const stats = useProgressStats();

  if (!stats || !addictions || !detoxChallenges) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 glass-card animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-6 w-16 bg-muted rounded" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const activeAddictions = addictions.filter(a => a.status === 'active').length;
  const activeChallenges = detoxChallenges.length;
  const totalRecovered = addictions.filter(a => a.status === 'recovered').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Recovery</p>
            <h3 className="text-2xl font-bold mt-2">{activeAddictions}</h3>
            <p className="text-xs text-muted-foreground mt-1">Records being tracked</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
            <h3 className="text-2xl font-bold mt-2">
              {Math.round((totalRecovered / (totalRecovered + activeAddictions)) * 100)}%
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{totalRecovered} recovered</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Challenges</p>
            <h3 className="text-2xl font-bold mt-2">{activeChallenges}</h3>
            <p className="text-xs text-muted-foreground mt-1">Dopamine detox</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
            <h3 className="text-2xl font-bold mt-2">{stats.streak_count} days</h3>
            <p className="text-xs text-muted-foreground mt-1">Best: {stats.longest_streak} days</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Flame className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
            Your Wellness Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress and maintain your well-being journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <QuickStats />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <HealthSummary />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProgressPreview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DailyInspiration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
