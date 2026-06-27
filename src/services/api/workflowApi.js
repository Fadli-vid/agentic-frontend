import { fetchArray } from './client'

export const fetchWorkflowRuns = () => fetchArray('/api/workflow-runs')
