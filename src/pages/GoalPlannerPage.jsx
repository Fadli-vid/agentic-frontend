import { useGoals } from '../hooks/useGoals'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'
import ProgressBar from '../components/shared/ProgressBar'
import EmptyState from '../components/shared/EmptyState'
import PixelPill from '../components/shared/PixelPill'

function GoalPlannerPage() {
  const { goals, activeGoals, isLoading } = useGoals()
  const completed = goals.filter(g => g.status === 'completed')

  return (
    <div className="page-goals">
      <PixelCard eyebrow="Goal Planner" title="Perencana Target" sticker={`${activeGoals.length}`} stickerTone="lavender">
        <div className="stat-grid">
          <StatCard label="Aktif" value={activeGoals.length} tone="lavender" />
          <StatCard label="Selesai" value={completed.length} tone="mint" />
        </div>
      </PixelCard>

      <PixelCard eyebrow="Active Goals" title="Target Aktif" stickerTone="sky">
        {isLoading ? <EmptyState loading /> : activeGoals.length === 0 ? (
          <EmptyState message="Belum ada target. Tambahkan lewat Telegram." />
        ) : (
          <div className="goal-list">
            {activeGoals.map(goal => {
              const progress = goal.target_value ? Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)) : 0
              const tone = progress >= 100 ? 'mint' : progress > 50 ? 'sky' : 'peach'
              return (
                <div key={goal.id} className="goal-item">
                  <div className="goal-top">
                    <div className="inline">
                      <span className="goal-label">{goal.title}</span>
                      {goal.priority && <PixelPill tone={goal.priority === 'high' ? 'coral' : 'yellow'}>{goal.priority}</PixelPill>}
                    </div>
                    <span className="goal-target">{goal.due_date ? `Deadline: ${goal.due_date}` : 'Tanpa deadline'}</span>
                  </div>
                  <ProgressBar value={progress} tone={tone} />
                  <div className="goal-progress-footer">
                    <span>{goal.current_value} / {goal.target_value}</span>
                    <strong>{progress}%</strong>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </PixelCard>
    </div>
  )
}

export default GoalPlannerPage
