import { fetchArray, request } from './client'

export const fetchExpenses = () => fetchArray('/api/expenses')

export const deleteExpense = (id) =>
  request(`/api/expenses/${id}`, { method: 'DELETE' })
