import { useApp } from '../../context/AppContext'
import { useAgent } from '../../context/AgentContext'

function Topbar() {
  const { currentPageTitle, toggleSidebar } = useApp()
  const { aiStatus } = useAgent()

  return (
    <header className="topbar">
      <button className="topbar-menu-btn" type="button" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <span className="topbar-menu-icon" aria-hidden="true">☰</span>
      </button>

      <div className="topbar-breadcrumb">
        <span className="topbar-crumb">Kobi</span>
        <span className="topbar-separator" aria-hidden="true">/</span>
        <span className="topbar-crumb is-current">{currentPageTitle}</span>
      </div>

      <div className="topbar-actions">
        <div className={`topbar-ai-status ${aiStatus === 'online' ? 'is-online' : ''}`}>
          <span className="status-dot" aria-hidden="true" />
          AI {aiStatus}
        </div>
      </div>
    </header>
  )
}

export default Topbar
