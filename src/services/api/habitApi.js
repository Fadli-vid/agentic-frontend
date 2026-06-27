import { fetchArray } from './client'

export const fetchHabits = () => fetchArray('/api/habits')

// TODO: Connect when backend PATCH /api/habits/:id/complete is available
export const completeHabit = async (/* id */) => ({})

// TODO: Connect when backend PATCH /api/habits/:id/skip is available
export const skipHabit = async (/* id */) => ({})
