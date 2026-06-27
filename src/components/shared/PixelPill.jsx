function PixelPill({ children, tone = 'sky' }) {
  return (
    <span className={`pixel-pill tone-${tone}`}>
      {children}
    </span>
  )
}

export default PixelPill
