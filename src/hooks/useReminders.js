import { useCallback, useEffect, useState } from 'react'
import { fetchReminders } from '../services/api'

export function useReminders() {
  const [reminders, setReminders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchReminders()
      setReminders(data)
    } catch (err) {
      console.error('Failed to load reminders:', err)
      setError(err?.message || 'Gagal memuat pengingat.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  return { reminders, isLoading, error, refresh }
}
