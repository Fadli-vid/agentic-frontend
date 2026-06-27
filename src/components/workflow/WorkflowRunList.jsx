import EmptyState from '../shared/EmptyState'
import StatusPill from '../shared/StatusPill'
import PixelCard from '../cards/PixelCard'
import { formatDate } from '../../lib/formatters'

function WorkflowRunList({ runs, isLoading, errorMessage }) {
  return (
    <PixelCard eyebrow="Workflow Runs" title="Status Workflow" sticker={`${runs.length}`} stickerTone="sky">
      {isLoading ? (
        <EmptyState loading />
      ) : errorMessage ? (
        <EmptyState error={errorMessage} />
      ) : runs.length === 0 ? (
        <EmptyState message="Belum ada workflow yang berjalan." />
      ) : (
        <ul className="list">
          {runs.map(run => (
            <li key={run.id} className="list-item workflow-item" style={{ background: 'var(--surface-sunken)', padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div className="workflow-main" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p className="item-title" style={{ fontWeight: 'bold' }}>{run.workflow_name || '-'}</p>
                {run.error_message && <span className="meta-line error-text" style={{ color: 'var(--accent-coral)', fontSize: '0.85rem' }}>{run.error_message}</span>}
              </div>
              <div className="workflow-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                <StatusPill status={run.status} />
                <span className="meta-line">Mulai: {formatDate(run.started_at)}</span>
                {run.finished_at && <span className="meta-line">Selesai: {formatDate(run.finished_at)}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </PixelCard>
  )
}

export default WorkflowRunList
