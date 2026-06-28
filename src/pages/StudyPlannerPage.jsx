import { useStudyPlans } from '../hooks/useStudyPlans'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'
import EmptyState from '../components/shared/EmptyState'
import PixelPill from '../components/shared/PixelPill'

function StudyPlannerPage() {
  const { activePlans, isLoading } = useStudyPlans()

  return (
    <div className="page-study">
      <PixelCard eyebrow="Study Planner" title="Perencana Belajar" sticker={`${activePlans.length}`} stickerTone="sky">
        <div className="stat-grid">
          <StatCard label="Aktif" value={activePlans.length} tone="sky" />
        </div>
      </PixelCard>

      <PixelCard eyebrow="Active Plans" title="Rencana Belajar" stickerTone="peach">
        {isLoading ? <EmptyState loading /> : activePlans.length === 0 ? (
          <EmptyState message="Belum ada rencana belajar. Tambahkan lewat Telegram." />
        ) : (
          <div className="study-timeline has-line">
            {activePlans.map(plan => (
              <div key={plan.id} className="study-block">
                <span className="study-block-dot" />
                <div className="study-block-header">
                  <PixelPill tone="sky">{plan.subject}</PixelPill>
                  <span className="study-schedule">{plan.schedule || 'Setiap Hari'}</span>
                </div>
                <div className="study-block-body">
                  <p className="study-title">{plan.description || plan.subject}</p>
                  <div className="study-block-footer">
                    <p className="study-tag">Status: {plan.status}</p>
                    <p className="study-tag">{plan.duration ? `${plan.duration} Menit` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PixelCard>
    </div>
  )
}

export default StudyPlannerPage
