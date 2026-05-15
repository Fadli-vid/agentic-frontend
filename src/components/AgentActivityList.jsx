const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return dateFormatter.format(date)
}

const normalizeStatusClass = (status) => {
  if (!status) return 'status-unknown'
  return `status-${String(status).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function AgentActivityList({ events, isLoading, errorMessage }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">Agent Activity</p>
          <h2 className="card-title">Aktivitas Agent</h2>
        </div>
        <span className="count-badge">{events.length}</span>
      </div>

      {isLoading ? (
        <div className="empty-state">Memuat aktivitas agent...</div>
      ) : errorMessage ? (
        <div className="empty-state empty-state-error">{errorMessage}</div>
      ) : events.length === 0 ? (
        <div className="empty-state">Belum ada aktivitas agent.</div>
      ) : (
        <ul className="list">
          {events.map(event => (
            <li key={event.id} className="list-item agent-event-item">
              <div className="agent-event-main">
                <p className="item-title">{event.message || '(tanpa pesan)'}</p>
                <span className="meta-line">Action: {event.action || '-'}</span>
                {event.error_message ? (
                  <span className="meta-line error-text">{event.error_message}</span>
                ) : null}
              </div>
              <div className="agent-event-meta">
                <span className={`status-pill ${normalizeStatusClass(event.status)}`}>
                  {event.status || 'unknown'}
                </span>
                <span className="meta-line">{formatDate(event.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AgentActivityList
