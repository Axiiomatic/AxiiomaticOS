"use client"

import React from "react";
import config from "@/../config.json";
import {
  TextWrapper
} from "@/components/wrappers";
import { cliHook } from "@/utils/hooks";
import { usePreferences } from "@/utils/contexts";
import { useEffect, useState } from "react";
import "@/styles/cli.css";
import Typewriter from 'typewriter-effect';

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
            fontSize: '3vh',
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
  const { username, typingDelay } = usePreferences();

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

  const [outputFinished, setOutputFinished] = useState<boolean>(true);
  const [promptFinished, setPromptFinished] = useState<boolean>(false);


  useEffect(() => {
    if (output.length > 0) {
      setOutputFinished(output.length === 0);
      setPromptFinished(false);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [output]);

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
    <div className="h-full overflow-hidden">
      <MatrixRain/>
      <div className="h-full z-[15] relative">
        <div className="overflow-x-hidden overflow-y-auto h-full flex flex-col relative z-[15]" ref={outputRef}>
          { /* Print previous outputs */ }
              
          {output.map((line, index) => {
            if (index !== output.length - 1 || outputFinished)
              return line.split('\n').map((segment, segmentIndex) => {
                return <TextWrapper key={`${index}-${segmentIndex}`} className="w-[95vw] break-words align-text-top whitespace-pre-wrap items-center">{segment}</TextWrapper>
              })

            return <TextWrapper key={index} className="w-[95vw] break-words align-text-top whitespace-pre-wrap items-center">
              <Typewriter
                options={{
                  cursor: "■",
                  delay: typingDelay,
                  cursorClassName: "animate-blink ml-[0.125rem] relative z-[15]"
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(line)
                    .callFunction(() => {
                      setOutputFinished(true);
                    })
                    .start();
                }}
              />
            </TextWrapper>
          })}

          { /* Current input line */ }
              
          {outputFinished && <TextWrapper className="mr-[5px] h-full w-auto whitespace-nowrap pointer-events-none text-terminal align-text-top">
            {promptFinished ? `$ ${config.console_host}@${username} > ` : <Typewriter
                options={{
                  cursor: "■",
                  delay: typingDelay,
                  cursorClassName: "animate-blink ml-[0.125rem] relative z-[15]"
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`$ ${config.console_host}@${username} > `)
                    .callFunction(() => {
                      setPromptFinished(true);
                    })
                    .start();
                }}
              />
            }
                  
            {/* Input field - only show when prompt animation is done */}
            {promptFinished && (
              <div contentEditable={inputEditable}
                className={`
                  bg-transparent border-none w-full
                  align-text-top h-full
                  font-inherit outline-none
                  text-terminal caret-transparent
                  cursor-default animate-text-flicker
                  ml-2 break-words relative
                  after:content-["■"] after:animate-blink
                  after:ml-[0.125rem] after:relative after:z-[15]
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