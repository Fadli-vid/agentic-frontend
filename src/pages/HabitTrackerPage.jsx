import { useHabits } from '../hooks/useHabits'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'
import EmptyState from '../components/shared/EmptyState'

function HabitTrackerPage() {
  const { activeHabits, bestStreak, isLoading } = useHabits()

  return (
    <div className="page-habits">
      <PixelCard eyebrow="Habit Tracker" title="Pelacak Kebiasaan" sticker="Streak" stickerTone="mint">
        <div className="stat-grid">
          <StatCard label="Aktif" value={activeHabits.length} tone="mint" />
          <StatCard label="Best Streak" value={`${bestStreak} hari`} tone="lavender" />
        </div>
      </PixelCard>

      <PixelCard eyebrow="Today" title="Kebiasaan Hari Ini" stickerTone="sky">
        {isLoading ? <EmptyState loading /> : activeHabits.length === 0 ? (
          <EmptyState message="Belum ada kebiasaan. Tambahkan lewat Telegram." />
        ) : (
          <div className="habit-list">
            {activeHabits.map(habit => (
              <div key={habit.id || habit.name} className="habit-row">
                <span className="habit-label">{habit.name}</span>
                <div className="habit-dots" aria-hidden="true">
                  {Array.from({ length: habit.target_count || 7 }).map((_, i) => (
                    <span key={i} className={`habit-dot ${i < (habit.current_streak || 0) ? 'is-filled' : ''}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </PixelCard>

      {/* TODO: Pixel heatmap placeholder */}
      <PixelCard eyebrow="Heatmap" title="Peta Konsistensi" sticker="Soon" stickerTone="peach">
        <EmptyState message="Pixel heatmap akan segera hadir." />
      </PixelCard>
    </div>
  )
}

export default HabitTrackerPage
