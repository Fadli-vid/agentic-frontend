import { useEffect, useMemo, useState } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [taskResponse, expenseResponse] = await Promise.all([
          fetch('http://localhost:8000/api/tasks'),
          fetch('http://localhost:8000/api/expenses'),
        ])

        const [taskData, expenseData] = await Promise.all([
          taskResponse.json(),
          expenseResponse.json(),
        ])

        setTasks(Array.isArray(taskData) ? taskData : [])
        setExpenses(Array.isArray(expenseData) ? expenseData : [])
      } catch (error) {
        console.error('Gagal mengambil data awal:', error)
      }
    }

    loadData()
  }, [])

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  )

  const handleToggleTask = async (id) => {
    let nextIsCompleted = null

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task
        nextIsCompleted = !Boolean(task.is_completed)
        return { ...task, is_completed: nextIsCompleted }
      })
    )

    if (nextIsCompleted === null) return

    try {
      await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: nextIsCompleted }),
      })
    } catch (error) {
      console.error('Gagal memperbarui status tugas:', error)
    }
  }

  const handleDeleteTask = async (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))

    try {
      await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Gagal menghapus tugas:', error)
    }
  }

  const handleDeleteExpense = async (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id))

    try {
      await fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Gagal menghapus pengeluaran:', error)
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

      <main className="app-grid">
        <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        <ExpenseList expenses={expenses} total={totalExpenses} onDelete={handleDeleteExpense} />
      </main>
    </div>
  )
}

export default App