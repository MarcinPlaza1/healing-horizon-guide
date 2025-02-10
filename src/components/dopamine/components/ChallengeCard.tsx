
import { format } from "date-fns";
import { Target, Trophy, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Challenge } from "../types/challenge";
import { calculateProgress, getDifficultyColor } from "../utils/challengeUtils";

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete: (id: string) => void;
}

export const ChallengeCard = ({ challenge, onComplete }: ChallengeCardProps) => {
  return (
    <Card key={challenge.id} className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <Badge variant="secondary" className={`${getDifficultyColor(challenge.difficulty_level)}`}>
          {challenge.difficulty_level}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {challenge.name}
        </CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Type: {challenge.challenge_type.replace(/_/g, ' ')}
              </p>
              <p className="text-sm text-muted-foreground">
                Started: {format(new Date(challenge.start_date), 'PPP')}
              </p>
              <p className="text-sm text-muted-foreground">
                Ends: {format(new Date(challenge.end_date), 'PPP')}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <p className="text-sm text-muted-foreground">
                  Best Streak: {challenge.best_streak} days
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <p className="text-sm text-muted-foreground">
                  Current Streak: {challenge.current_streak} days
                </p>
              </div>
              {challenge.target_reduction_hours && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-muted-foreground">
                    Target: {challenge.target_reduction_hours}h reduction
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(calculateProgress(challenge.start_date, challenge.end_date))}%</span>
            </div>
            <Progress value={calculateProgress(challenge.start_date, challenge.end_date)} />
          </div>
          {challenge.daily_goals?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Daily Goals</h4>
              <ul className="list-disc list-inside space-y-1">
                {challenge.daily_goals.map((goal, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {goal.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button onClick={() => onComplete(challenge.id)}>Mark as Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};
