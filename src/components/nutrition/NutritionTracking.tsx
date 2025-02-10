
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Plus, Droplets, Apple, Cookie, Beef, AlertCircle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AddNutritionLog } from "./AddNutritionLog";
import { Skeleton } from "@/components/ui/skeleton";

interface NutritionGoals {
  daily_water_ml: number;
  daily_calories: number;
  daily_sugar_grams: number;
  daily_fat_grams: number;
  daily_protein_grams: number;
  daily_carbs_grams: number;
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

  useEffect(() => {
    fetchNutritionData();
  }, []);

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
        // Ensure meals is an array and handle potential null values
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
        // Set default values if no log exists
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

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Error Loading Nutrition Data</CardTitle>
          </div>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchNutritionData} variant="outline" className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[250px] mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!goals || !todayLog) {
    return (
      <Card className="border-dashed">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-center">No Nutrition Data</CardTitle>
          <CardDescription className="text-center">
            Start tracking your nutrition by adding your first log
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
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

