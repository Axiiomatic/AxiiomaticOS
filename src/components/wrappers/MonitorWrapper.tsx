'use client'

import React from "react";
import {
  CRTWrapper,
  TerminalWrapper,
  FooterWrapper,
  HeaderWrapper
} from "./";

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const MonitorWrapper = ({ header, children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <CRTWrapper>
        {header && <HeaderWrapper>{header}</HeaderWrapper>}
        <TerminalWrapper>
          {children}
        </TerminalWrapper>
        <FooterWrapper>© 2024 Axiiomatic</FooterWrapper>
      </CRTWrapper>
    </div>
  );
};

export default MonitorWrapper;