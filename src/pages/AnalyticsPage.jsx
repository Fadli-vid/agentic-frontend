import { useAnalytics } from '../hooks/useAnalytics'
import PixelCard from '../components/cards/PixelCard'
import ProgressBar from '../components/shared/ProgressBar'
import EmptyState from '../components/shared/EmptyState'

function AnalyticsPage() {
  const { score, isLoading } = useAnalytics()
  const value = score?.score || 0

  return (
    <div className="page-analytics">
      <PixelCard eyebrow="Productivity Score" title="Skor Produktivitas" sticker={`${Math.round(value)}%`} stickerTone="mint">
        {isLoading ? <EmptyState loading /> : (
          <>
            <ProgressBar value={value} tone="mint" />
            <p className="summary-footnote mt-2">
              Berdasarkan tugas, kebiasaan, dan target minggu ini.
            </p>
          </>
        )}
      </PixelCard>

      <PixelCard eyebrow="Weekly Report" title="Laporan Mingguan" sticker="Ready" stickerTone="sky">
        <div className="bar-chart">
          {[40, 65, 30, 85, 50, 90, 75].map((h, i) => (
            <div key={i} className="bar-chart-bar" style={{ height: `${h}%` }} title={`Hari ${i+1}`} />
          ))}
        </div>
      </PixelCard>

      <PixelCard eyebrow="AI Insights" title="Insight AI" sticker="Soon" stickerTone="yellow">
        <EmptyState message="AI insights akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Habit Trends" title="Tren Kebiasaan" sticker="Ready" stickerTone="mint">
        <div className="habit-trends">
          {['Membaca', 'Olahraga', 'Meditasi'].map((habit, i) => (
            <div key={i} className="habit-trend-row">
              <span className="habit-trend-label">{habit}</span>
              <div className="habit-trend-track">
                <div className="habit-trend-fill" style={{ width: `${[80, 45, 65][i]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </PixelCard>

      <PixelCard eyebrow="Goal Trends" title="Tren Target" sticker="Soon" stickerTone="lavender">
        <EmptyState message="Tren target akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Study Trends" title="Tren Belajar" sticker="Soon" stickerTone="peach">
        <EmptyState message="Tren belajar akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Budget Trends" title="Tren Budget" sticker="Soon" stickerTone="coral">
        <EmptyState message="Tren budget akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Monthly Report" title="Laporan Bulanan" sticker="Soon" stickerTone="sky">
        <EmptyState message="Laporan bulanan akan segera hadir." />
      </PixelCard>
    </div>
  )
}

export default AnalyticsPage
