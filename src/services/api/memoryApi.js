import { fetchArray } from './client'

export const fetchMemories = () => fetchArray('/api/memories')

// TODO: Connect when backend GET /api/memories/search is available
export const searchMemories = async (/* query */) => []

// TODO: Connect when backend DELETE /api/memories/:id is available
export const deleteMemory = async (/* id */) => ({})
