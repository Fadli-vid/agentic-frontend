import EmptyState from '../shared/EmptyState'
import PixelPill from '../shared/PixelPill'

function TaskList({ tasks, onToggle, onDelete, isLoading }) {
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
                checked={Boolean(task.is_completed)}
                onChange={() => onToggle(task.id)}
                aria-label={`Tandai tugas ${task.name}`}
              />
              <span className={`task-name ${task.is_completed ? 'is-completed' : ''}`}>
                {task.name}
              </span>
              {task.priority && (
                <div className="task-priority">
                  <PixelPill tone={task.priority === 'high' ? 'coral' : task.priority === 'medium' ? 'yellow' : 'mint'}>
                    {task.priority}
                  </PixelPill>
                </div>
              )}
              <button
                className="icon-button"
                type="button"
                onClick={() => onDelete(task.id)}
                aria-label={`Hapus tugas ${task.name}`}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
