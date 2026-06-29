import { useState, useEffect, useRef } from 'react'
import PixelModal from '../shared/PixelModal'
import PixelInput from '../shared/PixelInput'
import PixelTextarea from '../shared/PixelTextarea'
import PixelSelect from '../shared/PixelSelect'
import PixelButton from '../shared/PixelButton'

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
    <PixelModal title={task ? 'Edit Tugas' : 'Tambah Tugas'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="stack-lg mt-3">
        <div className="stack-sm">
          <label>Nama Tugas</label>
          <PixelInput ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="stack-sm">
          <label>Deskripsi</label>
          <PixelTextarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="stack-sm">
          <label>Status</label>
          <PixelSelect value={status} onChange={e => setStatus(e.target.value)}>
            <option value="pending">Menunggu</option>
            <option value="in_progress">Proses</option>
            <option value="completed">Selesai</option>
          </PixelSelect>
        </div>
        <div className="stack-sm">
          <label>Prioritas</label>
          <PixelSelect value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </PixelSelect>
        </div>
        <div className="stack-sm">
          <label>Tenggat Waktu</label>
          <PixelInput type="date" value={deadlineAt} onChange={e => setDeadlineAt(e.target.value)} />
        </div>
        <div className="inline justify-end mt-3">
          <PixelButton variant="icon" type="button" onClick={onClose}>Batal</PixelButton>
          <PixelButton type="submit">Simpan</PixelButton>
        </div>
      </form>
    </PixelModal>
  )
}

export default TaskModal
