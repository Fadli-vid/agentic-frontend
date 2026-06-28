import EmptyState from '../shared/EmptyState'
import PixelCard from '../cards/PixelCard'
import { formatRupiah, formatDate } from '../../lib/formatters'

function ExpenseList({ expenses, total, onDelete, isLoading }) {
  return (
    <PixelCard eyebrow="Pengeluaran" title="Catatan Pengeluaran" sticker={`${expenses.length}`} stickerTone="peach">
      <div className="expense-summary">
        <span>Total Pengeluaran</span>
        <strong className="expense-total">{formatRupiah(total)}</strong>
      </div>

      {isLoading ? (
        <EmptyState loading />
      ) : expenses.length === 0 ? (
        <EmptyState message="Belum ada catatan pengeluaran." />
      ) : (
          <div className="expense-list">
            {expenses.map(expense => (
              <div key={expense.id} className="expense-item">
                <div className="stack-sm">
                  <span className="expense-desc">{expense.description}</span>
                  <span className="expense-date">
                    {expense.created_at ? formatDate(expense.created_at) : 'Hari ini'} {expense.category ? `• ${expense.category}` : ''}
                  </span>
                </div>
                <div className="expense-actions">
                  <span className="expense-amount">
                    {formatRupiah(Number(expense.amount || 0))}
                  </span>
                  <button
                    className="pixel-button"
                    type="button"
                    onClick={() => onDelete(expense.id)}
                    aria-label={`Hapus pengeluaran ${expense.description}`}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </PixelCard>
  )
}

export default ExpenseList
