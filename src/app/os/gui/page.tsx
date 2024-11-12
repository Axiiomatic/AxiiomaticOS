'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { GUIAbout } from "@/components/screens";
import { GUINavBar } from "@/components/ui/navbars";

export default function GUI() {
  const { updatePageHistory } = usePageHistory();
  const { setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os/gui");
    setState("gui");
  }, [])

  return (
    <MonitorWrapper header={<GUINavBar />}>
      <GUIAbout />
    </MonitorWrapper>
  );
}
