import { useState, useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/task/TaskList'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'

const FILTERS = ['all', 'pending', 'completed']

function TaskManagerPage() {
  const { tasks, isLoading, error, toggleTask, removeTask, completedCount } = useTasks()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = tasks
    if (filter === 'pending') result = result.filter(t => !t.is_completed)
    if (filter === 'completed') result = result.filter(t => t.is_completed)
    if (search.trim()) result = result.filter(t => t.name?.toLowerCase().includes(search.toLowerCase()))
    return result
  }, [tasks, filter, search])

  return (
    <div className="page-tasks">
      <PixelCard eyebrow="Task Manager" title="Manajemen Tugas" sticker={`${tasks.length}`} stickerTone="mint">
        <div className="stat-grid">
          <StatCard label="Total" value={tasks.length} tone="sky" />
          <StatCard label="Selesai" value={completedCount} tone="mint" />
          <StatCard label="Menunggu" value={tasks.length - completedCount} tone="peach" />
          <StatCard label="Progres" value={`${tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%`} tone="yellow" />
        </div>
      </PixelCard>

      <div className="page-toolbar">
        <div className="filter-tabs">
          {FILTERS.map(f => (
            <button key={f} type="button" className={`filter-tab ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Semua' : f === 'pending' ? 'Menunggu' : 'Selesai'}
            </button>
          ))}
        </div>
        <input className="search-input" type="text" placeholder="Cari tugas..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {error && <div className="status-message status-error">{error}</div>}

      <TaskList tasks={filtered} onToggle={toggleTask} onDelete={removeTask} isLoading={isLoading} />
    </div>
  )
}

export default TaskManagerPage
