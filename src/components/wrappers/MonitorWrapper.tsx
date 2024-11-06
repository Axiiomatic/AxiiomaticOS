'use client'

import React from "react";
import {
  CRTWrapper,
  TerminalWrapper,
  FooterWrapper
} from "./";
import { AspectRatio } from "@/components/ui/aspect-ratio";


interface Props {
  children: React.ReactNode;
}

export const MonitorWrapper = ({ children }: Props) => {

  return (
  <AspectRatio ratio={4 / 3}>
    <CRTWrapper>
      <TerminalWrapper>
        {children}
      </TerminalWrapper>
      <FooterWrapper>© 2024 Axiiomatic</FooterWrapper>
    </CRTWrapper>
  </AspectRatio>
  )
};
  
export default MonitorWrapper;