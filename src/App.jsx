import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import AgentActivityList from './components/AgentActivityList'
import AutomationList from './components/AutomationList'
import ExpenseList from './components/ExpenseList'
import ReminderList from './components/ReminderList'
import TaskList from './components/TaskList'
import WorkflowRunList from './components/WorkflowRunList'
import {
  deleteExpense,
  deleteTask,
  fetchAgentEvents,
  fetchAutomations,
  fetchExpenses,
  fetchReminders,
  fetchTasks,
  fetchWorkflowRuns,
  updateAutomation,
  updateTaskStatus,
} from './lib/api'

const rupiahFormatter = new Intl.NumberFormat('id-ID')

const formatRupiah = (value) => `Rp ${rupiahFormatter.format(value)}`

const HABITS = [
  { label: 'Pomodoro 3x', progress: 5, total: 7 },
  { label: 'Minum air', progress: 6, total: 7 },
  { label: 'Jurnal singkat', progress: 4, total: 7 },
  { label: 'Stretching', progress: 3, total: 7 },
]

const GOALS = [
  { label: 'Skripsi Bab 2', progress: 62, tone: 'mint', target: '7 hari lagi' },
  { label: 'Portfolio UI', progress: 40, tone: 'sky', target: '2 minggu' },
  { label: 'Belajar AI Tools', progress: 75, tone: 'lavender', target: 'Sabtu' },
]

const STUDY_PLAN = [
  { time: '07:30', label: 'Review materi', tag: 'Ringan' },
  { time: '10:00', label: 'Fokus tugas utama', tag: 'Deep work' },
  { time: '15:00', label: 'Kuis mini', tag: 'Evaluasi' },
  { time: '19:30', label: 'Rangkuman & catatan', tag: 'Refleksi' },
]

const WEEKLY_REVIEW = [
  { label: 'Jam fokus', value: '9 jam', tone: 'mint' },
  { label: 'Habit konsisten', value: '5/7 hari', tone: 'sky' },
  { label: 'Target selesai', value: '3 dari 5', tone: 'lavender' },
  { label: 'Mood belajar', value: 'Stabil', tone: 'peach' },
]

const MEMORY_TIMELINE = [
  { time: '08:10', text: 'Ingat: kamu ingin belajar UI/UX 3x minggu ini.' },
  { time: '11:30', text: 'Budget makan siang biasanya di bawah Rp 40.000.' },
  { time: '14:00', text: 'Kamu suka ringkasan pelajaran dalam bullet.' },
  { time: '17:45', text: 'Target tidur kamu jam 22:30 agar besok segar.' },
]

const AI_SUGGESTIONS = [
  'Mulai 25 menit fokus untuk tugas terberat, lalu jeda 5 menit.',
  'Jadwalkan reminder review catatan jam 19:00 malam ini.',
  'Cek pengeluaran kecil hari ini supaya budget mingguan aman.',
  'Kobi bisa bantu rangkum 3 poin penting dari materi kuliahmu.',
]

function PixelMascot({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      role="img"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect
        x="2"
        y="2"
        width="12"
        height="9"
        fill="var(--accent-sky)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <rect x="4" y="4" width="3" height="3" fill="var(--border)" />
      <rect x="9" y="4" width="3" height="3" fill="var(--border)" />
      <rect x="6" y="8" width="4" height="2" fill="var(--accent-coral)" />
      <rect x="1" y="6" width="1" height="3" fill="var(--border)" />
      <rect x="14" y="6" width="1" height="3" fill="var(--border)" />
      <rect
        x="4"
        y="11"
        width="8"
        height="3"
        fill="var(--accent-mint)"
        stroke="var(--border)"
        strokeWidth="1"
      />
    </svg>
  )
}

