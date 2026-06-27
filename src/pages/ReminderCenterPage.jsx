import { useMemo } from 'react'
import { useReminders } from '../hooks/useReminders'
import ReminderList from '../components/reminder/ReminderList'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'

function ReminderCenterPage() {
  const { reminders, isLoading, error } = useReminders()

  const pending = reminders.filter(r => r.status === 'pending')

  const { today, tomorrow, thisWeek, later } = useMemo(() => {
    const today = []
    const tomorrow = []
    const thisWeek = []
    const later = []
    
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    
    const tom = new Date(now)
    tom.setDate(tom.getDate() + 1)
    
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)

    reminders.forEach(r => {
      const d = new Date(r.remind_at)
      if (isNaN(d.getTime())) {
        later.push(r)
        return
      }
      
      const rDate = new Date(d)
      rDate.setHours(0, 0, 0, 0)
      
      if (rDate.getTime() === now.getTime()) {
        today.push(r)
      } else if (rDate.getTime() === tom.getTime()) {
        tomorrow.push(r)
      } else if (rDate.getTime() < nextWeek.getTime()) {
        thisWeek.push(r)
      } else {
        later.push(r)
      }
    })
    
    return { today, tomorrow, thisWeek, later }
  }, [reminders])

  return (
    <div className="page-reminders">
      <PixelCard eyebrow="Reminder Center" title="Pusat Pengingat" sticker={`${reminders.length}`} stickerTone="yellow">
        <div className="stat-grid">
          <StatCard label="Total" value={reminders.length} tone="sky" />
          <StatCard label="Pending" value={pending.length} tone="yellow" />
          <StatCard label="Hari Ini" value={today.length} tone="coral" />
        </div>
      </PixelCard>

      <div className="grouped-lists">
        <ReminderList title="Hari Ini" reminders={today} isLoading={isLoading} errorMessage={error} />
        <ReminderList title="Besok" reminders={tomorrow} isLoading={isLoading} errorMessage={error} />
        <ReminderList title="Minggu Ini" reminders={thisWeek} isLoading={isLoading} errorMessage={error} />
        <ReminderList title="Nanti" reminders={later} isLoading={isLoading} errorMessage={error} />
      </div>
    </div>
  )
}

export default ReminderCenterPage
