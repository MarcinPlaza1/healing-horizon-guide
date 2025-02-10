
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NutritionErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const NutritionErrorState = ({ error, onRetry }: NutritionErrorStateProps) => {
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
        <Button onClick={onRetry} variant="outline" className="w-full">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};
