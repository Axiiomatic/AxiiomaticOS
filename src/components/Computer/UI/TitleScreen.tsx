import React from "react";
import {
  CenterWrapper
} from "@/components/wrappers";
import { AsciiLogo } from "@/components/ascii";

export const TitleScreen = () => {
    return (
        <CenterWrapper>
            {AsciiLogo}
        </CenterWrapper>
    )
};
  
export default TitleScreen;