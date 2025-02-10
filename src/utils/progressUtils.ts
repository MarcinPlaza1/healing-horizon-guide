
export const getMilestonesByPeriod = (milestones: Array<{ days_clean: number }>) => ({
  weekly: milestones.filter(m => m.days_clean <= 7).length || 0,
  monthly: milestones.filter(m => m.days_clean <= 30).length || 0,
  quarterly: milestones.filter(m => m.days_clean <= 90).length || 0,
  yearly: milestones.filter(m => m.days_clean <= 365).length || 0
});
