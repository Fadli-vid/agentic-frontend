/**
 * Shared formatting utilities.
 * Extracted from duplicated code across components.
 */

const rupiahFormatter = new Intl.NumberFormat('id-ID')

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

/**
 * Format a number as Indonesian Rupiah.
 * @param {number} value
 * @returns {string} e.g. "Rp 1.500.000"
 */
export function formatRupiah(value) {
  return `Rp ${rupiahFormatter.format(value)}`
}

/**
 * Format a date string or Date object into Indonesian locale.
 * @param {string|Date|null} value
 * @returns {string} Formatted date or '-'
 */
export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return dateFormatter.format(date)
}

/**
 * Get today's date label in Indonesian locale.
 * @returns {string} e.g. "Jumat, 27 Juni"
 */
export function getTodayLabel() {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}
