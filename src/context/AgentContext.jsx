import { createContext, useCallback, useContext, useState } from 'react'

const AgentContext = createContext(null)

export function AgentProvider({ children }) {
  const [aiStatus, setAiStatus] = useState('online')
  const [recentCommands, setRecentCommands] = useState([])

  const addCommand = useCallback((command) => {
    setRecentCommands(prev => [command, ...prev].slice(0, 10))
  }, [])

  return (
    <AgentContext.Provider value={{ aiStatus, setAiStatus, recentCommands, addCommand }}>
      {children}
    </AgentContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAgent() {
  const context = useContext(AgentContext)
  if (!context) throw new Error('useAgent must be used within AgentProvider')
  return context
}
