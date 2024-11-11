'use client'

import React, { ReactNode } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
}

export const TextWrapper = ({ 
  className, 
  children,
  ...props 
}: Props) => {
  if (typeof children === "string") return (
    <div 
      className={`
        flex items-start
        text-terminal
        pointer-events-auto select-none
        ${className}
      `}
      {...props}
      dangerouslySetInnerHTML={{ __html: children }}
    >
    </div>
  );

  return (
    <div 
      className={`
        flex items-start
        text-terminal
        pointer-events-auto select-none
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextWrapper;
  