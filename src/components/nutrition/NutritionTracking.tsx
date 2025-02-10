
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AddNutritionLog } from "./AddNutritionLog";
import { NutritionLoadingState } from "./components/NutritionLoadingState";
import { NutritionErrorState } from "./components/NutritionErrorState";
import { NutritionEmptyState } from "./components/NutritionEmptyState";
import { NutritionProgressTracker } from "./components/NutritionProgressTracker";
import { PhysicalParamsForm } from "./components/PhysicalParamsForm";

interface NutritionGoals {
  daily_water_ml: number;
  daily_calories: number;
  daily_sugar_grams: number;
  daily_protein_grams: number;
  daily_fat_grams: number;
  daily_carbs_grams: number;
  weight_kg: number | null;
  height_cm: number | null;
  age: number | null;
  gender: "male" | "female" | "other" | null;
  activity_level: "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | null;
}

interface NutritionLog {
  water_ml: number;
  calories: number;
  sugar_grams: number;
  fat_grams: number;
  protein_grams: number;
  carbs_grams: number;
  meals: any[];
  notes: string;
}

export const NutritionTracking = () => {
  const [showAddLog, setShowAddLog] = useState(false);
  const [goals, setGoals] = useState<NutritionGoals | null>(null);
  const [todayLog, setTodayLog] = useState<NutritionLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNutritionData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to view nutrition data");
        return;
      }

      // Fetch user's nutrition goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('nutrition_goals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (goalsError) throw goalsError;

      if (goalsData) {
        setGoals(goalsData);
      } else {
        // Create default goals if none exist
        const { data: newGoals, error: createError } = await supabase
          .from('nutrition_goals')
          .insert([{ user_id: user.id }])
          .select()
          .single();
          
        if (createError) throw createError;
        setGoals(newGoals);
      }

      // Fetch today's nutrition log
      const today = new Date().toISOString().split('T')[0];
      const { data: logData, error: logError } = await supabase
        .from('nutrition_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .maybeSingle();

      if (logError) throw logError;

      if (logData) {
        const meals = Array.isArray(logData.meals) ? logData.meals : [];
        setTodayLog({
          ...logData,
          meals,
          water_ml: logData.water_ml || 0,
          calories: logData.calories || 0,
          sugar_grams: logData.sugar_grams || 0,
          fat_grams: logData.fat_grams || 0,
          protein_grams: logData.protein_grams || 0,
          carbs_grams: logData.carbs_grams || 0,
          notes: logData.notes || ''
        });
      } else {
        setTodayLog({
          water_ml: 0,
          calories: 0,
          sugar_grams: 0,
          fat_grams: 0,
          protein_grams: 0,
          carbs_grams: 0,
          meals: [],
          notes: ''
        });
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Error fetching nutrition data",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, []);

  if (isLoading) {
    return <NutritionLoadingState />;
  }

  if (error) {
    return <NutritionErrorState error={error} onRetry={fetchNutritionData} />;
  }

  if (!goals || !todayLog) {
    return <NutritionEmptyState />;
  }

  return (
    <div className="space-y-6">
      <PhysicalParamsForm
        initialParams={{
          weight_kg: goals.weight_kg,
          height_cm: goals.height_cm,
          age: goals.age,
          gender: goals.gender,
          activity_level: goals.activity_level,
        }}
        onParamsUpdated={fetchNutritionData}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Daily Nutrition Tracking
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAddLog(true)}
              className="ml-auto"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>Track your daily nutrition and water intake</CardDescription>
        </CardHeader>
        <CardContent>
          <NutritionProgressTracker todayLog={todayLog} goals={goals} />
        </CardContent>
      </Card>

      <AddNutritionLog
        open={showAddLog}
        onOpenChange={setShowAddLog}
        onLogAdded={fetchNutritionData}
      />
    </div>
  );
};
