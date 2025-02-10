
import { motion } from "framer-motion";

export const ProgressHeader = () => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
        Your Progress Journey
      </h1>
      <p className="text-muted-foreground">
        Track your wellness achievements and recovery milestones
      </p>
    </motion.div>
  );
};
