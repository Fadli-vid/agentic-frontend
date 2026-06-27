import EmptyState from '../shared/EmptyState'
import PixelCard from '../cards/PixelCard'
import { formatRupiah, formatDate } from '../../lib/formatters'

function ExpenseList({ expenses, total, onDelete, isLoading }) {
  return (
    <PixelCard eyebrow="Pengeluaran" title="Catatan Pengeluaran" sticker={`${expenses.length}`} stickerTone="peach">
      <div className="expense-summary" style={{ padding: '12px', background: 'var(--surface-sunken)', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
        <span>Total Pengeluaran</span>
        <strong style={{ color: 'var(--accent-coral)' }}>{formatRupiah(total)}</strong>
      </div>

      {isLoading ? (
        <EmptyState loading />
      ) : expenses.length === 0 ? (
        <EmptyState message="Belum ada catatan pengeluaran." />
      ) : (
          <div className="expense-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {expenses.map(expense => (
              <div key={expense.id} className="expense-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="expense-desc" style={{ fontWeight: 'bold' }}>{expense.description}</span>
                  <span className="expense-date" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {expense.created_at ? formatDate(expense.created_at) : 'Hari ini'} {expense.category ? `• ${expense.category}` : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="expense-amount" style={{ fontWeight: 'bold', color: 'var(--accent-coral)' }}>
                    {formatRupiah(Number(expense.amount || 0))}
                  </span>
                  <button
                    className="pixel-button"
                    style={{ padding: '4px 8px', fontSize: '0.8rem' }}
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
