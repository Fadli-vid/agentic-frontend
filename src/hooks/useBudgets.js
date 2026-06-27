import { useCallback, useEffect, useState } from 'react'
import { fetchBudgets } from '../services/api'

export function useBudgets() {
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchBudgets()
      setBudgets(data)
    } catch (err) {
      console.error('Failed to load budgets:', err)
      setError(err?.message || 'Gagal memuat budget.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const activeBudgets = budgets.filter(b => b.is_active !== false)

  return { budgets, activeBudgets, isLoading, error, refresh }
}
