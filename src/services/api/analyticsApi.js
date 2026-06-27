// TODO: Connect when backend /api/analytics endpoint is available
export const fetchDashboard = async () => ({
  tasks: { total: 0, completed: 0, pending: 0 },
  habits: { active: 0, completedToday: 0, bestStreak: 0 },
  goals: { active: 0, completed: 0, upcomingDeadlines: 0 },
  budgets: { active: 0, totalBudget: 0, monthlySpent: 0 },
  memories: { total: 0, recent: 0 },
  workflows: { total: 0, completed: 0, failed: 0 },
})

export const fetchProductivityScore = async () => ({
  score: 0,
  breakdown: { tasks: 0, habits: 0, goals: 0, reminders: 0, memories: 0 },
})

export const fetchWeeklySummary = async () => ({})
export const fetchMonthlySummary = async () => ({})
