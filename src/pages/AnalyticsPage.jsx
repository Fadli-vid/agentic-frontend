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
            <p className="summary-footnote" style={{ marginTop: 8 }}>
              Berdasarkan tugas, kebiasaan, dan target minggu ini.
            </p>
          </>
        )}
      </PixelCard>

      <PixelCard eyebrow="Weekly Report" title="Laporan Mingguan" sticker="Ready" stickerTone="sky">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px', padding: '16px', background: 'var(--surface-sunken)', borderRadius: '4px', border: '1px solid var(--border)' }}>
          {[40, 65, 30, 85, 50, 90, 75].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--accent-sky)', borderRadius: '2px 2px 0 0', border: '1px solid var(--border)', borderBottom: 'none' }} title={`Hari ${i+1}`} />
          ))}
        </div>
      </PixelCard>

      <PixelCard eyebrow="AI Insights" title="Insight AI" sticker="Soon" stickerTone="yellow">
        <EmptyState message="AI insights akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Habit Trends" title="Tren Kebiasaan" sticker="Ready" stickerTone="mint">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'var(--surface-sunken)', borderRadius: '4px', border: '1px solid var(--border)' }}>
          {['Membaca', 'Olahraga', 'Meditasi'].map((habit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '80px', fontSize: '0.8rem', fontWeight: 'bold' }}>{habit}</span>
              <div style={{ flex: 1, height: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${[80, 45, 65][i]}%`, height: '100%', background: 'var(--accent-mint)' }} />
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
