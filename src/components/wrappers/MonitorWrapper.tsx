'use client'

import React from "react";
import {
  CRTWrapper,
  TerminalWrapper,
  FooterWrapper
} from "./";
import { usePreferences } from "@/utils/contexts";

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
  <CRTWrapper textColor={theme.bgColor}>
    <TerminalWrapper textColor={theme.textColor}>
      {children}
    </TerminalWrapper>
    <FooterWrapper textColor={theme.textColor}>© 2024 Axiiomatic</FooterWrapper>
  </CRTWrapper>
  )
};
  
export default MonitorWrapper;