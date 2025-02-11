
import { motion } from "framer-motion";
import ProgressPreview from "./ProgressPreview";
import DailyInspiration from "./DailyInspiration";
import HealthSummary from "./HealthSummary";
import { QuickStats } from "./dashboard/QuickStats";
import { useTranslation } from "react-i18next";

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
