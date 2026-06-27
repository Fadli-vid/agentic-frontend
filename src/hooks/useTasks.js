import { useCallback, useEffect, useState } from 'react'
import { fetchTasks, updateTaskStatus, deleteTask } from '../services/api'

/**
 * Hook for task data, loading state, and mutation handlers.
 * Moves all task logic from the old App.jsx.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (err) {
      console.error('Failed to load tasks:', err)
      setError(err?.message || 'Gagal memuat daftar tugas.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const toggleTask = useCallback(async (id) => {
    setError('')
    let nextIsCompleted = null
    const previous = tasks

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task
        nextIsCompleted = !task.is_completed
        return { ...task, is_completed: nextIsCompleted }
      })
    )

    if (nextIsCompleted === null) return

    try {
      await updateTaskStatus(id, nextIsCompleted)
    } catch (err) {
      console.error('Failed to toggle task:', err)
      setError(err?.message || 'Gagal memperbarui status tugas.')
      setTasks(previous)
    }
  }, [tasks])

  const removeTask = useCallback(async (id) => {
    setError('')
    const previous = tasks

    setTasks(prev => prev.filter(t => t.id !== id))

    try {
      await deleteTask(id)
    } catch (err) {
      console.error('Failed to delete task:', err)
      setError(err?.message || 'Gagal menghapus tugas.')
      setTasks(previous)
    }
  }, [tasks])

  const completedCount = tasks.filter(t => Boolean(t.is_completed)).length

  return { tasks, isLoading, error, toggleTask, removeTask, refresh, completedCount }
}
