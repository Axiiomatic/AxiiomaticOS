"use client"

import React from "react";
import config from "@/../config.json";
import {
  TextWrapper,
  AsciiWrapper,
} from "@/components/wrappers";
import { AsciiLogo } from "@/components/ascii";
import { clamp } from "@/utils/functions";
import { cliHook } from "@/utils/hooks";
import { usePreferences } from "@/utils/contexts";
import { useEffect, useState } from "react";

interface themeColor {
  textColor: string;
  bgColor: string;
}

export const CLIScreen = () => {
  const { username, typingSpeed } = usePreferences() as { theme: themeColor; username: string; typingSpeed: number };

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

  if (!promptFinished) scrollToBottom();

  return (
    <div className="overflow-auto flex flex-col h-full" ref={outputRef}>
      { /* ASCII logo at the top left */ }
      <AsciiWrapper className="top-[1vh] left-[1vh] text-[5px]">
        {AsciiLogo}
      </AsciiWrapper>

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
              h-full pointer-events-none
              font-inherit
              outline-none text-[30px]
              caret-transparent cursor-default
              animate-text-flicker ml-[11px]
              break-words 

              after:content-["■"] after:animate-blink
              after:ml-[1px]
            `} ref={inputRef} spellCheck={false}
            onInput={(e) => setInput(e.currentTarget.textContent || '')}
            onKeyDown={handleInput} onBlur={keepFocus}
            suppressContentEditableWarning={true}
          >
            {input}
          </div>
        )}
      </TextWrapper>}
    </div>
  )
};
  
export default CLIScreen;