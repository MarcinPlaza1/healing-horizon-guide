
import { differenceInDays } from "date-fns";

export const calculateProgress = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  const totalDays = differenceInDays(end, start);
  const daysPassed = differenceInDays(today, start);
  return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
};

export const getDifficultyColor = (difficulty: string) => {
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
