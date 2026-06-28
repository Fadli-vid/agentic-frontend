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
            <li key={run.id} className="list-item workflow-item">
              <div className="workflow-main">
                <p className="item-title">{run.workflow_name || '-'}</p>
                {run.error_message && <span className="meta-line error-text">{run.error_message}</span>}
              </div>
              <div className="workflow-meta">
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
