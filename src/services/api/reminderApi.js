import { fetchArray } from './client'

export const fetchReminders = () => fetchArray('/api/reminders')
