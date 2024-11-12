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

export default function GUI() {
  const { typingDelay } = usePreferences();
  const lang = languageTag();
  const personalInfo = personal[lang];

  // State and refs for observing the second typewriter and measuring height
  const [isSecondVisible, setIsSecondVisible] = useState<boolean>(false);
  const [typewriterHeights, setTypewriterHeights] = useState<number[]>([0, 0]);
  const typewriterRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  // Calculate the height of the content before it starts typing
  useEffect(() => {
    for (let i = 0; i < contentRefs.current.length; i++) {
        if (contentRefs.current[i]) {
            // Measure the height of the content before animation starts
            const height = contentRefs.current[i].scrollHeight;
            setTypewriterHeights((prev) => {
                const newHeights = prev;
                newHeights[i] = height;
                return newHeights
            });
        }
    }
  }, []);

  // Set up Intersection Observer for the second Typewriter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSecondVisible(true);
          observer.disconnect(); // Stop observing once it's visible in the center
        }
      },
      {
        root: null, // Defaults to viewport
        rootMargin: '0px 0px -25% 0px', // Triggers slightly above the exact middle of the screen
        threshold: 0.5, // Adjust threshold as needed
      }
    );

    for (let i = 0; i < typewriterRefs.current.length; i++) {
        if (typewriterRefs.current[i]) {
            observer.observe(typewriterRefs.current[i]);
          }
    }

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <GUIScreen>
      <div className="flex flex-col items-center mt-10">
        <AsciiWrapper className="text-[0.1rem]">
          {ascii.AsciiLogo}
        </AsciiWrapper>
        <div className="flex flex-row mt-10 w-[60vw] justify-center text-center">
            <div style={{ height: typewriterHeights[0] }}>
                <TextWrapper>
                    <div ref={(e) => {contentRefs.current.push(e as HTMLDivElement)}}>
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

        {/* Reduced Spacer to make the second typewriter easier to reach */}
        <div className="h-[700px]"></div> {/* Adjust height as needed */}

        <AsciiWrapper className="text-[0.5rem] border-b-2 border-[--color] pb-4 mb-4">
          {ascii[`AsciiAboutMe_${lang}`]}
        </AsciiWrapper>

        {/* Second Typewriter, starts only when close to centered on screen */}
        <div ref={(e) => {typewriterRefs.current.push(e as HTMLDivElement)}}>
          {isSecondVisible && (
            <div className="flex flex-row w-[60vw] text-center justify-center">
            <TextWrapper>
                <div style={{ height: typewriterHeights[1] }}>
              {/* Pre-calculate the height of the second Typewriter content */}
              <div ref={(e) => {contentRefs.current.push(e as HTMLDivElement)}}>
                <Typewriter
                  options={{
                    cursor: "",
                    delay: typingDelay,
                    wrapperClassName: "whitespace-pre-wrap"
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(m.guiAbout({
                        first_name: personalInfo.name.split(" ")[0],
                        aka: joinList(personalInfo.aka, m.or())
                      }))
                      .pauseFor(500)
                      .typeString(m.guiMore({
                        occupation: personalInfo.occupation
                      }))
                      .pauseFor(500)
                      .typeString(m.guiSelf({
                        years: parseInt(personalInfo.age) - 13,
                        interests: joinList(personalInfo.interests.career, m.and())
                      }))
                      .start();
                  }}
                />
              </div>
              </div>
            </TextWrapper>
            </div>
          )}
        </div>

        {/* Extra padding at the bottom to allow scrolling further */}
        <div className="h-[500px]"></div> {/* Adjust height as needed */}
      </div>
    </GUIScreen>
  );
}
