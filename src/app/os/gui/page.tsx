'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { GUIScreen } from "@/components/Computer/UI";

export default function GUI() {
  const { updatePageHistory } = usePageHistory();
  const { setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os/gui");
    setState("gui");
  }, [])

  return (
    <MonitorWrapper>
      <GUIScreen />
    </MonitorWrapper>
  );
}
