import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const FooterWrapper = ({ className, children, ...props }: Props) => {
  
    return (
      <div 
        className={`
          p-[10px] text-center z-[10] text-[--color] border-t-[--color]
          border-t-[1px] border-solid
          font-vt323 text-[2vmin]
          pointer-events-auto animate-text-flicker
          ${className}
        `} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default FooterWrapper;
  