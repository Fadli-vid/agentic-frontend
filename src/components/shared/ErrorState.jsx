function ErrorState({ message, retryAction }) {
  return (
    <div className="empty-state empty-state-error">
      <span className="error-icon" aria-hidden="true">⚠️</span>
      <p>{message || 'Terjadi kesalahan saat memuat data.'}</p>
      {retryAction && (
        <button type="button" className="pixel-button" onClick={retryAction}>
          Coba Lagi
        </button>
      )}
    </div>
  )
}

export default ErrorState
