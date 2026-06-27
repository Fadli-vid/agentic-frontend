import { useExpenses } from '../hooks/useExpenses'
import { useBudgets } from '../hooks/useBudgets'
import ExpenseList from '../components/expense/ExpenseList'
import BudgetWidget from '../components/widgets/BudgetWidget'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'

function BudgetManagerPage() {
  const { expenses, isLoading, error, removeExpense, total } = useExpenses()
  const { activeBudgets } = useBudgets()

  const budgetLimit = 1500000

  return (
    <div className="page-budget">
      <PixelCard eyebrow="Budget Manager" title="Manajer Budget" sticker={`${activeBudgets.length}`} stickerTone="coral">
        <div className="stat-grid">
          <StatCard label="Budget aktif" value={activeBudgets.length} tone="coral" />
          <StatCard label="Pengeluaran" value={expenses.length} tone="peach" />
        </div>
      </PixelCard>

      <BudgetWidget totalExpenses={total} budgetLimit={budgetLimit} />

      {error && <div className="status-message status-error">{error}</div>}

      <ExpenseList expenses={expenses} total={total} onDelete={removeExpense} isLoading={isLoading} />
    </div>
  )
}

export default BudgetManagerPage
