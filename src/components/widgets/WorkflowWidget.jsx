import PixelCard from '../cards/PixelCard'
import StatCard from '../cards/StatCard'

function WorkflowWidget({ runs = [] }) {
  const completed = runs.filter(r => r.status === 'completed').length
  const failed = runs.filter(r => r.status === 'failed').length
  return (
    <PixelCard eyebrow="Workflows" title="Status Workflow" sticker={`${runs.length}`} stickerTone="sky">
      <div className="stat-grid">
        <StatCard label="Selesai" value={completed} tone="mint" />
        <StatCard label="Gagal" value={failed} tone="coral" />
      </div>
    </PixelCard>
  )
}
export default WorkflowWidget
