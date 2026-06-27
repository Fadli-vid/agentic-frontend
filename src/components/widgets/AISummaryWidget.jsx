import PixelCard from '../cards/PixelCard'

function AISummaryWidget({ items = [] }) {
  return (
    <PixelCard eyebrow="AI Summary" title="Ringkasan Kobi" sticker="AI" stickerTone="yellow">
      <ul className="summary-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="summary-footnote">Update terakhir: sekarang</p>
    </PixelCard>
  )
}
export default AISummaryWidget
