import { useCallback, useEffect, useState } from 'react'
import { fetchGoals } from '../services/api'

export function useGoals() {
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchGoals()
      setGoals(data)
    } catch (err) {
      console.error('Failed to load goals:', err)
      setError(err?.message || 'Gagal memuat target.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const activeGoals = goals.filter(g => g.status === 'active')

  return { goals, activeGoals, isLoading, error, refresh }
}
