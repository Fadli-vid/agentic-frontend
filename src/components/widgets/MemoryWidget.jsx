import PixelCard from '../cards/PixelCard'

function MemoryWidget({ recent = [] }) {
  return (
    <PixelCard eyebrow="Memory" title="Memori Terbaru" sticker="Memory" stickerTone="lavender">
      {recent.length === 0 ? (
        <div className="empty-state">Belum ada memori.</div>
      ) : (
        <div className="memory-list">
          {recent.slice(0, 3).map((m, i) => (
            <div key={m.id || i} className="memory-item">
              <span className="memory-time">{m.category || 'note'}</span>
              <span className="memory-text">{m.title || m.content || '-'}</span>
            </div>
          ))}
        </div>
      )}
    </PixelCard>
  )
}
export default MemoryWidget
