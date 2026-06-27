function ProgressBar({ value = 0, tone = 'mint', className = '' }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={`progress-track ${className}`}>
      <div
        className={`progress-fill tone-${tone}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export default ProgressBar
