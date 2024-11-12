'use client'

import { TextWrapper, AsciiWrapper } from "@/components/wrappers"
import { usePreferences } from "@/utils/contexts";
import { GUIScreen } from "@/components/screens";
import * as ascii from "@/components/ascii";
import * as m from "@/paraglide/messages";
import personal from "@/config/personal.json";
import { languageTag } from "@/paraglide/runtime";
import { joinList } from "@/utils/functions";
import Typewriter from 'typewriter-effect';
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import projects from "@/utils/bin/commands/projects";

export default function GUI() {
  const { typingDelay } = usePreferences();
  const lang = languageTag();
  const personalInfo = personal[lang];

  // State and refs for observing the second typewriter and measuring height
  const [typewriterHeight, setTypewriterHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate the height of the content before it starts typing
  useEffect(() => {
    if (contentRef.current) {
      // Measure the height of the content before animation starts
      setTypewriterHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <GUIScreen>
      <div className="flex flex-col items-center mt-10">
        <AsciiWrapper className="text-[0.1rem]">
          {ascii.AsciiLogo}
        </AsciiWrapper>
        <div className="flex flex-row mt-10 justify-center text-center">
            <div style={{ height: typewriterHeight }}>
                <TextWrapper>
                    <div ref={contentRef}>
                    <Typewriter
                    options={{
                        cursor: "",
                        delay: typingDelay,
                        wrapperClassName: "whitespace-pre-wrap"
                    }}
                    onInit={(typewriter) => {
                        typewriter
                        .typeString(`<span class="gui-small">${m.hi()}</span>`)
                        .pauseFor(500)
                        .typeString(`<span class="gui-small"> ${m.myName()}</span>\n`)
                        .pauseFor(500)
                        .changeDelay(typingDelay * 2)
                        .typeString(`<span class="gui-title">${personalInfo.name}</span>\n`)
                        .changeDelay(typingDelay)
                        .pauseFor(500)
                        .typeString(m.guiIntro({
                            occupation: personalInfo.occupation,
                            company: personalInfo.company,
                            status: personalInfo.status
                        }))
                        .start();
                    }}
                    />
                    </div>
                </TextWrapper>
            </div>
        </div>

        <div className="h-[700px]"></div>

        <AsciiWrapper className="text-[0.5rem] border-b-2 border-[--color] pb-4 mb-4">
          {ascii[`AsciiAboutMe_${lang}`]}
        </AsciiWrapper>

        <div className="flex flex-row w-[60vw] text-center justify-center">
          <TextWrapper>
            {m.guiAbout({
              first_name: personalInfo.name.split(" ")[0],
              aka: joinList(personalInfo.aka, m.or())
            })}

            {m.guiMore({
              occupation: personalInfo.occupation
            })}

            {m.guiSelf({
              years: parseInt(personalInfo.age) - 13,
              interests: joinList(personalInfo.interests.career, m.and())
            })}
            </TextWrapper>
        </div>

        <div className="h-[700px]"></div>

        <AsciiWrapper className="text-[0.5rem] border-b-2 border-[--color] pb-4 mb-4">
          {ascii[`AsciiUse_${lang}`]}
        </AsciiWrapper>

        <div className="flex w-[100vw] justify-between whitespace-pre">
          <div className="flex-1 flex-col text-center justify-center">
            <TextWrapper className="text-center justify-center">
              <h1 className="gui">{m.guiProgramming()}</h1>
            </TextWrapper>
            <TextWrapper className="text-start justify-center whitespace-pre-wrap">
              {personalInfo.skills.programming_languages.map((pl) => {
                return `\n${pl}`;
              })}
            </TextWrapper>
          </div>
          <div className="flex-1 flex-col text-center justify-center">
            <TextWrapper className="text-center justify-center">
              <h1 className="gui">{m.guiFL()}</h1>
            </TextWrapper>
            <TextWrapper className="text-start justify-center whitespace-pre-wrap">
              {personalInfo.skills.frameworks.map((fm) => {
                return `\n${fm}`;
              })}
              {personalInfo.skills.libraries.map((lib) => {
                return `\n${lib}`;
              })}
            </TextWrapper>
          </div>
          <div className="flex-1 flex-col text-center justify-center">
            <TextWrapper className="text-center justify-center">
              <h1 className="gui">{m.guiTools()}</h1>
            </TextWrapper>
            <TextWrapper className="text-start justify-center whitespace-pre-wrap">
              {personalInfo.skills.tools.map((tl) => {
                return `\n${tl}`;
              })}
            </TextWrapper>
          </div>
        </div>
      
        <div className="h-[700px]"></div>
      </div>
    </GUIScreen>
  );
}
