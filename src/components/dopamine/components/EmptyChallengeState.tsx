
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const EmptyChallengeState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Active Challenges</CardTitle>
        <CardDescription>
          Start a new challenge to begin your dopamine detox journey
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
