import { useState, useEffect, useRef } from 'react'

function TaskModal({ task, onClose, onSave }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [deadlineAt, setDeadlineAt] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (task) {
      setName(task.name || '')
      setDescription(task.description || '')
      setStatus(task.status || 'pending')
      setPriority(task.priority || 'medium')
      setDeadlineAt(task.deadline_at ? task.deadline_at.split('T')[0] : '')
    } else {
      setName('')
      setDescription('')
      setStatus('pending')
      setPriority('medium')
      setDeadlineAt('')
    }
    
    // Auto focus on mount
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 10)
  }, [task])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        handleSubmit(e)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      name,
      description,
      status,
      priority,
      deadline_at: deadlineAt || null
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal card">
        <div className="card-header">
          <h2 className="card-title">{task ? 'Edit Tugas' : 'Tambah Tugas'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label>Nama Tugas</label>
            <input ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label>Deskripsi</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="pending">Menunggu</option>
              <option value="in_progress">Proses</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label>Prioritas</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="low">Rendah</option>
              <option value="medium">Sedang</option>
              <option value="high">Tinggi</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label>Tenggat Waktu</label>
            <input type="date" value={deadlineAt} onChange={e => setDeadlineAt(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" className="icon-button" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>Batal</button>
            <button type="submit" className="icon-button" style={{ padding: '0.5rem 1rem', background: 'var(--color-mint)', color: '#000' }}>Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
