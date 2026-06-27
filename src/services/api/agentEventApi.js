import { fetchArray } from './client'

export const fetchAgentEvents = () => fetchArray('/api/agent-events')
