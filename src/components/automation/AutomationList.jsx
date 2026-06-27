import EmptyState from '../shared/EmptyState'
import StatusPill from '../shared/StatusPill'

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
        <EmptyState loading />
      ) : errorMessage ? (
        <EmptyState error={errorMessage} />
      ) : automations.length === 0 ? (
        <EmptyState message="Belum ada automasi." />
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
                  <StatusPill status={isEnabled ? 'enabled' : 'disabled'} />
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
