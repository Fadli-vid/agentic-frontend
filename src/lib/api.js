const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_KOBI_API_KEY

const buildUrl = (path) => {
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

const defaultHeaders = () => ({
  'Content-Type': 'application/json',
  'X-KOBI-KEY': API_KEY ?? '',
})

const parseJsonSafe = async (response) => {
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

const request = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      ...defaultHeaders(),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const body = await parseJsonSafe(response)
    let message = ''

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

export const fetchTasks = async () => {
  const data = await request('/api/tasks')
  return Array.isArray(data) ? data : []
}

export const fetchExpenses = async () => {
  const data = await request('/api/expenses')
  return Array.isArray(data) ? data : []
}

export const updateTaskStatus = (id, isCompleted) =>
  request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ is_completed: isCompleted }),
  })

export const deleteTask = (id) =>
  request(`/api/tasks/${id}`, {
    method: 'DELETE',
  })

export const deleteExpense = (id) =>
  request(`/api/expenses/${id}`, {
    method: 'DELETE',
  })
