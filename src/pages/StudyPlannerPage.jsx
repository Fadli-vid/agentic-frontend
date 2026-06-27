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
          <div className="study-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '16px', borderLeft: '2px dashed var(--border)' }}>
            {activePlans.map(plan => (
              <div key={plan.id} className="study-block" style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '-23px', top: '4px', width: '12px', height: '12px', background: 'var(--accent-sky)', border: '2px solid var(--border)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <PixelPill tone="sky">{plan.subject}</PixelPill>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 'bold' }}>{plan.schedule || 'Setiap Hari'}</span>
                </div>
                <div style={{ background: 'var(--surface-sunken)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <p className="study-title" style={{ fontWeight: 'bold', marginBottom: '4px' }}>{plan.description || plan.subject}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="study-tag" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Status: {plan.status}</p>
                    <p className="study-tag" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{plan.duration ? `${plan.duration} Menit` : ''}</p>
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
