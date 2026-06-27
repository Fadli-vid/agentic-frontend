import PixelCard from '../cards/PixelCard'
import ProgressBar from '../shared/ProgressBar'
import { formatRupiah } from '../../lib/formatters'

function BudgetWidget({ totalExpenses = 0, budgetLimit = 1500000 }) {
  const usage = budgetLimit > 0 ? Math.min(100, Math.round((totalExpenses / budgetLimit) * 100)) : 0
  const status = usage >= 85 ? 'Waspada' : usage >= 60 ? 'Siaga' : 'Aman'
  const tone = usage >= 85 ? 'coral' : 'mint'

  return (
    <PixelCard eyebrow="Budget" title="Alarm Budget" sticker={status} stickerTone={tone}>
      <div className="budget-body">
        <div className="budget-row">
          <span>Limit</span>
          <strong>{formatRupiah(budgetLimit)}</strong>
        </div>
        <ProgressBar value={usage} tone={tone} />
        <div className="budget-row">
          <span>Terpakai</span>
          <strong>{formatRupiah(totalExpenses)}</strong>
        </div>
        <div className="budget-footnote">
          Sisa {formatRupiah(Math.max(0, budgetLimit - totalExpenses))}
        </div>
      </div>
    </PixelCard>
  )
}
export default BudgetWidget
