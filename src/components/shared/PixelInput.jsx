import React, { forwardRef } from 'react';

const PixelInput = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input 
      ref={ref}
      className={`pixel-input ${className}`.trim()} 
      {...props} 
    />
  );
});
PixelInput.displayName = 'PixelInput';

export default PixelInput;
