function PixelCard({ eyebrow, title, sticker, stickerTone = 'sky', children, className = '' }) {
  return (
    <section className={`pixel-card ${className}`}>
      {(eyebrow || title || sticker) && (
        <div className="card-header">
          <div>
            {eyebrow && <p className="card-eyebrow">{eyebrow}</p>}
            {title && <h2 className="card-title">{title}</h2>}
          </div>
          {sticker && <span className={`sticker tone-${stickerTone}`}>{sticker}</span>}
        </div>
      )}
      {children}
    </section>
  )
}

export default PixelCard
