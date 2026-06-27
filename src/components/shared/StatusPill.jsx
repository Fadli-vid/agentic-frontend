import { normalizeStatusClass } from '../../constants/status'

function StatusPill({ status }) {
  return (
    <span className={`status-pill ${normalizeStatusClass(status)}`}>
      {status || 'unknown'}
    </span>
  )
}

export default StatusPill
