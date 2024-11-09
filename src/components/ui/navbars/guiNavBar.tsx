/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useRouter } from "@/lib/i18n";
import { Link } from "@/lib/i18n";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { start, home, about, education, projects, contact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import { availableLanguageTags } from "@/paraglide/runtime";
import { AsciiLogo } from "@/components/ascii";
import { AsciiWrapper } from "@/components/wrappers";
import { usePageHistory } from "@/utils/contexts";

export const GUINavBar = () => {
  const router = useRouter();
  const { currentPage } = usePageHistory();

  return (
    <nav className="relative w-full z-[100] shadow-sm text-[20px]">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-14 items-end">
        <div className="flex justify-between h-14 items-end">
          <nav className="flex gap-1 overflow-x-auto">
            <AsciiWrapper className="text-[1px] shrink-0">{AsciiLogo}</AsciiWrapper>
            <Link
                href="/os/gui"
                className={`shrink-0 ${currentPage === "/os/gui" ? 'underline underline-offset-[10px]' : ''}`}
                prefetch={false}
                >
                {home()}
            </Link>
            <Link
                href="/os/gui/about"
                className={`shrink-0 ${currentPage === "/os/gui/about" ? 'underline underline-offset-[10px]' : ''}`}
                prefetch={false}
                >
                {about()}
            </Link>
            <Link
                href="/os/gui/education"
                className={`shrink-0 ${currentPage === "/os/gui/education" ? 'underline underline-offset-[10px]' : ''}`}
                prefetch={false}
                >
                {education()}
            </Link>
            <Link
                href="/os/gui/projects"
                className={`shrink-0 ${currentPage === "/os/gui/projects" ? 'underline underline-offset-[10px]' : ''}`}
                prefetch={false}
                >
                {projects()}
            </Link>
            <Link
                href="/os/gui/contact"
                className={`shrink-0 ${currentPage === "/os/gui/contact" ? 'underline underline-offset-[10px]' : ''}`}
                prefetch={false}
                >
                {contact()}
            </Link>
          </nav>
        </div>
            <div className="flex justify-between h-14 items-center">
                <nav className="flex gap-10 overflow-x-auto">
                    <Link
                    href="/os"
                    className="shrink-0"
                    prefetch={false}
                    >
                    {start()}
                    </Link>
                    <Select onValueChange={(newValue) => {
                        router.push("/os/cli", { locale: newValue.toLowerCase() })
                    }} defaultValue={languageTag().toUpperCase()}>
                    <SelectTrigger className="w-[200px] animate-text-flicker">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[--color] text-[--color]">
                        {availableLanguageTags.map((tag : string) => {
                            return <SelectItem value={tag.toUpperCase()}>{tag.toUpperCase()}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
                </nav>
            </div>
        </div>
      </div>
    </nav>
  )
  }