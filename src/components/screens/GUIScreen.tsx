import React, { ReactNode } from "react";
import {
  CenterWrapper
} from "@/components/wrappers";
import "@/styles/gui.css";

interface Props {
    children?: ReactNode
}

export const GUIScreen = ({ children } : Props) => {
    return (
    <div className="h-full overflow-hidden">
      <div className="gui-background" />
      <div className="h-full z-[15] relative">
        <div className="overflow-x-hidden overflow-y-auto h-full flex flex-col relative z-[15]">
          {children}
        </div>
      </div>
    </div>
    )
};
  
export default GUIScreen;