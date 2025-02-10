
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Challenge } from "./types/challenge";
import { ChallengeCard } from "./components/ChallengeCard";
import { EmptyChallengeState } from "./components/EmptyChallengeState";
import { ChallengeLoadingState } from "./components/ChallengeLoadingState";

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
      
      // Transform the data to ensure correct types
      const transformedData = (data || []).map(challenge => ({
        ...challenge,
        difficulty_level: (challenge.difficulty_level || 'medium') as 'easy' | 'medium' | 'hard',
        daily_goals: Array.isArray(challenge.daily_goals) ? challenge.daily_goals : []
      }));

      setChallenges(transformedData);
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

  if (loading) {
    return <ChallengeLoadingState />;
  }

  if (challenges.length === 0) {
    return <EmptyChallengeState />;
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <ChallengeCard 
          key={challenge.id}
          challenge={challenge}
          onComplete={completeChallenge}
        />
      ))}
    </div>
  );
}
