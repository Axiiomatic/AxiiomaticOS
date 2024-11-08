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
          border-b-[1px] border-solid p-[50px]
          font-vt323
          pointer-events-auto animate-text-flicker
          ${className}
        `} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default HeaderWrapper;
  