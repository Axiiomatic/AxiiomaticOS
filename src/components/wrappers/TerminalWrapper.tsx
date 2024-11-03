import React, { ReactNode } from "react";
import { hexToRGB } from "@/utils/functions";

interface Props {
    textColor: string
    className?: string
    children?: ReactNode
}

export const TerminalWrapper = ({ textColor, className, children, ...props }: Props) => {
    
    const rgb = hexToRGB(textColor);
    const color = `${rgb.r},${rgb.g},${rgb.b}`
  
    return (
      <div 
        style={{ color: textColor, textShadow: `0_0_10px_rgba(${color},0.6),0_0_20px_rgba(${color},0.3)` }}
        className={`
          flex flex-col overflow-y-auto p-[10px] flex-grow
          font-vt323 z-[1] leading-[1.6]
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
  