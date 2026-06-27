import { useCallback, useEffect, useState } from 'react'
import { fetchWorkflowRuns } from '../services/api'

export function useWorkflowRuns() {
  const [runs, setRuns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchWorkflowRuns()
      setRuns(data)
    } catch (err) {
      console.error('Failed to load workflow runs:', err)
      setError(err?.message || 'Gagal memuat workflow runs.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  return { runs, isLoading, error, refresh }
}
