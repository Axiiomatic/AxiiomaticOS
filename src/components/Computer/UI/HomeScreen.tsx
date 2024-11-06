import React from "react";
import {
  CenterWrapper,
  AsciiWrapper
} from "@/components/wrappers";
import { AsciiBanner } from "@/components/ascii";
import { Link } from "@/lib/i18n";

export const HomeScreen = () => {

    return (
        <CenterWrapper>
            <AsciiWrapper className="top-[0%] text-[20px] border-b-[5px] p-5 border-b-[--color]">
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