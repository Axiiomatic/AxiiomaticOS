import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const CRTWrapper = ({ className, children, ...props }: Props) => {
    return (
      <div
      className={`
        relative overflow-hidden
        w-full h-full
        pointer-events-none
        flex flex-col justify-between
        bg-[#333333]
        bg-crt
        z-[5]
        
        before:content-[' '] before:block before:absolute before:inset-0
        before:bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)]
        before:bg-[length:100%_8px] before:z-[6] before:pointer-events-none
        
        after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-full
        after:bg-[linear-gradient(transparent,rgba(255,255,255,0.15),transparent)]
        after:z-[7] after:pointer-events-none after:animate-scanline

        ${className}
      `} {...props}>
        {children}
      </div>
    );
  };
  
  export default CRTWrapper;
  