/**
 * Status labels and CSS class normalization.
 */
export const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ARCHIVED: 'archived',
  UNKNOWN: 'unknown',
}

/**
 * Normalize a status string into a CSS-safe class name.
 * e.g. "In Progress" → "status-in-progress"
 */
export function normalizeStatusClass(status) {
  if (!status) return 'status-unknown'
  return `status-${String(status).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}
