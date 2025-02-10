
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const NutritionEmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-dashed">
        <CardHeader className="space-y-4">
          <motion.div 
            className="flex items-center justify-center"
            initial={{ rotate: -10, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          <CardTitle className="text-center">No Nutrition Data</CardTitle>
          <CardDescription className="text-center">
            Start tracking your nutrition by adding your first log
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
