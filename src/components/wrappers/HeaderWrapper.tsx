import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const HeaderWrapper = ({ className, children, ...props }: Props) => {
  
    return (
      <header 
        className={`
          relative z-[20] text-header
          border-b border-[--color]
          font-vt323
          pointer-events-auto animate-text-flicker
          overflow-hidden
          ${className}
        `} 
        {...props}
      >
        {children}
      </header>
    );
  };
  
  export default HeaderWrapper;
  