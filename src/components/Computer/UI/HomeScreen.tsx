import React from "react";
import {
  CenterWrapper,
  AsciiWrapper
} from "@/components/wrappers";
import { AsciiBanner } from "@/components/ascii";
import { Link } from "@/lib/i18n";
import { hexToRGB } from "@/utils/functions";
import { usePreferences } from "@/utils/contexts";

interface themeColor {
    textColor: string;
  }

export const HomeScreen = () => {
    const { theme } = usePreferences() as { theme: themeColor };
    const rgb = hexToRGB(theme.textColor);
    const color = `${rgb.r},${rgb.g},${rgb.b}`

    return (
        <CenterWrapper>
            <AsciiWrapper style={{
                borderBottomColor: `rgba(${color}, 1)`
            }} className="top-[0%] text-[20px] border-b-[5px] p-5">
                {AsciiBanner}
            </AsciiWrapper>

            <div className={`
            flex flex-col p-5
            text-[40px] items-center
            `}>
                <Link href="/os/gui">GUI</Link>
                <Link href="/os/cli">CLI</Link>
                <Link href="/os/blog">Blog</Link>
            </div>
        </CenterWrapper>
    )
};

export default HomeScreen;