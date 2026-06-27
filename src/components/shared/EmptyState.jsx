function EmptyState({ message, icon = '📭', children }) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <p>{message || 'Tidak ada data.'}</p>
      {children}
    </div>
  )
}

export default EmptyState
