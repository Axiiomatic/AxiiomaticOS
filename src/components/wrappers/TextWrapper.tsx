'use client'

import React, { ReactNode, useState, useEffect } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
    animate?: boolean;
    delay?: number;
    speed?: number;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
}

export const TextWrapper = ({ 
  className, 
  children, 
  animate = true,
  delay = 0,
  speed = 30,
  onAnimationStart,
  onAnimationComplete,
  ...props 
}: Props) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [funcCalled, setFuncCalled] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!animate || typeof children !== 'string') {
      setDisplayedText(children as string);
    } else {
      setDisplayedText('');
      setCompleted(false);
    }
  }, [children, animate]);

  useEffect(() => {
    if (!animate) return;
    if (onAnimationStart && !funcCalled) {
      onAnimationStart();
      setFuncCalled(true);
    }
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, animate]);

  useEffect(() => {
    if (!animate || !started || typeof children !== 'string') {
      return;
    }

    if (displayedText.length < (children?.length || 0)) {
      const timeout = setTimeout(() => {
        setDisplayedText(children.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onAnimationComplete && !completed) {
      onAnimationComplete();
      setCompleted(true);
    }
  }, [displayedText, children, speed, started, animate, onAnimationComplete, completed]);

  // If children is a string and we're animating, use dangerouslySetInnerHTML
  if (typeof children === 'string') {
    return (
      <div 
        className={`
          flex items-start
          text-[30px]
          pointer-events-auto select-none
          ${className}
        `} 
        {...props}
        dangerouslySetInnerHTML={{ __html: displayedText }}
      />
    );
  }

  // Otherwise, render children directly
  return (
    <div 
      className={`
        flex items-start
        text-[30px]
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
  