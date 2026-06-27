import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from '../context/AppContext'
import { AgentProvider } from '../context/AgentContext'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import CommandBar from '../components/layout/CommandBar'
import { NAVIGATION } from '../constants/navigation'

function LayoutInner() {
  const location = useLocation()
  const { setCurrentPageTitle } = useApp()

  useEffect(() => {
    const current = NAVIGATION.find(n => n.path === location.pathname)
    setCurrentPageTitle(current?.label || 'Kobi')
  }, [location.pathname, setCurrentPageTitle])

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="main-content">
          <Outlet />
        </main>
        <CommandBar />
      </div>
    </div>
  )
}

function AppLayout() {
  return (
    <AppProvider>
      <AgentProvider>
        <LayoutInner />
      </AgentProvider>
    </AppProvider>
  )
}

export default AppLayout
