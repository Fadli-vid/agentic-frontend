import React, { forwardRef } from 'react';

const PixelTextarea = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <textarea 
      ref={ref}
      className={`pixel-input pixel-textarea ${className}`.trim()} 
      {...props} 
    />
  );
});
PixelTextarea.displayName = 'PixelTextarea';

export default PixelTextarea;
