import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import TaskList from './components/TaskList'
import {
  deleteExpense,
  deleteTask,
  fetchExpenses,
  fetchTasks,
  updateTaskStatus,
} from './lib/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const [taskData, expenseData] = await Promise.all([
        fetchTasks(),
        fetchExpenses(),
      ])

      setTasks(taskData)
      setExpenses(expenseData)
    } catch (error) {
      console.error('Gagal mengambil data awal:', {
        message: error?.message,
        status: error?.status,
        body: error?.body,
      })
      setErrorMessage(error?.message || 'Gagal memuat data dashboard. Coba refresh ya.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  )

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
      </main>
    </div>
  )
}

export default App