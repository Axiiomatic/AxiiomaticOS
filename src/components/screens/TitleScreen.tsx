import React from "react";
import {
  CenterWrapper
} from "@/components/wrappers";
import { AsciiLogo } from "@/components/ascii";

export const TitleScreen = () => {
  return (
    <CenterWrapper>
      <div className="text-ascii">
        {AsciiLogo}
      </div>
    </CenterWrapper>
  );
};

export default TitleScreen;