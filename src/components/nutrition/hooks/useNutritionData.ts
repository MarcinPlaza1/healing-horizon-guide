
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const useNutritionData = () => {
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
        const typedGoals: NutritionGoals = {
          daily_water_ml: goalsData.daily_water_ml,
          daily_calories: goalsData.daily_calories,
          daily_sugar_grams: goalsData.daily_sugar_grams,
          daily_protein_grams: goalsData.daily_protein_grams,
          daily_fat_grams: goalsData.daily_fat_grams,
          daily_carbs_grams: goalsData.daily_carbs_grams,
          weight_kg: goalsData.weight_kg,
          height_cm: goalsData.height_cm,
          age: goalsData.age,
          gender: goalsData.gender as "male" | "female" | "other" | null,
          activity_level: goalsData.activity_level as "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | null
        };
        setGoals(typedGoals);
      } else {
        const { data: newGoals, error: createError } = await supabase
          .from('nutrition_goals')
          .insert([{ user_id: user.id }])
          .select()
          .single();
          
        if (createError) throw createError;
        
        const typedNewGoals: NutritionGoals = {
          daily_water_ml: newGoals.daily_water_ml,
          daily_calories: newGoals.daily_calories,
          daily_sugar_grams: newGoals.daily_sugar_grams,
          daily_protein_grams: newGoals.daily_protein_grams,
          daily_fat_grams: newGoals.daily_fat_grams,
          daily_carbs_grams: newGoals.daily_carbs_grams,
          weight_kg: newGoals.weight_kg,
          height_cm: newGoals.height_cm,
          age: newGoals.age,
          gender: newGoals.gender as "male" | "female" | "other" | null,
          activity_level: newGoals.activity_level as "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | null
        };
        setGoals(typedNewGoals);
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

  return {
    goals,
    todayLog,
    isLoading,
    error,
    refetchData: fetchNutritionData
  };
};

export type { NutritionGoals, NutritionLog };
