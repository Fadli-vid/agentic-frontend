import { createContext, useCallback, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard')

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), [])

  return (
    <AppContext.Provider value={{ sidebarOpen, toggleSidebar, currentPageTitle, setCurrentPageTitle }}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
