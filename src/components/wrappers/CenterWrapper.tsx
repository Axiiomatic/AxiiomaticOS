import React, { ReactNode } from "react";

interface Props {
    className?: string
    children?: ReactNode
}

export const CenterWrapper = ({ className, children, ...props }: Props) => {
  return (
    <pre className={`
        absolute top-0 left-0 right-0 bottom-0
        flex flex-col items-center justify-center
        z-[5] select-none text-terminal
        ${className}
    `} {...props}>
        {children}
    </pre>
  );
};
  
  export default CenterWrapper;