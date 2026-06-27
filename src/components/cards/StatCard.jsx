function StatCard({ label, value, tone = 'sky' }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  )
}

export default StatCard
