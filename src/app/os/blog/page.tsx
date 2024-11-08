'use client'

import { useEffect } from "react";
import { MonitorWrapper } from "@/components/wrappers"
import { usePageHistory, useComputer } from "@/utils/contexts";
import { BlogScreen } from "@/components/screens";

export default function GUI() {
  const { updatePageHistory } = usePageHistory();
  const { setState } = useComputer();

  useEffect(() => {
    updatePageHistory("/os/blog");
    setState("blog");
  }, [])

  return (
    <MonitorWrapper>
      <BlogScreen />
    </MonitorWrapper>
  );
}
