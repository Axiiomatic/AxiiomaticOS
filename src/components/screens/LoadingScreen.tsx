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
import { LoadingHook } from "@/utils/hooks";
import { useEffect } from "react";

export const LoadingScreen = () => {
    const { setState } = useComputer();
    const {
        loadPrompt,
        loadingProgress
    } = LoadingHook();

    useEffect(() => {
        if (loadingProgress >= 150) setState("start");
    }, [loadingProgress]);

    return (
        <CenterWrapper>
            {loadingProgress < 125 ?
                // Show loading animation
                <div className="flex flex-col items-center w-full max-w-[800px]">
                    { /* Load animation */ }
                    <TextWrapper className="justify-center items-center text-banner">{loadPrompt}</TextWrapper>

                    { /* Progress bar */ }
                    <div className="w-full flex justify-center mt-4">
                        <pre className="text-banner">
                            {'[' + '='.repeat(clamp(Math.floor(loadingProgress), 0, 100)) + '.'.repeat(clamp(Math.ceil(100-loadingProgress), 0, 100)) + ']'}
                        </pre>
                    </div>
                </div> :

                // Show ASCII title banner
                <AsciiWrapper className="text-banner">
                    {AsciiBanner}
                </AsciiWrapper>
            }
            { /* Show ASCII logo if progress bar reaches 100% */ }
            <AsciiWrapper className="text-ascii mt-4">
                {loadingProgress >= 100 ? AsciiLogo : EmptyLogo}
            </AsciiWrapper>
        </CenterWrapper>
    )
};
  
export default LoadingScreen;