import React from 'react';

function PixelToolbar({ children, className = '' }) {
  return (
    <div className={`page-toolbar ${className}`.trim()}>
      {children}
    </div>
  );
}
export default PixelToolbar;
