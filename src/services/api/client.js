/**
 * Shared HTTP client for all API modules.
 * Extracted from lib/api.js — single source of truth for request logic.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_KOBI_API_KEY

export function buildUrl(path) {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not set')
  }

  const base = API_BASE_URL.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  if (base.endsWith('/api') && cleanPath.startsWith('/api/')) {
    return `${base}${cleanPath.slice(4)}`
  }

  return `${base}${cleanPath}`
}

function defaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-KOBI-KEY': API_KEY ?? '',
  }
}

async function parseJsonSafe(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * Make an authenticated API request.
 *
 * @param {string} path    API endpoint path (e.g. '/api/tasks')
 * @param {object} options Fetch options (method, body, headers)
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} With .status and .body properties on failure
 */
export async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      ...defaultHeaders(),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const body = await parseJsonSafe(response)
    let message;

    if (response.status === 401 || response.status === 403) {
      message = `API key dashboard belum valid (HTTP ${response.status}).`
    } else if (body?.message) {
      message = `${body.message} (HTTP ${response.status}).`
    } else {
      message = `Request gagal (HTTP ${response.status}).`
    }
    const error = new Error(message)

    error.status = response.status
    error.body = body

    throw error
  }

  return parseJsonSafe(response)
}

/**
 * Safely fetch an array endpoint, returning [] on non-array responses.
 *
 * @param {string} path API endpoint
 * @returns {Promise<Array>}
 */
export async function fetchArray(path) {
  const data = await request(path)
  return Array.isArray(data) ? data : []
}
