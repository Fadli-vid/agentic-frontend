const normalizeStatusClass = (status) => {
  if (!status) return 'status-unknown'
  return `status-${String(status).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function AutomationList({ automations, isLoading, errorMessage, onToggle }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">Automations</p>
          <h2 className="card-title">Automasi Aktif</h2>
        </div>
        <span className="count-badge">{automations.length}</span>
      </div>

      {isLoading ? (
        <div className="empty-state">Memuat automasi...</div>
      ) : errorMessage ? (
        <div className="empty-state empty-state-error">{errorMessage}</div>
      ) : automations.length === 0 ? (
        <div className="empty-state">Belum ada automasi.</div>
      ) : (
        <ul className="list">
          {automations.map(automation => {
            const isEnabled = Boolean(automation.is_enabled)
            return (
              <li key={automation.id} className="list-item automation-item">
                <div className="automation-main">
                  <p className="item-title">{automation.name || '-'}</p>
                  <span className="meta-line">
                    {automation.description || 'Belum ada deskripsi.'}
                  </span>
                </div>
                <div className="automation-meta">
                  <span
                    className={`status-pill ${normalizeStatusClass(isEnabled ? 'enabled' : 'disabled')}`}
                  >
                    {isEnabled ? 'enabled' : 'disabled'}
                  </span>
                  <button
                    className={`toggle-button ${isEnabled ? 'is-enabled' : ''}`}
                    type="button"
                    onClick={() => onToggle(automation.id, !isEnabled)}
                  >
                    {isEnabled ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default AutomationList
