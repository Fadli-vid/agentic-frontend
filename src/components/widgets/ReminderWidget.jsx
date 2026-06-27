import PixelCard from '../cards/PixelCard'
import { formatDate } from '../../lib/formatters'

function ReminderWidget({ reminders = [] }) {
  const upcoming = reminders.slice(0, 3)
  return (
    <PixelCard eyebrow="Reminders" title="Pengingat Terdekat" sticker={`${reminders.length}`} stickerTone="yellow">
      {upcoming.length === 0 ? (
        <div className="empty-state">Belum ada pengingat.</div>
      ) : (
        <div className="summary-list">
          {upcoming.map(r => (
            <div key={r.id} className="memory-item">
              <span className="memory-time">{formatDate(r.remind_at)}</span>
              <span className="memory-text">{r.title || '-'}</span>
            </div>
          ))}
        </div>
      )}
    </PixelCard>
  )
}
export default ReminderWidget
