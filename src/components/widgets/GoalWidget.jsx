import PixelCard from '../cards/PixelCard'
import ProgressBar from '../shared/ProgressBar'

function GoalWidget({ activeGoals = [] }) {
  return (
    <PixelCard eyebrow="Goals" title="Target Aktif" sticker={`${activeGoals.length}`} stickerTone="lavender">
      {activeGoals.length === 0 ? (
        <div className="empty-state">Belum ada target.</div>
      ) : (
        <div className="goal-list">
          {activeGoals.slice(0, 3).map(goal => {
            const progress = goal.target_value ? Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)) : 0
            return (
              <div key={goal.id} className="goal-item">
                <div className="goal-top">
                  <span className="goal-label">{goal.title}</span>
                  <span className="goal-target">{progress}%</span>
                </div>
                <ProgressBar value={progress} tone="lavender" />
              </div>
            )
          })}
        </div>
      )}
    </PixelCard>
  )
}
export default GoalWidget
