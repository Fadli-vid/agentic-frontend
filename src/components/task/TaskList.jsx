import EmptyState from '../shared/EmptyState'
import PixelPill from '../shared/PixelPill'
import PixelButton from '../shared/PixelButton'

function TaskList({ tasks, onToggle, onDelete, onEdit, isLoading }) {
  const completedCount = tasks.filter(task => Boolean(task.is_completed)).length

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">📝 Tugas</p>
          <h2 className="card-title">Daftar Tugas</h2>
        </div>
        <span className="count-badge">
          {completedCount} / {tasks.length}
        </span>
      </div>

      {isLoading ? (
        <EmptyState loading />
      ) : tasks.length === 0 ? (
        <EmptyState message="Belum ada tugas. Tambahkan lewat Telegram." />
      ) : (
        <ul className="list">
          {tasks.map(task => (
            <li key={task.id} className="list-item task-item">
              <input
                className="task-checkbox"
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => onToggle(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                aria-label={`Tandai tugas ${task.name}`}
              />
              
              <div className="stack-sm">
                <span className={`task-name ${task.status === 'completed' ? 'is-completed' : ''}`}>
                  {task.name}
                </span>
                {task.description && <span className="meta-line">{task.description}</span>}
              </div>
              
              <div className="inline">
                <div className="task-priority">
                  <PixelPill tone={task.status === 'completed' ? 'mint' : task.status === 'in_progress' ? 'yellow' : 'sky'}>
                    {task.status === 'in_progress' ? 'Proses' : task.status === 'completed' ? 'Selesai' : 'Menunggu'}
                  </PixelPill>
                </div>
                
                {task.priority && (
                  <div className="task-priority">
                    <PixelPill tone={task.priority === 'high' ? 'coral' : task.priority === 'medium' ? 'yellow' : 'sky'}>
                      {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </PixelPill>
                  </div>
                )}
                
                {task.deadline_at && (
                  <div className="task-deadline inline">
                    <span className="meta-line">📅 {new Date(task.deadline_at).toLocaleDateString('id-ID')}</span>
                    {new Date(task.deadline_at) < new Date(new Date().setHours(0,0,0,0)) && task.status !== 'completed' && (
                      <PixelPill tone="coral">Terlambat</PixelPill>
                    )}
                  </div>
                )}
                
                <PixelButton
                  variant="icon"
                  onClick={() => onEdit(task)}
                  aria-label={`Edit tugas ${task.name}`}
                >
                  ✏️
                </PixelButton>
                <PixelButton
                  variant="icon"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Hapus tugas ${task.name}`}
                >
                  🗑️
                </PixelButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
