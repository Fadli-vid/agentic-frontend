import { useState, useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/task/TaskList'
import TaskModal from '../components/task/TaskModal'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'

const FILTERS = ['all', 'pending', 'in_progress', 'completed']

function TaskManagerPage() {
  const { tasks, statistics, isLoading, error, handleUpdateStatus, handleCreateTask, handleUpdateTask, removeTask, filters, setFilters, pagination, refresh } = useTasks()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const handleFilterChange = (f) => {
    setActiveFilter(f)
    setFilters(prev => ({ ...prev, status: f === 'all' ? '' : f }))
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    // simple debounce can be added here
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  const handleSaveTask = async (data) => {
    try {
      if (editingTask) {
        await handleUpdateTask(editingTask.id, data)
      } else {
        await handleCreateTask(data)
      }
      setIsModalOpen(false)
      setEditingTask(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleAddClick = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  return (
    <div className="page-tasks">
      <PixelCard eyebrow="Task Manager" title="Manajemen Tugas" sticker={`${statistics?.total || 0}`} stickerTone="mint">
        <div className="stat-grid">
          <StatCard label="Total" value={statistics?.total || 0} tone="sky" />
          <StatCard label="Menunggu" value={statistics?.pending || 0} tone="peach" />
          <StatCard label="Proses" value={statistics?.in_progress || 0} tone="yellow" />
          <StatCard label="Selesai" value={statistics?.completed || 0} tone="mint" />
          <StatCard label="Progres" value={`${statistics?.progress_percentage || 0}%`} tone="coral" />
        </div>
      </PixelCard>

      <div className="page-toolbar">
        <div className="filter-tabs">
          {FILTERS.map(f => (
            <button key={f} type="button" className={`filter-tab ${activeFilter === f ? 'is-active' : ''}`} onClick={() => handleFilterChange(f)}>
              {f === 'all' ? 'Semua' : f === 'pending' ? 'Menunggu' : f === 'in_progress' ? 'Proses' : 'Selesai'}
            </button>
          ))}
        </div>
        <input className="search-input" type="text" placeholder="Cari tugas..." value={search} onChange={handleSearchChange} />
        <button className="btn btn-primary" onClick={handleAddClick} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>+ Tambah</button>
      </div>

      {error && <div className="status-message status-error">{error}</div>}

      <TaskList tasks={tasks} onToggle={handleUpdateStatus} onDelete={removeTask} onEdit={handleEditClick} isLoading={isLoading} />

      {pagination && pagination.last_page > 1 && (
        <div className="pagination" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button disabled={pagination.current_page === 1} onClick={() => refresh(pagination.current_page - 1)} className="icon-button">Sebelumnya</button>
          <span style={{ alignSelf: 'center' }}>Hal {pagination.current_page} dari {pagination.last_page}</span>
          <button disabled={pagination.current_page === pagination.last_page} onClick={() => refresh(pagination.current_page + 1)} className="icon-button">Selanjutnya</button>
        </div>
      )}

      {isModalOpen && <TaskModal task={editingTask} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} />}
    </div>
  )
}

export default TaskManagerPage
