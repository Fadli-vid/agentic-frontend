import React, { useEffect } from 'react';

function PixelModal({ title, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal card">
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Tutup">
            ✖
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PixelModal;
