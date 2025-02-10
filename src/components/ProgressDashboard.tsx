
import { motion } from "framer-motion";
import { MilestoneProgressChart } from "./analytics/MilestoneProgressChart";
import { KeyMetrics } from "./progress/KeyMetrics";
import { RecentMilestones } from "./progress/RecentMilestones";
import { RecoveryStreaks } from "./progress/RecoveryStreaks";
import { ProgressTracking } from "./progress/ProgressTracking";
import { MoodDistribution } from "./progress/MoodDistribution";
import { ProgressHeader } from "./progress/ProgressHeader";
import { useProgressStats } from "@/hooks/useProgressStats";
import { getMilestonesByPeriod } from "@/utils/progressUtils";

const ProgressDashboard = () => {
  const stats = useProgressStats();

  if (!stats) return null;

  const milestonesByPeriod = getMilestonesByPeriod(stats.addiction_stats?.recent_milestones || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <ProgressHeader />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <KeyMetrics 
            streak_count={stats.streak_count}
            longest_clean_streak={stats.addiction_stats?.longest_clean_streak || 0}
            recovery_rate={stats.addiction_stats?.recovery_rate || 0}
            total_milestones={stats.addiction_stats?.total_milestones || 0}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RecentMilestones 
            milestones={stats.addiction_stats?.recent_milestones || []}
          />
          <RecoveryStreaks 
            streaks={stats.addiction_stats?.addiction_streaks || []}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ProgressTracking 
            streak_count={stats.streak_count}
            longest_streak={stats.longest_streak}
            current_clean_streak={stats.addiction_stats?.current_clean_streak || 0}
            longest_clean_streak={stats.addiction_stats?.longest_clean_streak || 0}
            total_recovered={stats.addiction_stats?.total_recovered || 0}
            total_active={stats.addiction_stats?.total_active || 0}
            recovery_rate={stats.addiction_stats?.recovery_rate || 0}
          />
          <MoodDistribution 
            weekly_mood_counts={stats.weekly_mood_counts}
          />
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <MilestoneProgressChart milestoneCounts={milestonesByPeriod} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
