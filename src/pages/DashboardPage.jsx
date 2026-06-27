import { useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useReminders } from '../hooks/useReminders'
import { useExpenses } from '../hooks/useExpenses'
import { useHabits } from '../hooks/useHabits'
import { useGoals } from '../hooks/useGoals'
import { useStudyPlans } from '../hooks/useStudyPlans'
import { useMemories } from '../hooks/useMemories'
import { useAutomations } from '../hooks/useAutomations'
import { useWorkflowRuns } from '../hooks/useWorkflowRuns'
import { useAgentEvents } from '../hooks/useAgentEvents'
import { useAnalytics } from '../hooks/useAnalytics'
import { formatRupiah } from '../lib/formatters'

import TodayTasksWidget from '../components/widgets/TodayTasksWidget'
import ReminderWidget from '../components/widgets/ReminderWidget'
import HabitWidget from '../components/widgets/HabitWidget'
import GoalWidget from '../components/widgets/GoalWidget'
import BudgetWidget from '../components/widgets/BudgetWidget'
import MemoryWidget from '../components/widgets/MemoryWidget'
import WorkflowWidget from '../components/widgets/WorkflowWidget'
import AgentWidget from '../components/widgets/AgentWidget'
import AnalyticsWidget from '../components/widgets/AnalyticsWidget'
import StudyWidget from '../components/widgets/StudyWidget'
import AISummaryWidget from '../components/widgets/AISummaryWidget'
import DailyFocusWidget from '../components/widgets/DailyFocusWidget'
import StatCard from '../components/cards/StatCard'
import PixelCard from '../components/cards/PixelCard'

function DashboardPage() {
  const { tasks, completedCount } = useTasks()
  const { reminders } = useReminders()
  const { total: totalExpenses } = useExpenses()
  const { activeHabits, bestStreak } = useHabits()
  const { activeGoals } = useGoals()
  const { activePlans } = useStudyPlans()
  const { recent: recentMemories } = useMemories()
  const { enabledCount } = useAutomations()
  const { runs } = useWorkflowRuns()
  const { events } = useAgentEvents()
  const { score } = useAnalytics()

  const budgetLimit = 1500000
  const budgetUsage = budgetLimit > 0 ? Math.min(100, Math.round((totalExpenses / budgetLimit) * 100)) : 0

  const aiSummaryItems = useMemo(() => {
    const pending = Math.max(0, tasks.length - completedCount)
    const lastEvent = events[0]?.message
    return [
      pending > 0 ? `Ada ${pending} tugas yang menunggu sentuhanmu.` : 'Semua tugas utama sudah aman untuk hari ini.',
      reminders.length > 0 ? `${reminders.length} pengingat siap menjaga jadwalmu.` : 'Belum ada pengingat aktif hari ini.',
      totalExpenses > 0 ? `Pengeluaran tercatat ${formatRupiah(totalExpenses)}.` : 'Belum ada pengeluaran tercatat hari ini.',
      lastEvent ? `Aktivitas terakhir: ${lastEvent}.` : 'Aktivitas agent masih tenang dan terkendali.',
    ]
  }, [tasks.length, completedCount, reminders.length, totalExpenses, events])

  return (
    <div className="page-dashboard">
      <div className="dashboard-top-row">
        <DailyFocusWidget />
        <AISummaryWidget items={aiSummaryItems} />
      </div>

      <PixelCard eyebrow="Daily Summary" title="Ringkasan Harian" sticker="Harian" stickerTone="sky">
        <div className="stat-grid">
          <StatCard label="Tugas selesai" value={`${completedCount}/${tasks.length}`} tone="mint" />
          <StatCard label="Pengingat aktif" value={reminders.length} tone="sky" />
          <StatCard label="Automasi hidup" value={enabledCount} tone="lavender" />
          <StatCard label="Budget terpakai" value={`${budgetUsage}%`} tone={budgetUsage >= 85 ? 'coral' : 'peach'} />
        </div>
      </PixelCard>

      <div className="widget-grid-3">
        <TodayTasksWidget tasks={tasks} completedCount={completedCount} />
        <ReminderWidget reminders={reminders} />
        <HabitWidget activeHabits={activeHabits} bestStreak={bestStreak} />
      </div>

      <div className="widget-grid-3">
        <GoalWidget activeGoals={activeGoals} />
        <BudgetWidget totalExpenses={totalExpenses} budgetLimit={budgetLimit} />
        <StudyWidget activePlans={activePlans} />
      </div>

      <div className="widget-grid-3">
        <MemoryWidget recent={recentMemories} />
        <WorkflowWidget runs={runs} />
        <AgentWidget events={events} />
      </div>

      <AnalyticsWidget score={score} />
    </div>
  )
}

export default DashboardPage
