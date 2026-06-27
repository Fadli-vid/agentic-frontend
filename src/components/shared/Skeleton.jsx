function Skeleton({ count = 1, type = 'card' }) {
  const elements = Array.from({ length: count })

  return (
    <div className="skeleton-wrapper">
      {elements.map((_, i) => (
        <div key={i} className={`skeleton skeleton-${type}`} />
      ))}
    </div>
  )
}

export default Skeleton
