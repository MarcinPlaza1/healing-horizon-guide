
import { motion } from "framer-motion";
import { Droplets, Apple, Cookie, Beef, Wheat, Sandwich } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { calculateProgress } from "../utils/nutritionUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NutritionProgressTrackerProps {
  todayLog: {
    water_ml: number;
    calories: number;
    sugar_grams: number;
    protein_grams: number;
    fat_grams: number;
    carbs_grams: number;
  };
  goals: {
    daily_water_ml: number;
    daily_calories: number;
    daily_sugar_grams: number;
    daily_protein_grams: number;
    daily_fat_grams: number;
    daily_carbs_grams: number;
  };
}

export const NutritionProgressTracker = ({ todayLog, goals }: NutritionProgressTrackerProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <TooltipProvider>
      <motion.div 
        className="grid gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <Label>Water Intake</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.water_ml}ml / {goals.daily_water_ml}ml
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.water_ml, goals.daily_water_ml)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.water_ml, goals.daily_water_ml))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Apple className="h-4 w-4 text-green-500" />
              <Label>Calories</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.calories} / {goals.daily_calories} kcal
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.calories, goals.daily_calories)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.calories, goals.daily_calories))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Beef className="h-4 w-4 text-red-500" />
              <Label>Protein</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.protein_grams}g / {goals.daily_protein_grams}g
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.protein_grams, goals.daily_protein_grams)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.protein_grams, goals.daily_protein_grams))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sandwich className="h-4 w-4 text-yellow-500" />
              <Label>Fat</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.fat_grams}g / {goals.daily_fat_grams}g
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.fat_grams, goals.daily_fat_grams)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.fat_grams, goals.daily_fat_grams))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wheat className="h-4 w-4 text-orange-500" />
              <Label>Carbs</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.carbs_grams}g / {goals.daily_carbs_grams}g
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.carbs_grams, goals.daily_carbs_grams)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.carbs_grams, goals.daily_carbs_grams))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-4 w-4 text-amber-500" />
              <Label>Sugar</Label>
            </div>
            <span className="text-sm text-muted-foreground">
              {todayLog.sugar_grams}g / {goals.daily_sugar_grams}g
            </span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress 
                  value={calculateProgress(todayLog.sugar_grams, goals.daily_sugar_grams)} 
                  className="h-2 transition-all hover:h-3"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {Math.round(calculateProgress(todayLog.sugar_grams, goals.daily_sugar_grams))}% of daily goal
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
};
