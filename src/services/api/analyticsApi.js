import { request } from './client'

export const fetchDashboard = () => request('/api/analytics/dashboard')

export const fetchProductivityScore = () => request('/api/analytics/productivity-score')

export const fetchWeeklySummary = () => request('/api/analytics/weekly-summary')

export const fetchMonthlySummary = () => request('/api/analytics/monthly-summary')
