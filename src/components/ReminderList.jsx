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

function ReminderList({ reminders, isLoading, errorMessage }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">Reminders</p>
          <h2 className="card-title">Pengingat Aktif</h2>
        </div>
        <span className="count-badge">{reminders.length}</span>
      </div>

      {isLoading ? (
        <div className="empty-state">Memuat pengingat...</div>
      ) : errorMessage ? (
        <div className="empty-state empty-state-error">{errorMessage}</div>
      ) : reminders.length === 0 ? (
        <div className="empty-state">Belum ada pengingat aktif.</div>
      ) : (
        <ul className="list">
          {reminders.map(reminder => (
            <li key={reminder.id} className="list-item reminder-item">
              <div className="reminder-main">
                <p className="item-title">{reminder.title || '-'}</p>
                <span className="meta-line">Channel: {reminder.channel || '-'}</span>
              </div>
              <div className="reminder-meta">
                <span className={`status-pill ${normalizeStatusClass(reminder.status)}`}>
                  {reminder.status || 'unknown'}
                </span>
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
