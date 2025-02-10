
export interface Challenge {
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
