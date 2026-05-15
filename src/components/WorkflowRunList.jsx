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

function WorkflowRunList({ runs, isLoading, errorMessage }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">Workflow Runs</p>
          <h2 className="card-title">Status Workflow</h2>
        </div>
        <span className="count-badge">{runs.length}</span>
      </div>

      {isLoading ? (
        <div className="empty-state">Memuat status workflow...</div>
      ) : errorMessage ? (
        <div className="empty-state empty-state-error">{errorMessage}</div>
      ) : runs.length === 0 ? (
        <div className="empty-state">Belum ada workflow yang berjalan.</div>
      ) : (
        <ul className="list">
          {runs.map(run => (
            <li key={run.id} className="list-item workflow-item">
              <div className="workflow-main">
                <p className="item-title">{run.workflow_name || '-'}</p>
                {run.error_message ? (
                  <span className="meta-line error-text">{run.error_message}</span>
                ) : null}
              </div>
              <div className="workflow-meta">
                <span className={`status-pill ${normalizeStatusClass(run.status)}`}>
                  {run.status || 'unknown'}
                </span>
                <span className="meta-line">Mulai: {formatDate(run.started_at)}</span>
                <span className="meta-line">Selesai: {formatDate(run.finished_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default WorkflowRunList
