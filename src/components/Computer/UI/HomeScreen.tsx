import React from "react";
import {
  CenterWrapper
} from "@/components/wrappers";
import { AsciiBanner } from "@/components/ascii";

export const HomeScreen = () => {
    return (
        <CenterWrapper>
            {AsciiBanner}

            Display
            CLI
        </CenterWrapper>
    )
};

export default HomeScreen;