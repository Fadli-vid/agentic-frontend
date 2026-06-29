import { request } from './client'

export const fetchTasks = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return request(`/api/tasks${query ? `?${query}` : ''}`)
}

export const fetchTaskStatistics = () => request('/api/tasks/statistics')

export const createTask = (data) =>
  request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const updateTask = (id, data) =>
  request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

export const updateTaskStatus = (id, status) => updateTask(id, { status })

export const deleteTask = (id) => request(`/api/tasks/${id}`, { method: 'DELETE' })
