
export const calculateProgress = (current: number, goal: number) => {
  return Math.min((current / goal) * 100, 100);
};
