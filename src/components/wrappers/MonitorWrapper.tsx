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
  <AspectRatio ratio={4 / 3}>
    <CRTWrapper>
        {header && <HeaderWrapper>{header}</HeaderWrapper>}
        <TerminalWrapper>
          {children}
        </TerminalWrapper>
        <FooterWrapper>© 2024 Axiiomatic</FooterWrapper>
    </CRTWrapper>
  </AspectRatio>
  )
};
  
export default MonitorWrapper;