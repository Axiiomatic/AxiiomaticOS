'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { HomeScreen, LoadingScreen } from "@/components/Computer/UI";

export default function OS() {
  const { updatePageHistory } = usePageHistory();
  const { state, setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os");
    if (state === "title") setState("loading");
    else setState("home");
  }, [])

  return (
    <MonitorWrapper>
      {state === "home" ? <HomeScreen /> : null}
      {state === "loading" ? <LoadingScreen /> : null}
    </MonitorWrapper>
  );
}
