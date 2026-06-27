import PixelCard from '../cards/PixelCard'
import { formatDate } from '../../lib/formatters'

function AgentWidget({ events = [] }) {
  const latest = events.slice(0, 3)
  return (
    <PixelCard eyebrow="Agent" title="Aktivitas Terbaru" sticker={`${events.length}`} stickerTone="peach">
      {latest.length === 0 ? (
        <div className="empty-state">Belum ada aktivitas.</div>
      ) : (
        <div className="memory-list">
          {latest.map(e => (
            <div key={e.id} className="memory-item">
              <span className="memory-time">{formatDate(e.created_at)}</span>
              <span className="memory-text">{e.message || e.action || '-'}</span>
            </div>
          ))}
        </div>
      )}
    </PixelCard>
  )
}
export default AgentWidget
