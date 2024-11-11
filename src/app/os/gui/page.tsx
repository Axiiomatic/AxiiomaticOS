'use client'

import { useState, useEffect } from "react";
import { MonitorWrapper, TextWrapper, AsciiWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer, usePreferences } from "@/utils/contexts";
import { GUIScreen } from "@/components/screens";
import { GUINavBar } from "@/components/ui/navbars";
import { AsciiLogo } from "@/components/ascii";
import * as m from "@/paraglide/messages";
import personal from "@/config/personal.json";
import { languageTag } from "@/paraglide/runtime";
import { joinList } from "@/utils/functions";
import Typewriter from 'typewriter-effect';

export default function GUI() {
  const { updatePageHistory } = usePageHistory();
  const { setState } = useComputer();
  const { typingDelay } = usePreferences();

  const personalInfo = personal[languageTag()];

  useEffect(() => {
    updatePageHistory("/os/gui");
    setState("gui");
  }, [])

  return (
    <MonitorWrapper header={<GUINavBar />}>
      <GUIScreen>
        <div className="flex flex-col items-center mt-10">
          <AsciiWrapper className="text-[0.1rem]">
            {AsciiLogo}
          </AsciiWrapper>
          <div className="flex flex-row mt-10">
            <TextWrapper>
            <Typewriter
                options={{
                  cursor: "",
                  delay: typingDelay,
                  wrapperClassName: "whitespace-pre"
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`<span class="gui-small">${m.hi()}</span>`)
                    .pauseFor(500)
                    .typeString(`<span class="gui-small"> ${m.myName()}</span>\n`)
                    .pauseFor(500)
                    .changeDelay(typingDelay*2)
                    .typeString(`<span class="gui-title">${personalInfo.name}</span>\n`)
                    .changeDelay(typingDelay)
                    .typeString(`<span class="gui-aka">AKA ${joinList(personalInfo.aka, m.or())}</span>`)
                    .start();
                }}
              />
              
            </TextWrapper>
          </div>
        </div>
      </GUIScreen>
    </MonitorWrapper>
  );
}
