import React, { forwardRef } from 'react';

const PixelSelect = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div className={`pixel-select-wrapper ${className}`.trim()}>
      <select ref={ref} className="pixel-select" {...props}>
        {children}
      </select>
    </div>
  );
});
PixelSelect.displayName = 'PixelSelect';

export default PixelSelect;
