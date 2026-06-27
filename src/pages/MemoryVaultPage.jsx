import { useState } from 'react'
import { useMemories } from '../hooks/useMemories'
import PixelCard from '../components/cards/PixelCard'
import StatCard from '../components/cards/StatCard'
import EmptyState from '../components/shared/EmptyState'

function MemorySection({ title, eyebrow, tone, memories }) {
  if (memories.length === 0) return null
  return (
    <PixelCard eyebrow={eyebrow} title={title} sticker={`${memories.length}`} stickerTone={tone}>
      <div className="memory-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {memories.map((m, i) => (
          <div key={m.id || i} className="memory-item" style={{ background: 'var(--surface-sunken)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span className="memory-time" style={{ fontWeight: 'bold', color: 'var(--accent-sky)' }}>{m.category || 'note'}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID') : ''}</span>
            </div>
            <p className="memory-text" style={{ margin: 0 }}>{m.title || m.content || '-'}</p>
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
          <div className="memory-list" style={{ marginTop: 12 }}>
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
