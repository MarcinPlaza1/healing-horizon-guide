
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddNutritionLog } from "./AddNutritionLog";
import { NutritionLoadingState } from "./components/NutritionLoadingState";
import { NutritionErrorState } from "./components/NutritionErrorState";
import { NutritionEmptyState } from "./components/NutritionEmptyState";
import { NutritionProgressTracker } from "./components/NutritionProgressTracker";
import { PhysicalParamsForm } from "./components/PhysicalParamsForm";
import { useNutritionData } from "./hooks/useNutritionData";

export const NutritionTracking = () => {
  const [showAddLog, setShowAddLog] = useState(false);
  const { goals, todayLog, isLoading, error, refetchData } = useNutritionData();

  if (isLoading) {
    return <NutritionLoadingState />;
  }

  if (error) {
    return <NutritionErrorState error={error} onRetry={refetchData} />;
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
        onParamsUpdated={refetchData}
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
        onLogAdded={refetchData}
      />
    </div>
  );
};
