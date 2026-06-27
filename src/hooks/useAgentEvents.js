import { useCallback, useEffect, useState } from 'react'
import { fetchAgentEvents } from '../services/api'

export function useAgentEvents() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchAgentEvents()
      setEvents(data)
    } catch (err) {
      console.error('Failed to load agent events:', err)
      setError(err?.message || 'Gagal memuat aktivitas agent.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  return { events, isLoading, error, refresh }
}
