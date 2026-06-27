import { useCallback, useEffect, useState } from 'react'
import { fetchExpenses, deleteExpense } from '../services/api'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchExpenses()
      setExpenses(data)
    } catch (err) {
      console.error('Failed to load expenses:', err)
      setError(err?.message || 'Gagal memuat pengeluaran.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const removeExpense = useCallback(async (id) => {
    setError('')
    const previous = expenses
    setExpenses(prev => prev.filter(e => e.id !== id))
    try {
      await deleteExpense(id)
    } catch (err) {
      console.error('Failed to delete expense:', err)
      setError(err?.message || 'Gagal menghapus pengeluaran.')
      setExpenses(previous)
    }
  }, [expenses])

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)

  return { expenses, isLoading, error, removeExpense, refresh, total }
}
