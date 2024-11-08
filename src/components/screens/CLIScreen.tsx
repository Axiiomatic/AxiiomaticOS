"use client"

import React from "react";
import config from "@/../config.json";
import {
  TextWrapper
} from "@/components/wrappers";
import { clamp } from "@/utils/functions";
import { cliHook } from "@/utils/hooks";
import { usePreferences } from "@/utils/contexts";
import { useEffect, useState } from "react";
import "@/styles/cli.css";

export const MatrixRain = () => {
  const [columns, setColumns] = useState<Array<{
    speed: number;
    delay: number;
    opacity: number;
    text: string;
  }>>([]);

  useEffect(() => {
    const newColumns = [...Array(80)].map(() => ({
      speed: 10 + Math.random() * 10,
      delay: -Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.5,
      text: [...Array(20)].map(() => 
        Math.random() > 0.5 ? '1' : '0'
      ).join('')
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="cli-background absolute top-0 left-0 w-full h-full animate-text-flicker">
      {columns.map((column, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-100%',
            left: `${i * 2.5}%`,
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            color: 'var(--bgColor)',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            animation: `matrix-rain ${column.speed}s linear infinite`,
            animationDelay: `${column.delay}s`,
            opacity: column.opacity
          }}
        >
          {column.text}
        </div>
      ))}
    </div>
  );
};

export const CLIScreen = () => {
  const { username, typingSpeed } = usePreferences();

  const {
    input,
    setInput,
    output,
    inputRef,
    inputEditable,
    outputRef,
    handleInput,
    keepFocus,
    scrollToBottom
  } = cliHook();

  const [typingDelay, setTypingDelay] = useState<number>(clamp(100-typingSpeed, 1, 100));
  const [outputTyping, setOutputTyping] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<boolean[]>([]);
  const [outputFinished, setOutputFinished] = useState<boolean>(true);
  const [promptFinished, setPromptFinished] = useState<boolean>(false);


  useEffect(() => {
    if (output.length > 0) {
      setOutputTyping(true);
      setOutputLines(new Array(output.slice(-1)[0].split('\n').length).fill(false));
      setOutputFinished(output.length === 0);
      setPromptFinished(false);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [output]);

  useEffect(() => {
    setTypingDelay(clamp(100-typingSpeed, 1, 100));
  }, [typingSpeed]);

  useEffect(() => {
    if (promptFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [promptFinished]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!promptFinished) {
        scrollToBottom();
      }
    }, 100);

    return () => clearInterval(scrollInterval);
  }, [promptFinished]);

  return (
    <div>
      <MatrixRain/>
      <div className="h-full z-[15] relative">
        <div className="overflow-x-hidden overflow-y-scroll !important flex flex-col h-full relative z-[15]" ref={outputRef}>
          { /* Print previous outputs */ }
              
          {output.map((line, index) => {
            // Split the line by newlines and map each segment
            const lastLine = index === output.length - 1;
            return line.split('\n').map((segment, segmentIndex) => {
              const prevLine = segmentIndex === 0 ? true : outputLines[segmentIndex - 1];
              return (prevLine || !lastLine) && (
                <TextWrapper className="w-[95vw] break-words align-text-top whitespace-pre-wrap items-center"
                  key={`${index}-${segmentIndex}`} delay={0} speed={typingDelay}
                  animate={lastLine && outputTyping}
                  onAnimationComplete={() => {
                    setOutputLines(() => {
                      const newLines = [...outputLines];
                      newLines[segmentIndex] = true;
                      return newLines;
                    });
                    if (segmentIndex === line.split('\n').length - 1) {
                      setOutputFinished(true);
                      setOutputTyping(false);
                    }
                  }}
                >
                  {/* Parse special characters and apply different font */}
                  {segment}
                </TextWrapper>
              )
            })
          })}

          { /* Current input line */ }
              
          {outputFinished && <TextWrapper className="h-full align-text-top items-start" animate={false}>
            {/* Animated Prompt */}
            <TextWrapper className="mr-[5px] h-full w-auto whitespace-nowrap pointer-events-none text-[30px] align-text-top"
              animate={true} speed={typingDelay} onAnimationStart={() => scrollToBottom()} onAnimationComplete={() => setPromptFinished(true)}
            >
              {`$ ${config.console_host}@${username} > `}
            </TextWrapper>
                  
            {/* Input field - only show when prompt animation is done */}
            {promptFinished && (
              <div contentEditable={inputEditable}
                className={`
                  bg-transparent border-none w-[80vw] align-text-top
                  h-full
                  font-inherit
                  outline-none text-[30px]
                  caret-transparent cursor-default
                  animate-text-flicker ml-[11px]
                  break-words 
                  relative

                  after:content-["■"] after:animate-blink
                  after:ml-[1px] after:relative after:z-[15]
                `} ref={inputRef} spellCheck={false}
                onInput={(e) => setInput(e.currentTarget.textContent || '')}
                onKeyDown={handleInput} 
                onBlur={keepFocus}
                onSelect={(e) => {
                  // Force cursor to end of content
                  const el = e.currentTarget;
                  const range = document.createRange();
                  const sel = window.getSelection();
                  range.selectNodeContents(el);
                  range.collapse(false);
                  sel?.removeAllRanges();
                  sel?.addRange(range);
                }}
                suppressContentEditableWarning={true}
              >
                {input}
              </div>
            )}
          </TextWrapper>}
        </div>
      </div>
    </div>
  )
};
  
export default CLIScreen;