import PixelCard from '../cards/PixelCard'

function StudyWidget({ activePlans = [] }) {
  return (
    <PixelCard eyebrow="Study" title="Belajar Hari Ini" sticker="Plan" stickerTone="sky">
      {activePlans.length === 0 ? (
        <div className="empty-state">Belum ada rencana belajar.</div>
      ) : (
        <div className="study-timeline">
          {activePlans.slice(0, 3).map((plan, i) => (
            <div key={plan.id || i} className="study-block">
              <span className="time-pill">{plan.subject}</span>
              <div>
                <p className="study-title">{plan.description || plan.subject}</p>
                <p className="study-tag">{plan.status || 'active'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </PixelCard>
  )
}
export default StudyWidget
