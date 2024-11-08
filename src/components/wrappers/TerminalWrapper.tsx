import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const TerminalWrapper = ({  className, children, ...props }: Props) => {
  
    return (
      <div 
        className={`
          text-[--color] shadow-0_0_10px_val(--color),0_0_20px_val(--color)
          flex flex-col overflow-y-auto p-[10px] flex-grow
          font-vt323 z-[10] leading-[1.6]
          pointer-events-auto animate-text-flicker
          ${className}
        `} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default TerminalWrapper;
  