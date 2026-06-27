import { ROUTES } from './routes'

/**
 * Sidebar navigation items.
 * Drives the Sidebar component rendering — add/reorder here, not in JSX.
 */
export const NAVIGATION = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'icon-dashboard', tone: 'sky' },
  { label: 'Tasks', path: ROUTES.TASKS, icon: 'icon-task', tone: 'mint' },
  { label: 'Reminders', path: ROUTES.REMINDERS, icon: 'icon-reminder', tone: 'yellow' },
  { label: 'Habits', path: ROUTES.HABITS, icon: 'icon-habit', tone: 'mint' },
  { label: 'Goals', path: ROUTES.GOALS, icon: 'icon-goal', tone: 'lavender' },
  { label: 'Study', path: ROUTES.STUDY, icon: 'icon-study', tone: 'peach' },
  { label: 'Budget', path: ROUTES.BUDGET, icon: 'icon-budget', tone: 'coral' },
  { label: 'Memory', path: ROUTES.MEMORY, icon: 'icon-memory', tone: 'sky' },
  { label: 'Automation', path: ROUTES.AUTOMATION, icon: 'icon-automation', tone: 'lavender' },
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: 'icon-analytics', tone: 'peach' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'icon-settings', tone: 'yellow' },
]
