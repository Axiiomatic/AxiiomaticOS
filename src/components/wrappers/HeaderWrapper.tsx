import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const HeaderWrapper = ({ className, children, ...props }: Props) => {
  
    return (
      <div 
        className={`
          relative flex items-center justify-center z-[20] text-[--color] border-b-[--color]
          border-b-[0.1vmin] border-solid p-[5vh]
          font-vt323 text-[2vmin]
          pointer-events-auto animate-text-flicker
          overflow-hidden
          ${className}
        `} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default HeaderWrapper;
  