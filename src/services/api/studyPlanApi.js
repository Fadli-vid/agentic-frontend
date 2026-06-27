import { fetchArray } from './client'

export const fetchStudyPlans = () => fetchArray('/api/study-plans')

// TODO: Connect when backend PATCH /api/study-plans/:id is available
export const updateStudyPlan = async (/* id, data */) => ({})
