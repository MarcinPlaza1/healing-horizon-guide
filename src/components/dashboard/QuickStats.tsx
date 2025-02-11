
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Target, Activity, Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useProgressStats } from "@/hooks/useProgressStats";

const StatCard = ({ title, value, subtitle, icon: Icon }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="p-6 bg-background/50 backdrop-blur-lg border border-primary/10 cursor-pointer group transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-primary/80">{title}</p>
          <h3 className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </Card>
  </motion.div>
);

export const QuickStats = () => {
  const { t } = useTranslation();
  const progressStats = useProgressStats();
  
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

  if (!addictions || !detoxChallenges || !progressStats) {
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
      <StatCard
        title={t('dashboard.quickStats.activeRecovery')}
        value={activeAddictions}
        subtitle={t('dashboard.quickStats.recordsTracked')}
        icon={Brain}
      />
      <StatCard
        title={t('dashboard.quickStats.recoveryRate')}
        value={`${Math.round((totalRecovered / (totalRecovered + activeAddictions)) * 100)}%`}
        subtitle={`${totalRecovered} ${t('dashboard.quickStats.recovered')}`}
        icon={Target}
      />
      <StatCard
        title={t('dashboard.quickStats.activeChallenges')}
        value={activeChallenges}
        subtitle={t('dashboard.quickStats.dopamineDetox')}
        icon={Activity}
      />
      <StatCard
        title={t('dashboard.quickStats.currentStreak')}
        value={`${progressStats.streak_count} ${t('dashboard.quickStats.days')}`}
        subtitle={`${t('dashboard.quickStats.best')}: ${progressStats.longest_streak} ${t('dashboard.quickStats.days')}`}
        icon={Flame}
      />
    </div>
  );
};
