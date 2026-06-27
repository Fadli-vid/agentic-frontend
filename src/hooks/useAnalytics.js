import { useCallback, useEffect, useState } from 'react'
import { fetchDashboard, fetchProductivityScore } from '../services/api'

export function useAnalytics() {
  const [dashboard, setDashboard] = useState(null)
  const [score, setScore] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const [dashData, scoreData] = await Promise.all([
        fetchDashboard(),
        fetchProductivityScore(),
      ])
      setDashboard(dashData)
      setScore(scoreData)
    } catch (err) {
      console.error('Failed to load analytics:', err)
      setError(err?.message || 'Gagal memuat analytics.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  return { dashboard, score, isLoading, error, refresh }
}
