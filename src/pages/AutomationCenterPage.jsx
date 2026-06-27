import { useAutomations } from '../hooks/useAutomations'
import { useWorkflowRuns } from '../hooks/useWorkflowRuns'
import { useAgentEvents } from '../hooks/useAgentEvents'
import AutomationList from '../components/automation/AutomationList'
import WorkflowRunList from '../components/workflow/WorkflowRunList'
import AgentActivityList from '../components/agent/AgentActivityList'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'

function AutomationCenterPage() {
  const { automations, isLoading: autoLoading, error: autoError, toggleAutomation, enabledCount } = useAutomations()
  const { runs, isLoading: runLoading, error: runError } = useWorkflowRuns()
  const { events, isLoading: evtLoading, error: evtError } = useAgentEvents()

  return (
    <div className="page-automation">
      <PixelCard eyebrow="Automation Center" title="Pusat Automasi" sticker={`${enabledCount}`} stickerTone="lavender">
        <div className="stat-grid">
          <StatCard label="Automasi" value={automations.length} tone="lavender" />
          <StatCard label="Aktif" value={enabledCount} tone="mint" />
          <StatCard label="Workflows" value={runs.length} tone="sky" />
          <StatCard label="Events" value={events.length} tone="peach" />
        </div>
      </PixelCard>

      <AutomationList automations={automations} isLoading={autoLoading} errorMessage={autoError} onToggle={toggleAutomation} />
      <WorkflowRunList runs={runs} isLoading={runLoading} errorMessage={runError} />
      <AgentActivityList events={events} isLoading={evtLoading} errorMessage={evtError} />
    </div>
  )
}

export default AutomationCenterPage
