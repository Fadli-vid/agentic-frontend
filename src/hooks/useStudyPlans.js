import { useCallback, useEffect, useState } from 'react'
import { fetchStudyPlans } from '../services/api'

export function useStudyPlans() {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchStudyPlans()
      setPlans(data)
    } catch (err) {
      console.error('Failed to load study plans:', err)
      setError(err?.message || 'Gagal memuat rencana belajar.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const activePlans = plans.filter(p => p.status === 'active')

  return { plans, activePlans, isLoading, error, refresh }
}
