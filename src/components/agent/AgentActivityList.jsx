import EmptyState from '../shared/EmptyState'
import StatusPill from '../shared/StatusPill'
import { formatDate } from '../../lib/formatters'

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
        <EmptyState loading />
      ) : errorMessage ? (
        <EmptyState error={errorMessage} />
      ) : events.length === 0 ? (
        <EmptyState message="Belum ada aktivitas agent." />
      ) : (
        <ul className="list">
          {events.map(event => (
            <li key={event.id} className="list-item agent-event-item">
              <div className="agent-event-main">
                <p className="item-title">{event.message || '(tanpa pesan)'}</p>
                <span className="meta-line">Action: {event.action || '-'}</span>
                {event.error_message && <span className="meta-line error-text">{event.error_message}</span>}
              </div>
              <div className="agent-event-meta">
                <StatusPill status={event.status} />
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
