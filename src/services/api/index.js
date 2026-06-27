/**
 * Barrel re-export for all API modules.
 * Import like: import { fetchTasks, fetchReminders } from '../services/api'
 */
export { fetchTasks, updateTaskStatus, deleteTask } from './taskApi'
export { fetchExpenses, deleteExpense } from './expenseApi'
export { fetchReminders } from './reminderApi'
export { fetchAutomations, updateAutomation } from './automationApi'
export { fetchWorkflowRuns } from './workflowApi'
export { fetchAgentEvents } from './agentEventApi'
export { fetchHabits, completeHabit, skipHabit } from './habitApi'
export { fetchGoals, updateGoal } from './goalApi'
export { fetchStudyPlans, updateStudyPlan } from './studyPlanApi'
export { fetchBudgets, updateBudget } from './budgetApi'
export { fetchMemories, searchMemories, deleteMemory } from './memoryApi'
export {
  fetchDashboard,
  fetchProductivityScore,
  fetchWeeklySummary,
  fetchMonthlySummary,
} from './analyticsApi'
