import { NavLink } from 'react-router-dom'
import { NAVIGATION } from '../../constants/navigation'
import { useApp } from '../../context/AppContext'
import PixelMascot from '../shared/PixelMascot'

function Sidebar() {
  const { sidebarOpen } = useApp()

  return (
    <aside className={`pixel-sidebar ${sidebarOpen ? '' : 'is-collapsed'}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">
          <span className="brand-pixel" aria-hidden="true" />
          Kobi
        </div>
        <p className="brand-tag">Asisten produktivitas yang ceria</p>
      </div>

      <nav className="sidebar-nav" aria-label="Navigasi utama">
        {NAVIGATION.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}
            end={item.path === '/'}
          >
            <span className={`nav-icon ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className="status-dot" aria-hidden="true" />
          Kobi online
        </div>
        <div className="sidebar-companion">
          <PixelMascot className="pixel-mascot is-mini" />
          <div>
            <p className="companion-title">Buddy Mode</p>
            <p className="companion-subtitle">Siap bantu kamu fokus.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
