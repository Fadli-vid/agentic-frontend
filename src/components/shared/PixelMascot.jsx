/**
 * Pixel art mascot SVG — extracted from App.jsx.
 * The friendly Kobi companion character.
 */
function PixelMascot({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      role="img"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="2" y="2" width="12" height="9" fill="var(--accent-sky)" stroke="var(--border)" strokeWidth="1" />
      <rect x="4" y="4" width="3" height="3" fill="var(--border)" />
      <rect x="9" y="4" width="3" height="3" fill="var(--border)" />
      <rect x="6" y="8" width="4" height="2" fill="var(--accent-coral)" />
      <rect x="1" y="6" width="1" height="3" fill="var(--border)" />
      <rect x="14" y="6" width="1" height="3" fill="var(--border)" />
      <rect x="4" y="11" width="8" height="3" fill="var(--accent-mint)" stroke="var(--border)" strokeWidth="1" />
    </svg>
  )
}

export default PixelMascot
