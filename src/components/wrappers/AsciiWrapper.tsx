import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const AsciiWrapper = ({ className, children, ...props }: Props) => {
  return (
    <pre className={`
        relative mb-[10px]
        font-['Courier_New',Courier,monospace]
        whitespace-pre z-[1]
        pointer-events-none select-none
        ${className}
      `} {...props}>
        {children}
      </pre>
  );
};
  
  export default AsciiWrapper;