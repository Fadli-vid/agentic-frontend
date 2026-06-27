import PixelCard from '../cards/PixelCard'
import StatCard from '../cards/StatCard'

function TodayTasksWidget({ tasks = [], completedCount = 0 }) {
  const pending = Math.max(0, tasks.length - completedCount)
  return (
    <PixelCard eyebrow="Tasks" title="Tugas Hari Ini" sticker={`${completedCount}/${tasks.length}`} stickerTone="mint">
      <div className="stat-grid">
        <StatCard label="Selesai" value={completedCount} tone="mint" />
        <StatCard label="Menunggu" value={pending} tone="peach" />
      </div>
    </PixelCard>
  )
}
export default TodayTasksWidget
