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
    <div className="app">
      <header className="app-header">
        <p className="app-eyebrow">Agentic AI Dashboard</p>
        <h1 className="app-title">Dashboard Kobi</h1>
        <p className="app-subtitle">Data ini tersinkronisasi otomatis dari Telegram.</p>
        <div className="app-meta">
          <span className="meta-pill">Tugas: {tasks.length}</span>
          <span className="meta-pill">Pengeluaran: {expenses.length}</span>
        </div>
      </header>

      {isLoading && <div className="status-message">Memuat data dashboard...</div>}
      {errorMessage && <div className="status-message status-error">{errorMessage}</div>}
      {monitoringErrorMessage && (
        <div className="status-message status-error">{monitoringErrorMessage}</div>
      )}

      <main className="app-grid">
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          isLoading={isLoading}
        />
        <ExpenseList
          expenses={expenses}
          total={totalExpenses}
          onDelete={handleDeleteExpense}
          isLoading={isLoading}
        />
        <AgentActivityList
          events={agentEvents}
          isLoading={isLoading}
          errorMessage={monitoringErrors.agentEvents}
        />
        <WorkflowRunList
          runs={workflowRuns}
          isLoading={isLoading}
          errorMessage={monitoringErrors.workflowRuns}
        />
        <ReminderList
          reminders={reminders}
          isLoading={isLoading}
          errorMessage={monitoringErrors.reminders}
        />
        <AutomationList
          automations={automations}
          isLoading={isLoading}
          errorMessage={monitoringErrors.automations}
          onToggle={handleToggleAutomation}
        />
      </main>
    </div>
  )
}

export default App