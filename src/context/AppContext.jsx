import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard')

  return (
    <AppContext.Provider value={{ currentPageTitle, setCurrentPageTitle }}>
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
