import { fetchArray } from './client'

export const fetchGoals = () => fetchArray('/api/goals')

// TODO: Connect when backend PATCH /api/goals/:id is available
export const updateGoal = async (/* id, data */) => ({})
