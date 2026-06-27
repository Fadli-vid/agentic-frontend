import PixelCard from '../cards/PixelCard'
import StatCard from '../cards/StatCard'

function HabitWidget({ activeHabits = [], bestStreak = 0 }) {
  return (
    <PixelCard eyebrow="Habits" title="Kebiasaan" sticker="Streak" stickerTone="mint">
      <div className="stat-grid">
        <StatCard label="Aktif" value={activeHabits.length} tone="mint" />
        <StatCard label="Best Streak" value={`${bestStreak} hari`} tone="lavender" />
      </div>
    </PixelCard>
  )
}
export default HabitWidget
