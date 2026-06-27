import { fetchArray, request } from './client'

export const fetchTasks = () => fetchArray('/api/tasks')

export const updateTaskStatus = (id, isCompleted) =>
  request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ is_completed: isCompleted }),
  })

export const deleteTask = (id) =>
  request(`/api/tasks/${id}`, { method: 'DELETE' })
