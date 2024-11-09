'use client'

import React from "react";
import {
  CRTWrapper,
  TerminalWrapper,
  FooterWrapper,
  HeaderWrapper
} from "./";
import { AspectRatio } from "@/components/ui/aspect-ratio";


interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const MonitorWrapper = ({ header, children }: Props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[133vh]"> {/* 4:3 ratio based on viewport height */}
        <AspectRatio ratio={4/3} className="bg-black">
          <CRTWrapper>
            {header && <HeaderWrapper>{header}</HeaderWrapper>}
            <TerminalWrapper>
              {children}
            </TerminalWrapper>
            <FooterWrapper>© 2024 Axiiomatic</FooterWrapper>
          </CRTWrapper>
        </AspectRatio>
      </div>
    </div>
  )
};

export default MonitorWrapper;