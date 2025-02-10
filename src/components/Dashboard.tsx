
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProgressPreview from "./ProgressPreview";
import DailyInspiration from "./DailyInspiration";
import { Brain, Target, Activity, Flame } from "lucide-react";

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Today's Focus</p>
            <h3 className="text-2xl font-bold mt-2">Mindfulness</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Recovery Goals</p>
            <h3 className="text-2xl font-bold mt-2">4/5</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Days</p>
            <h3 className="text-2xl font-bold mt-2">12</h3>
          </div>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="h-4 w-4 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Streak</p>
            <h3 className="text-2xl font-bold mt-2">7 days</h3>
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
