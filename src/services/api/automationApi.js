import { fetchArray, request } from './client'

export const fetchAutomations = () => fetchArray('/api/automations')

export const updateAutomation = (id, payload) =>
  request(`/api/automations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
