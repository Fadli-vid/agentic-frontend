const rupiahFormatter = new Intl.NumberFormat('id-ID')

const formatRupiah = (value) => `Rp ${rupiahFormatter.format(value)}`

function ExpenseList({ expenses, total, onDelete }) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="card-eyebrow">💸 Pengeluaran</p>
          <h2 className="card-title">Catatan Pengeluaran</h2>
        </div>
        <span className="count-badge">{expenses.length}</span>
      </div>

      <div className="expense-summary">
        <span>Total Pengeluaran</span>
        <strong>{formatRupiah(total)}</strong>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">Belum ada catatan pengeluaran.</div>
      ) : (
        <ul className="list">
          {expenses.map(expense => (
            <li key={expense.id} className="list-item expense-item">
              <span className="expense-amount">
                {formatRupiah(Number(expense.amount || 0))}
              </span>
              <span className="expense-desc">{expense.description}</span>
              <button
                className="icon-button"
                type="button"
                onClick={() => onDelete(expense.id)}
                aria-label={`Hapus pengeluaran ${expense.description}`}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ExpenseList
