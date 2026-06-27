import EmptyState from '../shared/EmptyState'
import StatusPill from '../shared/StatusPill'
import { formatDate } from '../../lib/formatters'

function ReminderList({ title = 'Pengingat Aktif', reminders, isLoading, errorMessage }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">Reminders</p>
          <h2 className="card-title">{title}</h2>
        </div>
        <span className="count-badge">{reminders.length}</span>
      </div>

      {isLoading ? (
        <EmptyState loading />
      ) : errorMessage ? (
        <EmptyState error={errorMessage} />
      ) : reminders.length === 0 ? (
        <EmptyState message="Belum ada pengingat aktif." />
      ) : (
        <ul className="list">
          {reminders.map(reminder => (
            <li key={reminder.id} className="list-item reminder-item">
              <div className="reminder-main">
                <p className="item-title">{reminder.title || '-'}</p>
                <span className="meta-line">Channel: {reminder.channel || '-'}</span>
              </div>
              <div className="reminder-meta">
                <StatusPill status={reminder.status} />
                <span className="meta-line">{formatDate(reminder.remind_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ReminderList
