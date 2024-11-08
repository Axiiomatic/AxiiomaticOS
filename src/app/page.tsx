'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory } from "@/utils/contexts";
import { TitleScreen } from "@/components/screens";

export default function Home() {
  const { updatePageHistory } = usePageHistory();

  useEffect(() => {
    updatePageHistory("/");
  }, [])

  return (
    <MonitorWrapper>
      <TitleScreen />
    </MonitorWrapper>
  );
}
