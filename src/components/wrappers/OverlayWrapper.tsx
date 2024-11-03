import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const OverlayWrapper = ({ className, children, ...props }: Props) => {
  return <>
    <div className={`
          absolute top-0 left-0 w-full h-full
          bg-white z-[5] scale-0 pointer-events-none
          ${className}
        `} {...props}>
      {children}
    </div>
  </>;
};
  
  export default OverlayWrapper;
  