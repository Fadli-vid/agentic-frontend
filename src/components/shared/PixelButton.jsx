import React from 'react';

function PixelButton({ children, variant = 'primary', type = 'button', className = '', ...props }) {
  const baseClass = variant === 'icon' ? 'icon-button' : 'pixel-button';
  return (
    <button type={type} className={`${baseClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
export default PixelButton;
