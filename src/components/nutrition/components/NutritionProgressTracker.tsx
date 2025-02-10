
import { Droplets, Apple, Cookie, Beef } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { calculateProgress } from "../utils/nutritionUtils";

interface NutritionProgressTrackerProps {
  todayLog: {
    water_ml: number;
    calories: number;
    sugar_grams: number;
    protein_grams: number;
  };
  goals: {
    daily_water_ml: number;
    daily_calories: number;
    daily_sugar_grams: number;
    daily_protein_grams: number;
  };
}

export const NutritionProgressTracker = ({ todayLog, goals }: NutritionProgressTrackerProps) => {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <Label>Water Intake</Label>
          </div>
          <span className="text-sm text-muted-foreground">
            {todayLog.water_ml}ml / {goals.daily_water_ml}ml
          </span>
        </div>
        <Progress value={calculateProgress(todayLog.water_ml, goals.daily_water_ml)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Apple className="h-4 w-4 text-green-500" />
            <Label>Calories</Label>
          </div>
          <span className="text-sm text-muted-foreground">
            {todayLog.calories} / {goals.daily_calories} kcal
          </span>
        </div>
        <Progress value={calculateProgress(todayLog.calories, goals.daily_calories)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cookie className="h-4 w-4 text-amber-500" />
            <Label>Sugar</Label>
          </div>
          <span className="text-sm text-muted-foreground">
            {todayLog.sugar_grams}g / {goals.daily_sugar_grams}g
          </span>
        </div>
        <Progress value={calculateProgress(todayLog.sugar_grams, goals.daily_sugar_grams)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Beef className="h-4 w-4 text-red-500" />
            <Label>Protein</Label>
          </div>
          <span className="text-sm text-muted-foreground">
            {todayLog.protein_grams}g / {goals.daily_protein_grams}g
          </span>
        </div>
        <Progress value={calculateProgress(todayLog.protein_grams, goals.daily_protein_grams)} />
      </div>
    </div>
  );
};
