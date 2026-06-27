import { useCallback, useEffect, useState } from 'react'
import { fetchMemories, searchMemories } from '../services/api'

export function useMemories() {
  const [memories, setMemories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await fetchMemories()
      setMemories(data)
    } catch (err) {
      console.error('Failed to load memories:', err)
      setError(err?.message || 'Gagal memuat memori.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  const search = useCallback(async (query) => {
    if (!query?.trim()) {
      setSearchResults(null)
      return
    }
    try {
      const results = await searchMemories(query)
      setSearchResults(results)
    } catch (err) {
      console.error('Failed to search memories:', err)
    }
  }, [])

  const clearSearch = useCallback(() => setSearchResults(null), [])

  const pinned = memories.filter(m => (m.importance || 0) >= 8)
  const preferences = memories.filter(m => m.category === 'preference')
  const knowledge = memories.filter(m => m.category === 'fact')
  const recent = [...memories].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10)

  return {
    memories, isLoading, error, refresh,
    search, searchResults, clearSearch,
    pinned, preferences, knowledge, recent,
  }
}
