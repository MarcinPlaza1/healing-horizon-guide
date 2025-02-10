
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, differenceInDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, CheckCircle2 } from "lucide-react";

interface Challenge {
  id: string;
  name: string;
  description: string | null;
  challenge_type: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  progress: number;
  status: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  current_streak: number;
  best_streak: number;
  target_reduction_hours?: number;
  daily_goals: any[];
}

export function ChallengeList({ onChallengeUpdate }: { onChallengeUpdate?: () => void }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChallenges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('dopamine_detox_challenges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log("Fetched challenges:", data);
      setChallenges(data || []);
    } catch (error: any) {
      console.error("Error fetching challenges:", error);
      toast({
        variant: "destructive",
        title: "Error fetching challenges",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDays = differenceInDays(end, start);
    const daysPassed = differenceInDays(today, start);
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  const completeChallenge = async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from('dopamine_detox_challenges')
        .update({ status: 'completed' })
        .eq('id', challengeId);

      if (error) throw error;

      // Create achievement for completing the challenge
      const { error: achievementError } = await supabase
        .from('dopamine_detox_achievements')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          challenge_id: challengeId,
          title: "Challenge Completed",
          description: "Successfully completed a dopamine detox challenge",
          achievement_type: 'challenge_completed',
          points: 100,
          level: 1
        });

      if (achievementError) throw achievementError;

      toast({
        title: "Challenge completed",
        description: "Congratulations on completing your challenge!",
      });

      fetchChallenges();
      if (onChallengeUpdate) {
        onChallengeUpdate();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error completing challenge",
        description: error.message,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'hard':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (challenges.length === 0) {
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
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
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
              <Button onClick={() => completeChallenge(challenge.id)}>Mark as Complete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
