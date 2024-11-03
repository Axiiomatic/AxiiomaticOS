"use client"

import React from "react";
import config from "@/../config.json";
import {
  CRTWrapper,
  TerminalWrapper,
  TextWrapper,
  AsciiWrapper,
  LoadingWrapper,
  OverlayWrapper,
  FooterWrapper
} from "./wrappers";
import { AsciiBanner, AsciiLogo, EmptyLogo } from "./ascii";
import { clamp } from "@/utils/functions";
import { monitorHook } from "@/utils/hooks";
import { useTheme, usePageHistory } from "@/utils/contexts";
import { useEffect, useState } from "react";

interface ThemeColor {
  textColor: string;
  bgColor: string;
}

export const Monitor = () => {
  const { color, username, typingSpeed } = useTheme() as { color: ThemeColor; username: string; typingSpeed: number };

  const { currentPage } = usePageHistory();

  const {
    input,
    setInput,
    output,
    on,
    loading,
    loadPrompt,
    loadingProgress,
    turnOn,
    turnOff,
    inputRef,
    outputRef,
    handleInput,
    togglePower,
    keepFocus,
    scrollToBottom
  } = monitorHook();

  const [typingDelay, setTypingDelay] = useState<number>(clamp(100-typingSpeed, 1, 100));
  const [outputTyping, setOutputTyping] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<boolean[]>([]);
  const [outputFinished, setOutputFinished] = useState<boolean>(true);
  const [promptFinished, setPromptFinished] = useState<boolean>(false);

  useEffect(() => {
    togglePower(currentPage !== "os");
  }, [currentPage]);

  useEffect(() => {
    if (output.length > 0) {
      setOutputTyping(true);
      setOutputLines(new Array(output.slice(-1)[0].split('\n').length).fill(false));
      setOutputFinished(output.length === 0);
      setPromptFinished(false);
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
    <div>
      { /* Animated overlays when toggling power */ }
      <OverlayWrapper className={`
        ${turnOff ? "animate-turn-off" : ""}
      `}/>
      <OverlayWrapper className={`
        ${turnOn ? "animate-turn-on" : ""}
      `}/>
      { on ? 
      <CRTWrapper textColor={color.bgColor}>
        <TerminalWrapper textColor={color.textColor}>
          {loading ?
          // Computer is still loading, show loading screen
          <LoadingWrapper>
            {loadingProgress < 125 ?
              // Show loading animation
              <div>
                { /* Load animation */ }
                <TextWrapper className="justify-center items-center" animate={false}>{loadPrompt}</TextWrapper>

                { /* Progress bar */ }
                <div className={`
                  w-[80vw] h-[40px] pointer-events-none
                  text-center mt-[20px]
                `}>
                  {'[' + '='.repeat(clamp(Math.floor(loadingProgress), 0, 100)) + '.'.repeat(clamp(Math.ceil(100-loadingProgress), 0, 100)) + ']'}
                </div>
              </div> :
              // Show ASCII title banner
              <AsciiWrapper className="top-[0%] text-[20px]">
                {AsciiBanner}
              </AsciiWrapper>
            }
            { /* Show ASCII logo if progress bar reaches 100% */ }
            <AsciiWrapper className="top-[5%] text-[5px]">
              {loadingProgress >= 100 ? AsciiLogo : EmptyLogo}
            </AsciiWrapper>
          </LoadingWrapper> :
          // Computer is ready, show terminal
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
                console.log()
                const prevLine = segmentIndex === 0 ? true : outputLines[segmentIndex - 1];
                return (prevLine || !lastLine) && (
                  <TextWrapper 
                    className="w-[95vw] break-words align-text-top whitespace-pre-wrap items-center"
                    key={`${index}-${segmentIndex}`}
                    delay={0}
                    speed={typingDelay}
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
              <TextWrapper 
                className="mr-[5px] h-full w-auto whitespace-nowrap pointer-events-none text-[30px] align-text-top"
                animate={true}
                speed={typingDelay}
                onAnimationStart={() => scrollToBottom()}
                onAnimationComplete={() => setPromptFinished(true)}
              >
                {`$ ${config.console_host}@${username} > `}
              </TextWrapper>
              
              {/* Input field - only show when prompt animation is done */}
              {promptFinished && (
                <div
                  contentEditable={true}
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
                  `} 
                  ref={inputRef}
                  spellCheck={false}
                  onInput={(e) => setInput(e.currentTarget.textContent || '')}
                  onKeyDown={handleInput}
                  onBlur={keepFocus}
                  suppressContentEditableWarning={true}
                >
                  {input}
                </div>
              )}
            </TextWrapper>}
          </div>
          }
        </TerminalWrapper>
        <FooterWrapper textColor={color.textColor}>© 2024 Axiiomatic</FooterWrapper>
      </CRTWrapper> : <></>
      }
    </div>
  )
};
  
export default Monitor;