function App() {
  const [tasks, setTasks] = useState([])
  const [expenses, setExpenses] = useState([])
  const [agentEvents, setAgentEvents] = useState([])
  const [workflowRuns, setWorkflowRuns] = useState([])
  const [reminders, setReminders] = useState([])
  const [automations, setAutomations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [monitoringErrors, setMonitoringErrors] = useState({})
  const [commandInput, setCommandInput] = useState('')

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')
    setMonitoringErrors({})

    const safeFetch = async (promise, label) => {
      try {
        const data = await promise
        return { ok: true, data }
      } catch (error) {
        console.error(`Gagal memuat ${label}:`, {
          message: error?.message,
          status: error?.status,
          body: error?.body,
        })
        return { ok: false, error }
      }
    }

    const [
      tasksResult,
      expensesResult,
      eventsResult,
      runsResult,
      remindersResult,
      automationsResult,
    ] = await Promise.all([
      safeFetch(fetchTasks(), 'tugas'),
      safeFetch(fetchExpenses(), 'pengeluaran'),
      safeFetch(fetchAgentEvents(), 'aktivitas agent'),
      safeFetch(fetchWorkflowRuns(), 'workflow runs'),
      safeFetch(fetchReminders(), 'pengingat'),
      safeFetch(fetchAutomations(), 'automasi'),
    ])

    if (tasksResult.ok) {
      setTasks(tasksResult.data)
    } else {
      const message = tasksResult.error?.message || 'Gagal memuat daftar tugas.'
      setErrorMessage(message)
    }

    if (expensesResult.ok) {
      setExpenses(expensesResult.data)
    } else {
      const message = expensesResult.error?.message || 'Gagal memuat catatan pengeluaran.'
      setErrorMessage(prev => (prev ? `${prev} ${message}` : message))
    }

    const nextMonitoringErrors = {}

    if (eventsResult.ok) {
      setAgentEvents(eventsResult.data)
    } else {
      nextMonitoringErrors.agentEvents =
        eventsResult.error?.message || 'Gagal memuat aktivitas agent.'
    }

    if (runsResult.ok) {
      setWorkflowRuns(runsResult.data)
    } else {
      nextMonitoringErrors.workflowRuns =
        runsResult.error?.message || 'Gagal memuat workflow runs.'
    }

    if (remindersResult.ok) {
      setReminders(remindersResult.data)
    } else {
      nextMonitoringErrors.reminders =
        remindersResult.error?.message || 'Gagal memuat pengingat.'
    }

    if (automationsResult.ok) {
      setAutomations(automationsResult.data)
    } else {
      nextMonitoringErrors.automations =
        automationsResult.error?.message || 'Gagal memuat automasi.'
    }

    setMonitoringErrors(nextMonitoringErrors)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  )

  const completedTasks = useMemo(
    () => tasks.filter(task => Boolean(task.is_completed)).length,
    [tasks]
  )

  const enabledAutomations = useMemo(
    () => automations.filter(automation => Boolean(automation.is_enabled)).length,
    [automations]
  )

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date()),
    []
  )

  const budgetLimit = 1500000

  const budgetUsage = useMemo(() => {
    if (!budgetLimit) return 0
    const ratio = totalExpenses / budgetLimit
    if (!Number.isFinite(ratio)) return 0
    return Math.min(100, Math.round(ratio * 100))
  }, [totalExpenses, budgetLimit])

  const budgetStatus = budgetUsage >= 85 ? 'Waspada' : budgetUsage >= 60 ? 'Siaga' : 'Aman'

  const aiSummaryItems = useMemo(() => {
    const pendingTasks = Math.max(0, tasks.length - completedTasks)
    const lastEvent = agentEvents[0]?.message

    return [
      pendingTasks > 0
        ? `Ada ${pendingTasks} tugas yang menunggu sentuhanmu.`
        : 'Semua tugas utama sudah aman untuk hari ini.',
      reminders.length > 0
        ? `${reminders.length} pengingat siap menjaga jadwalmu.`
        : 'Belum ada pengingat aktif hari ini.',
      totalExpenses > 0
        ? `Pengeluaran tercatat ${formatRupiah(totalExpenses)}.`
        : 'Belum ada pengeluaran tercatat hari ini.',
      lastEvent
        ? `Aktivitas terakhir: ${lastEvent}.`
        : 'Aktivitas agent masih tenang dan terkendali.',
    ]
  }, [agentEvents, completedTasks, reminders.length, tasks.length, totalExpenses])

  const dailyStats = useMemo(
    () => [
      {
        label: 'Tugas selesai',
        value: `${completedTasks}/${tasks.length}`,
        tone: 'mint',
      },
      { label: 'Pengingat aktif', value: reminders.length, tone: 'sky' },
      { label: 'Automasi hidup', value: enabledAutomations, tone: 'lavender' },
      {
        label: 'Budget terpakai',
        value: `${budgetUsage}%`,
        tone: budgetUsage >= 85 ? 'coral' : 'peach',
      },
    ],
    [budgetUsage, completedTasks, enabledAutomations, reminders.length, tasks.length]
  )

  const monitoringErrorMessage = useMemo(() => {
    const messages = Object.values(monitoringErrors).filter(Boolean)
    if (messages.length === 0) return ''
    if (messages.length === 1) return messages[0]
    return 'Sebagian data monitoring gagal dimuat. Coba refresh ya.'
  }, [monitoringErrors])

  const handleToggleTask = async (id) => {
    setErrorMessage('')
    let nextIsCompleted = null
    const previousTasks = tasks

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task
        nextIsCompleted = !Boolean(task.is_completed)
        return { ...task, is_completed: nextIsCompleted }
      })
    )

    if (nextIsCompleted === null) return

    try {
      await updateTaskStatus(id, nextIsCompleted)
    } catch (error) {
      console.error('Gagal memperbarui status tugas:', {
        message: error?.message,
        status: error?.status,
        body: error?.body,
      })
      setErrorMessage(error?.message || 'Gagal memperbarui status tugas. Coba ulangi ya.')
      setTasks(previousTasks)
    }
  }

  const handleDeleteTask = async (id) => {
    setErrorMessage('')
    const previousTasks = tasks

    setTasks(prev => prev.filter(task => task.id !== id))

    try {
      await deleteTask(id)
    } catch (error) {
      console.error('Gagal menghapus tugas:', {
        message: error?.message,
        status: error?.status,
        body: error?.body,
      })
      setErrorMessage(error?.message || 'Gagal menghapus tugas. Coba lagi ya.')
      setTasks(previousTasks)
    }
  }

  const handleDeleteExpense = async (id) => {
    setErrorMessage('')
    const previousExpenses = expenses

    setExpenses(prev => prev.filter(expense => expense.id !== id))

    try {
      await deleteExpense(id)
    } catch (error) {
      console.error('Gagal menghapus pengeluaran:', {
        message: error?.message,
        status: error?.status,
        body: error?.body,
      })
      setErrorMessage(error?.message || 'Gagal menghapus pengeluaran. Coba lagi ya.')
      setExpenses(previousExpenses)
    }
  }

  const handleToggleAutomation = async (id, nextValue) => {
    const previousAutomations = automations

    setMonitoringErrors(prev => ({ ...prev, automations: '' }))
    setAutomations(prev =>
      prev.map(automation =>
        automation.id === id ? { ...automation, is_enabled: nextValue } : automation
      )
    )

    try {
      await updateAutomation(id, { is_enabled: nextValue })
    } catch (error) {
      console.error('Gagal memperbarui automasi:', {
        message: error?.message,
        status: error?.status,
        body: error?.body,
      })
      setMonitoringErrors(prev => ({
        ...prev,
        automations: error?.message || 'Gagal memperbarui automasi. Coba lagi ya.',
      }))
      setAutomations(previousAutomations)
    }
  }

  const handleCommandSubmit = (event) => {
    event.preventDefault()
    if (!commandInput.trim()) return
    setCommandInput('')
  }

  return (
    <div className="app-shell">
      <aside className="pixel-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">
            <span className="brand-pixel" aria-hidden="true" />
            Kobi
          </div>
          <p className="brand-tag">Asisten produktivitas yang ceria</p>
        </div>

        <nav className="sidebar-nav" aria-label="Navigasi utama">
          <button type="button" className="nav-item is-active">
            <span className="nav-icon icon-dashboard" aria-hidden="true" />
            Dashboard
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-reminder" aria-hidden="true" />
            Reminder
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-habit" aria-hidden="true" />
            Habit Tracker
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-goal" aria-hidden="true" />
            Goal Planner
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-study" aria-hidden="true" />
            Study Planner
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-budget" aria-hidden="true" />
            Budget
          </button>
          <button type="button" className="nav-item">
            <span className="nav-icon icon-memory" aria-hidden="true" />
            Memory
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="status-indicator">
            <span className="status-dot" aria-hidden="true" />
            Kobi online
          </div>
          <div className="sidebar-companion">
            <PixelMascot className="pixel-mascot is-mini" />
            <div>
              <p className="companion-title">Buddy Mode</p>
              <p className="companion-subtitle">Siap bantu kamu fokus.</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="top-header">
          <section className="pixel-card greeting-card">
            <p className="header-eyebrow">Selamat {todayLabel}</p>
            <h1 className="header-title">Halo, ini ruang kendali Kobi kamu.</h1>
            <p className="header-subtitle">
              Semua tugas, kebiasaan, dan memori kamu disusun rapi agar belajar terasa ringan.
            </p>
            <div className="header-badges">
              <span className="pixel-pill tone-mint">Tugas: {tasks.length}</span>
              <span className="pixel-pill tone-sky">Pengingat: {reminders.length}</span>
              <span className="pixel-pill tone-lavender">
                Automasi: {enabledAutomations}
              </span>
            </div>
          </section>

          <section className="pixel-card summary-card">
            <div className="card-header is-compact">
              <div>
                <p className="card-eyebrow">AI Summary</p>
                <h2 className="card-title">Ringkasan Kobi</h2>
              </div>
              <span className="sticker tone-yellow">AI</span>
            </div>
            <ul className="summary-list">
              {aiSummaryItems.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
            <p className="summary-footnote">Update terakhir: sekarang</p>
          </section>

          <section className="pixel-card mascot-card">
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
          </section>
        </header>

        <form className="command-bar" onSubmit={handleCommandSubmit}>
          <span className="command-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            className="command-input"
            type="text"
            value={commandInput}
            onChange={(event) => setCommandInput(event.target.value)}
            placeholder="Contoh: rangkum jadwal besok, bantu fokus 25 menit, atau catat pengeluaran"
            aria-label="Masukkan perintah natural language"
          />
          <button className="pixel-button" type="submit">
            Kirim
          </button>
        </form>

        {(isLoading || errorMessage || monitoringErrorMessage) && (
          <div className="status-stack">
            {isLoading && <div className="status-message">Memuat data dashboard...</div>}
            {errorMessage && (
              <div className="status-message status-error">{errorMessage}</div>
            )}
            {monitoringErrorMessage && (
              <div className="status-message status-error">{monitoringErrorMessage}</div>
            )}
          </div>
        )}

        <div className="dashboard-grid">
          <div className="primary-column">
            <section className="pixel-card daily-summary">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Daily Summary</p>
                  <h2 className="card-title">Ringkasan Harian</h2>
                </div>
                <span className="sticker tone-sky">Harian</span>
              </div>
              <div className="stat-grid">
                {dailyStats.map(stat => (
                  <div key={stat.label} className={`stat-card tone-${stat.tone}`}>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card widget-panel">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Reminders & Tasks</p>
                  <h2 className="card-title">Widget Pengingat & Tugas</h2>
                </div>
                <span className="sticker tone-peach">Fokus</span>
              </div>
              <div className="widget-grid">
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  isLoading={isLoading}
                />
                <ReminderList
                  reminders={reminders}
                  isLoading={isLoading}
                  errorMessage={monitoringErrors.reminders}
                />
              </div>
            </section>

            <section className="pixel-card habit-tracker">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Habit Tracker</p>
                  <h2 className="card-title">Ritual Harian</h2>
                </div>
                <span className="sticker tone-mint">Streak</span>
              </div>
              <div className="habit-list">
                {HABITS.map(habit => (
                  <div key={habit.label} className="habit-row">
                    <span className="habit-label">{habit.label}</span>
                    <div className="habit-dots" aria-hidden="true">
                      {Array.from({ length: habit.total }).map((_, index) => (
                        <span
                          key={`${habit.label}-${index}`}
                          className={`habit-dot ${index < habit.progress ? 'is-filled' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card goal-tracker">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Goal Tracker</p>
                  <h2 className="card-title">Target Prioritas</h2>
                </div>
                <span className="sticker tone-lavender">Goals</span>
              </div>
              <div className="goal-list">
                {GOALS.map(goal => (
                  <div key={goal.label} className="goal-item">
                    <div className="goal-top">
                      <span className="goal-label">{goal.label}</span>
                      <span className="goal-target">{goal.target}</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className={`progress-fill tone-${goal.tone}`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card study-planner">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Study Planner</p>
                  <h2 className="card-title">Rencana Belajar</h2>
                </div>
                <span className="sticker tone-sky">Plan</span>
              </div>
              <div className="study-timeline">
                {STUDY_PLAN.map(block => (
                  <div key={`${block.time}-${block.label}`} className="study-block">
                    <span className="time-pill">{block.time}</span>
                    <div>
                      <p className="study-title">{block.label}</p>
                      <p className="study-tag">{block.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card weekly-review">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Weekly Review</p>
                  <h2 className="card-title">Review Mingguan</h2>
                </div>
                <span className="sticker tone-yellow">Review</span>
              </div>
              <div className="review-grid">
                {WEEKLY_REVIEW.map(item => (
                  <div key={item.label} className={`review-item tone-${item.tone}`}>
                    <span className="review-label">{item.label}</span>
                    <span className="review-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card memory-timeline">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Memory Timeline</p>
                  <h2 className="card-title">Jejak Memori</h2>
                </div>
                <span className="sticker tone-lavender">Memory</span>
              </div>
              <div className="memory-list">
                {MEMORY_TIMELINE.map(item => (
                  <div key={`${item.time}-${item.text}`} className="memory-item">
                    <span className="memory-time">{item.time}</span>
                    <span className="memory-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-card suggestion-card">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Proactive Suggestions</p>
                  <h2 className="card-title">Saran Pintar dari Kobi</h2>
                </div>
                <span className="sticker tone-peach">AI+</span>
              </div>
              <ul className="suggestion-list">
                {AI_SUGGESTIONS.map(suggestion => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="secondary-column">
            <section className="pixel-card budget-alert">
              <div className="card-header">
                <div>
                  <p className="card-eyebrow">Budget Alert</p>
                  <h2 className="card-title">Alarm Budget</h2>
                </div>
                <span className={`sticker ${budgetUsage >= 85 ? 'tone-coral' : 'tone-mint'}`}>
                  {budgetStatus}
                </span>
              </div>
              <div className="budget-body">
                <div className="budget-row">
                  <span>Limit mingguan</span>
                  <strong>{formatRupiah(budgetLimit)}</strong>
                </div>
                <div className="budget-meter" aria-hidden="true">
                  <div
                    className={`budget-fill ${budgetUsage >= 85 ? 'is-high' : ''}`}
                    style={{ width: `${budgetUsage}%` }}
                  />
                </div>
                <div className="budget-row">
                  <span>Terpakai</span>
                  <strong>{formatRupiah(totalExpenses)}</strong>
                </div>
                <div className="budget-footnote">
                  Sisa {formatRupiah(Math.max(0, budgetLimit - totalExpenses))}
                </div>
              </div>
            </section>

            <ExpenseList
              expenses={expenses}
              total={totalExpenses}
              onDelete={handleDeleteExpense}
              isLoading={isLoading}
            />

            <AutomationList
              automations={automations}
              isLoading={isLoading}
              errorMessage={monitoringErrors.automations}
              onToggle={handleToggleAutomation}
            />

            <WorkflowRunList
              runs={workflowRuns}
              isLoading={isLoading}
              errorMessage={monitoringErrors.workflowRuns}
            />

            <AgentActivityList
              events={agentEvents}
              isLoading={isLoading}
              errorMessage={monitoringErrors.agentEvents}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App