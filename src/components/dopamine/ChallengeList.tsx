import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, differenceInDays } from "date-fns";

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

      console.log("Fetched challenges:", data); // Debug log
      setChallenges(data || []);
    } catch (error: any) {
      console.error("Error fetching challenges:", error); // Debug log
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
        <Card key={challenge.id}>
          <CardHeader>
            <CardTitle>{challenge.name}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
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
              <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{Math.round(calculateProgress(challenge.start_date, challenge.end_date))}%</span>
                </div>
                <Progress value={calculateProgress(challenge.start_date, challenge.end_date)} />
              </div>
              <Button onClick={() => completeChallenge(challenge.id)}>Mark as Complete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
