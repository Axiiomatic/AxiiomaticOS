'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { StartScreen, LoadingScreen } from "@/components/screens";

export default function OS() {
  const { updatePageHistory } = usePageHistory();
  const { state, setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os");
    if (state === "title") setState("loading");
    else setState("start");
  }, [])

  return (
    <MonitorWrapper>
      {state === "start" ? <StartScreen /> : null}
      {state === "loading" ? <LoadingScreen /> : null}
    </MonitorWrapper>
  );
}
