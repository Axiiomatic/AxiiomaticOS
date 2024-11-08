'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { CLIScreen } from "@/components/screens";
import { CLINavBar } from "@/components/ui/navbars";

export default function CLI() {
  const { updatePageHistory } = usePageHistory();
  const { setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os/cli");
    setState("cli");
  }, [])

  return (
    <MonitorWrapper header={<CLINavBar />}>
      <CLIScreen />
    </MonitorWrapper>
  );
}
