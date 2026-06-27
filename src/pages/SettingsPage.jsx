import PixelCard from '../components/cards/PixelCard'
import EmptyState from '../components/shared/EmptyState'

function SettingsPage() {
  return (
    <div className="page-settings">
      <PixelCard eyebrow="Settings" title="Pengaturan" sticker="Config" stickerTone="yellow">
        <p className="summary-footnote">Kelola preferensi dan konfigurasi Kobi.</p>
      </PixelCard>

      <PixelCard eyebrow="Profile" title="Profil" stickerTone="sky">
        <EmptyState message="Pengaturan profil akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Telegram" title="Integrasi Telegram" stickerTone="sky">
        <EmptyState message="Konfigurasi Telegram akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Gemini" title="Konfigurasi Gemini AI" stickerTone="lavender">
        <EmptyState message="Konfigurasi Gemini akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Theme" title="Tema Tampilan" stickerTone="peach">
        <EmptyState message="Pengaturan tema akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="Notifications" title="Notifikasi" stickerTone="yellow">
        <EmptyState message="Pengaturan notifikasi akan segera hadir." />
      </PixelCard>

      <PixelCard eyebrow="API Status" title="Status API" stickerTone="mint">
        <EmptyState message="Status API akan segera hadir." />
      </PixelCard>
    </div>
  )
}

export default SettingsPage
