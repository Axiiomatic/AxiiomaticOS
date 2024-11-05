'use client'

import React from "react";
import {
  TextWrapper,
  AsciiWrapper,
  CenterWrapper,
} from "@/components/wrappers";
import { AsciiBanner, AsciiLogo, EmptyLogo } from "@/components/ascii";
import { useComputer } from "@/utils/contexts";
import { clamp } from "@/utils/functions";
import { loadingHook } from "@/utils/hooks";
import { useEffect } from "react";

export const LoadingScreen = () => {
    const { setState } = useComputer();
    const {
        loadPrompt,
        loadingProgress
    } = loadingHook();

    useEffect(() => {
        if (loadingProgress >= 150) setState("home");
    }, [loadingProgress]);

    return (
        <CenterWrapper>
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
        </CenterWrapper>
    )
};
  
export default LoadingScreen;