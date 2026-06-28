import { useState } from 'react'
import { useMemories } from '../hooks/useMemories'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'
import EmptyState from '../components/shared/EmptyState'

function MemorySection({ title, eyebrow, tone, memories }) {
  if (memories.length === 0) return null
  return (
    <PixelCard eyebrow={eyebrow} title={title} sticker={`${memories.length}`} stickerTone={tone}>
      <div className="memory-list">
        {memories.map((m, i) => (
          <div key={m.id || i} className="memory-item is-detailed">
            <div className="memory-item-header">
              <span className="memory-time is-accent">{m.category || 'note'}</span>
              <span className="memory-date">{m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID') : ''}</span>
            </div>
            <p className="memory-text">{m.title || m.content || '-'}</p>
          </div>
        ))}
      </div>
    </PixelCard>
  )
}

function MemoryVaultPage() {
  const { memories, pinned, preferences, knowledge, recent, isLoading, search, searchResults, clearSearch } = useMemories()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    const val = e.target.value
    setQuery(val)
    if (val.trim()) {
      search(val)
    } else {
      clearSearch()
    }
  }

  return (
    <div className="page-memory">
      <PixelCard eyebrow="Memory Vault" title="Gudang Memori" sticker={`${memories.length}`} stickerTone="lavender">
        <div className="stat-grid">
          <StatCard label="Total" value={memories.length} tone="lavender" />
          <StatCard label="Pinned" value={pinned.length} tone="coral" />
          <StatCard label="Recent" value={recent.length} tone="sky" />
        </div>
      </PixelCard>

      <PixelCard eyebrow="Search" title="Cari Memori" stickerTone="sky">
        <input className="search-input" type="text" placeholder="Cari memori..." value={query} onChange={handleSearch} />
        {searchResults && (
          <div className="memory-list mt-3">
            {searchResults.length === 0 ? (
              <EmptyState message="Tidak ada hasil ditemukan." />
            ) : (
              searchResults.map((m, i) => (
                <div key={m.id || i} className="memory-item">
                  <span className="memory-time">{m.category || 'note'}</span>
                  <span className="memory-text">{m.title || m.content || '-'}</span>
                </div>
              ))
            )}
          </div>
        )}
      </PixelCard>

      {isLoading ? <EmptyState loading /> : (
        <>
          <MemorySection title="Memori Penting" eyebrow="Pinned" tone="coral" memories={pinned} />
          <MemorySection title="Preferensi" eyebrow="Preferences" tone="peach" memories={preferences} />
          <MemorySection title="Pengetahuan" eyebrow="Knowledge" tone="mint" memories={knowledge} />
          <MemorySection title="Terbaru" eyebrow="Recent" tone="sky" memories={recent} />

          {/* TODO: Timeline section */}
          <PixelCard eyebrow="Timeline" title="Jejak Memori" sticker="Soon" stickerTone="yellow">
            <EmptyState message="Timeline memori akan segera hadir." />
          </PixelCard>

          {/* TODO: Archived section */}
          <PixelCard eyebrow="Archived" title="Arsip" sticker="Soon" stickerTone="yellow">
            <EmptyState message="Arsip memori akan segera hadir." />
          </PixelCard>
        </>
      )}
    </div>
  )
}

export default MemoryVaultPage
