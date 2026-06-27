import { useState } from 'react'
import { useAgent } from '../../context/AgentContext'

const QUICK_SUGGESTIONS = [
  'Rangkum jadwal hari ini',
  'Bantu fokus 25 menit',
  'Catat pengeluaran',
  'Buat pengingat baru',
  'Tambah tugas baru',
]

function CommandBar() {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { addCommand, recentCommands } = useAgent()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!input.trim()) return
    addCommand(input.trim())
    setInput('')
    setShowSuggestions(false)
    // TODO: Connect to backend agent endpoint
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="command-bar-wrapper">
      <form className="command-bar" onSubmit={handleSubmit}>
        <span className="command-prompt" aria-hidden="true">&gt;</span>
        <input
          className="command-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Ask Kobi anything..."
          aria-label="Masukkan perintah natural language"
        />
        <button className="pixel-button" type="submit">Kirim</button>
      </form>

      {showSuggestions && (
        <div className="command-suggestions">
          {recentCommands.length > 0 && (
            <div className="suggestion-group">
              <p className="suggestion-group-title">Terakhir</p>
              {recentCommands.slice(0, 3).map((cmd, i) => (
                <button
                  key={`recent-${i}`}
                  type="button"
                  className="suggestion-item"
                  onMouseDown={() => handleSuggestionClick(cmd)}
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}
          <div className="suggestion-group">
            <p className="suggestion-group-title">Saran cepat</p>
            {QUICK_SUGGESTIONS.map(s => (
              <button
                key={s}
                type="button"
                className="suggestion-item"
                onMouseDown={() => handleSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommandBar
