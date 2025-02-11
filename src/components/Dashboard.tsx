
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProgressPreview from "./ProgressPreview";
import DailyInspiration from "./DailyInspiration";
import { Brain, Target, Activity, Flame, Loader2 } from "lucide-react";
import { useProgressStats } from "@/hooks/useProgressStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HealthSummary from "./HealthSummary";
import { useTranslation } from "react-i18next";

const QuickStats = () => {
  const { t } = useTranslation();
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
          <Card key={i} className="p-6 animate-pulse bg-background/50 backdrop-blur-lg border border-primary/10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-primary/10 rounded" />
                <div className="h-6 w-16 bg-primary/10 rounded" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10" />
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
      <Card className="p-6 bg-background/50 backdrop-blur-lg border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-primary/80">{t('dashboard.quickStats.activeRecovery')}</p>
            <h3 className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {activeAddictions}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{t('dashboard.quickStats.recordsTracked')}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur-lg border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-primary/80">{t('dashboard.quickStats.recoveryRate')}</p>
            <h3 className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {Math.round((totalRecovered / (totalRecovered + activeAddictions)) * 100)}%
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{totalRecovered} {t('dashboard.quickStats.recovered')}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur-lg border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-primary/80">{t('dashboard.quickStats.activeChallenges')}</p>
            <h3 className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {activeChallenges}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{t('dashboard.quickStats.dopamineDetox')}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur-lg border border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-primary/80">{t('dashboard.quickStats.currentStreak')}</p>
            <h3 className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {stats.streak_count} {t('dashboard.quickStats.days')}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t('dashboard.quickStats.best')}: {stats.longest_streak} {t('dashboard.quickStats.days')}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Flame className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('dashboard.subtitle')}
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
            className="h-full"
          >
            <ProgressPreview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full"
          >
            <DailyInspiration />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
