import React from "react";
import {
  CenterWrapper,
  AsciiWrapper
} from "@/components/wrappers";
import { AsciiBanner } from "@/components/ascii";
import { Link } from "@/lib/i18n";

export const StartScreen = () => {

    return (
        <CenterWrapper>
            <AsciiWrapper className="text-banner border-b-2 border-[--color] pb-4 mb-4">
                {AsciiBanner}
            </AsciiWrapper>

            <div className="flex flex-col items-center gap-4">
                <Link href="/os/gui" className="text-terminal">
                    GUI
                </Link>
                <Link href="/os/cli" className="text-terminal">
                    CLI
                </Link>
                <Link href="/os/blog" className="text-terminal">
                    Blog
                </Link>
            </div>
        </CenterWrapper>
    )
};

export default StartScreen;