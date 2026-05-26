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

  
  return (
    <div className="app-layout">
      <aside className="pixel-sidebar">
        <div className="sidebar-logo">?? KOBI OS</div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-active">?? Dashboard</a>
          <a href="#">?? Schedule</a>
          <a href="#">?? Study Plan</a>
          <a href="#">?? Budget</a>
          <a href="#">?? Goals</a>
          <a href="#">?? Memory</a>
        </nav>
        <div className="sidebar-footer">
          <div className="status-indicator">?? System Online</div>
        </div>
      </aside>
      
      <div className="app-content">
        <header className="app-header">
          <p className="app-eyebrow">Agentic AI Core // Kobi</p>
          <div className="nl-command-bar">
            <span className="prompt-arrow">&gt;</span>
            <input type="text" placeholder="Tell Kobi what to do... (e.g. 'Add Math test to schedule')" className="nl-input" />
            <button className="nl-submit">EXECUTE</button>
          </div>
          <h1 className="app-title">Welcome Back, Master!</h1>
          <p className="app-subtitle">I've analyzed your data. You have {tasks.length} tasks pending.</p>
          <div className="app-meta">
            <span className="meta-pill">?? Quests: {tasks.length}</span>
            <span className="meta-pill">?? Gold: {expenses.length}</span>
            <span className="meta-pill">?? Streak: 12 days</span>
          </div>
        </header>

        {isLoading && <div className="status-message">Booting up systems...</div>}
        {errorMessage && <div className="status-message status-error">{errorMessage}</div>}
        {monitoringErrorMessage && (
          <div className="status-message status-error">{monitoringErrorMessage}</div>
        )}

        <div className="dashboard-grid">
          <div className="main-column">
            <div className="pixel-card hero-widget">
              <h2 className="card-title">?? Daily Brief</h2>
              <p className="widget-text">Good morning! Your focus today should be finishing your Science essay and keeping expenses under . No rain expected.</p>
            </div>

            <div className="quest-log">
              <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                isLoading={isLoading}
              />
            </div>
            
            <div className="grid-2col">
              <div className="pixel-card">
                <h2 className="card-title">?? Habit Tracker</h2>
                <div className="habit-grid">
                  <div className="habit-item">?? Drink Water: [因[因[ ][ ]</div>
                  <div className="habit-item">?? Read 10p: [因[因[因[ ]</div>
                </div>
              </div>

              <div className="pixel-card">
                <h2 className="card-title">?? Goal Tracker</h2>
                <div className="goal-item">
                  <span>Learn React</span>
                  <div className="pixel-progress"><div className="progress-fill" style={{width: '60%'}}></div></div>
                </div>
              </div>
            </div>

            <div className="pixel-card">
              <ExpenseList
                expenses={expenses}
                total={totalExpenses}
                onDelete={handleDeleteExpense}
                isLoading={isLoading}
              />
            </div>

            <div className="pixel-card">
              <h2 className="card-title">?? Study Planner & Schedule</h2>
              <div className="schedule-timeline">
                <div className="time-block"><span>10:00 AM</span> - Algorithm Class</div>
                <div className="time-block"><span>02:00 PM</span> - Study session (Library)</div>
              </div>
            </div>
            
            <div className="pixel-card highlights-card">
              <h2 className="card-title">? Weekly Review Summary</h2>
              <p className="widget-text">Last week was productive! You completed 80% of tasks but went 10% over budget.</p>
            </div>
          </div>

          <div className="side-column">
            <div className="pixel-card suggestion-panel">
              <h2 className="card-title">?? AI Suggestions</h2>
              <ul className="suggestion-list">
                <li>Looks like you have a free hour at 4 PM. Review CS notes?</li>
                <li>You're spending a lot on coffee this week, brew at home?</li>
              </ul>
            </div>

            <ReminderList
              reminders={reminders}
              isLoading={isLoading}
              errorMessage={monitoringErrors.reminders}
            />

            <div className="pixel-card budget-alert">
              <h2 className="card-title">?? Budget Alert</h2>
              <div className="alert-box">
                You are close to your weekly spending limit! Reduce unnecessary buys.
              </div>
            </div>

            <AutomationList
              automations={automations}
              isLoading={isLoading}
              errorMessage={monitoringErrors.automations}
              onToggle={handleToggleAutomation}
            />
            
            <div className="pixel-card memory-timeline">
              <h2 className="card-title">?? Memory Log</h2>
              <div className="memory-item">&gt; Remembered that Midterms start on Nov 15.</div>
              <div className="memory-item">&gt; Fact updated: 'Prefers studying at night.'</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

