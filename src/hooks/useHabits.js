import { useCallback, useEffect, useState } from 'react'
import { fetchHabits } from '../services/api'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchHabits()
      setHabits(data)
    } catch (err) {
      console.error('Failed to load habits:', err)
      setError(err?.message || 'Gagal memuat kebiasaan.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const activeHabits = habits.filter(h => h.is_active !== false)
  const bestStreak = activeHabits.reduce((max, h) => Math.max(max, h.current_streak || 0), 0)

  return { habits, activeHabits, isLoading, error, refresh, bestStreak }
}
