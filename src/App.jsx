import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import TaskManagerPage from './pages/TaskManagerPage'
import ReminderCenterPage from './pages/ReminderCenterPage'
import HabitTrackerPage from './pages/HabitTrackerPage'
import GoalPlannerPage from './pages/GoalPlannerPage'
import StudyPlannerPage from './pages/StudyPlannerPage'
import BudgetManagerPage from './pages/BudgetManagerPage'
import MemoryVaultPage from './pages/MemoryVaultPage'
import AutomationCenterPage from './pages/AutomationCenterPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.TASKS} element={<TaskManagerPage />} />
        <Route path={ROUTES.REMINDERS} element={<ReminderCenterPage />} />
        <Route path={ROUTES.HABITS} element={<HabitTrackerPage />} />
        <Route path={ROUTES.GOALS} element={<GoalPlannerPage />} />
        <Route path={ROUTES.STUDY} element={<StudyPlannerPage />} />
        <Route path={ROUTES.BUDGET} element={<BudgetManagerPage />} />
        <Route path={ROUTES.MEMORY} element={<MemoryVaultPage />} />
        <Route path={ROUTES.AUTOMATION} element={<AutomationCenterPage />} />
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App