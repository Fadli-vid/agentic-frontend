import { useCallback, useEffect, useState } from 'react'
import { fetchAutomations, updateAutomation } from '../services/api'

export function useAutomations() {
  const [automations, setAutomations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchAutomations()
      setAutomations(data)
    } catch (err) {
      console.error('Failed to load automations:', err)
      setError(err?.message || 'Gagal memuat automasi.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const toggleAutomation = useCallback(async (id, nextValue) => {
    setError('')
    const previous = automations
    setAutomations(prev =>
      prev.map(a => a.id === id ? { ...a, is_enabled: nextValue } : a)
    )
    try {
      await updateAutomation(id, { is_enabled: nextValue })
    } catch (err) {
      console.error('Failed to toggle automation:', err)
      setError(err?.message || 'Gagal memperbarui automasi.')
      setAutomations(previous)
    }
  }, [automations])

  const enabledCount = automations.filter(a => Boolean(a.is_enabled)).length

  return { automations, isLoading, error, toggleAutomation, refresh, enabledCount }
}
