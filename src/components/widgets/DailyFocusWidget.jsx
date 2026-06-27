import PixelCard from '../cards/PixelCard'
import PixelMascot from '../shared/PixelMascot'
import { getTodayLabel } from '../../lib/formatters'

function DailyFocusWidget() {
  return (
    <PixelCard className="mascot-card">
      <p className="header-eyebrow">Selamat {getTodayLabel()}</p>
      <div className="mascot-status">
        <span className="status-dot" aria-hidden="true" />
        Mode temani aktif
      </div>
      <PixelMascot className="pixel-mascot" />
      <div className="mascot-copy">
        <p className="mascot-title">Kobi Pixel</p>
        <p className="mascot-subtitle">Teman digital yang ceria dan siap ngajak fokus.</p>
        <div className="mascot-tags">
          <span className="sticker tone-mint">Focus</span>
          <span className="sticker tone-peach">Cheer</span>
        </div>
      </div>
    </PixelCard>
  )
}
export default DailyFocusWidget
