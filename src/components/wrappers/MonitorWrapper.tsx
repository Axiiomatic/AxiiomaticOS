'use client'

import React from "react";
import {
  CRTWrapper,
  TerminalWrapper,
  FooterWrapper
} from "./";
import { usePreferences } from "@/utils/contexts";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface themeColor {
  textColor: string;
  bgColor: string;
}

interface Props {
  children: React.ReactNode;
}

export const MonitorWrapper = ({ children }: Props) => {
  const { theme } = usePreferences() as { theme: themeColor };

  return (
  <AspectRatio ratio={4 / 3}>
    <CRTWrapper textColor={theme.bgColor}>
      <TerminalWrapper textColor={theme.textColor}>
        {children}
      </TerminalWrapper>
      <FooterWrapper textColor={theme.textColor}>© 2024 Axiiomatic</FooterWrapper>
    </CRTWrapper>
  </AspectRatio>
  )
};
  
export default MonitorWrapper;