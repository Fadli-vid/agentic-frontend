import PixelCard from '../cards/PixelCard'
import ProgressBar from '../shared/ProgressBar'

function AnalyticsWidget({ score = null }) {
  const value = score?.score || 0
  return (
    <PixelCard eyebrow="Analytics" title="Skor Produktivitas" sticker={`${Math.round(value)}%`} stickerTone="mint">
      <ProgressBar value={value} tone="mint" />
      <p className="summary-footnote mt-2">
        Berdasarkan tugas, kebiasaan, dan target minggu ini.
      </p>
    </PixelCard>
  )
}
export default AnalyticsWidget
