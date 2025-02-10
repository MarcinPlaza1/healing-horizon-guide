
import { AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const EmptyChallengeState = () => {
  return (
    <Card className="border-dashed">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-center">No Active Challenges</CardTitle>
        <CardDescription className="text-center">
          Start a new challenge to begin your dopamine detox journey
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

