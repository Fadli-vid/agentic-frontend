import { useCallback, useEffect, useState } from 'react'
import { fetchTasks, fetchTaskStatistics, updateTask, updateTaskStatus, deleteTask, createTask } from '../services/api/taskApi'

export function useTasks(initialFilters = {}) {
  const [tasks, setTasks] = useState([])
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [statistics, setStatistics] = useState(null)
  const [filters, setFilters] = useState(initialFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async (page = 1) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetchTasks({ ...filters, page })
      if (response.success) {
        setTasks(response.data.data)
        setPagination(response.data.meta)
      } else {
        throw new Error(response.message)
      }
    } catch (err) {
      console.error('Failed to load tasks:', err)
      setError(err?.message || 'Gagal memuat daftar tugas.')
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const loadStatistics = useCallback(async () => {
    try {
      const response = await fetchTaskStatistics()
      if (response.success) {
        setStatistics(response.data)
      }
    } catch (err) {
      console.error('Failed to load statistics:', err)
    }
  }, [])

  useEffect(() => {
    refresh()
    loadStatistics()
  }, [refresh, loadStatistics])

  const handleUpdateStatus = useCallback(async (id, newStatus) => {
    setError('')
    const previous = tasks
    
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task
        return { ...task, status: newStatus, is_completed: newStatus === 'completed' }
      })
    )

    try {
      await updateTaskStatus(id, newStatus)
      loadStatistics()
    } catch (err) {
      console.error('Failed to update status:', err)
      setError(err?.message || 'Gagal memperbarui status tugas.')
      setTasks(previous)
    }
  }, [tasks, loadStatistics])

  const handleCreateTask = useCallback(async (data) => {
    // Optimistic ID just for rendering temporarily
    const tempId = Date.now()
    const optimisticTask = { ...data, id: tempId, created_at: new Date().toISOString() }
    
    setTasks(prev => [optimisticTask, ...prev])
    
    try {
      const response = await createTask(data)
      if (response.success) {
        // Replace temp task with actual task
        setTasks(prev => prev.map(t => t.id === tempId ? response.data : t))
        loadStatistics()
        return response.data
      }
      throw new Error(response.message)
    } catch (err) {
      console.error('Failed to create task:', err)
      // Rollback
      setTasks(prev => prev.filter(t => t.id !== tempId))
      throw err
    }
  }, [loadStatistics])

  const handleUpdateTask = useCallback(async (id, data) => {
    const previous = tasks
    
    setTasks(prev => prev.map(task => {
      if (task.id !== id) return task
      return { ...task, ...data }
    }))
    
    try {
      const response = await updateTask(id, data)
      if (response.success) {
        setTasks(prev => prev.map(task => task.id === id ? response.data : task))
        loadStatistics()
        return response.data
      }
      throw new Error(response.message)
    } catch (err) {
      console.error('Failed to update task:', err)
      // Rollback
      setTasks(previous)
      throw err
    }
  }, [tasks, loadStatistics])

  const removeTask = useCallback(async (id) => {
    setError('')
    const previous = tasks

    setTasks(prev => prev.filter(t => t.id !== id))

    try {
      await deleteTask(id)
      refresh()
      loadStatistics()
    } catch (err) {
      console.error('Failed to delete task:', err)
      setError(err?.message || 'Gagal menghapus tugas.')
      setTasks(previous)
    }
  }, [tasks, refresh, loadStatistics])

  return {
    tasks,
    pagination,
    statistics,
    isLoading,
    error,
    filters,
    setFilters,
    refresh,
    handleUpdateStatus,
    handleCreateTask,
    handleUpdateTask,
    removeTask
  }
}
