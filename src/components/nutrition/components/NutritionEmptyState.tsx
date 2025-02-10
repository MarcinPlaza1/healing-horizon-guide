
import { AlertCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const NutritionEmptyState = () => {
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
};
