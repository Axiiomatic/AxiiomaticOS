import React, { ReactNode } from "react";
import { hexToRGB } from "@/utils/functions";

interface Props {
    textColor: string
    className?: string
    children?: ReactNode
}

export const FooterWrapper = ({ textColor, className, children, ...props }: Props) => {
    
    const rgb = hexToRGB(textColor);
    const color = `${rgb.r},${rgb.g},${rgb.b}`
  
    return (
      <div 
        style={{
          color: textColor,
          borderTopColor: `rgba(${color}, 0.2)`,
          textShadow: `0_0_10px_rgba(${color},0.6),0_0_20px_rgba(${color},0.3)`
        }}
        className={`
          p-[10px] text-center z-[1]
          border-t-[1px] border-solid
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
  
  export default FooterWrapper;
  