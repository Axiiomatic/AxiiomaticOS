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
import { start, home, about, skills, education, projects, contact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import { availableLanguageTags } from "@/paraglide/runtime";
import { AsciiLogo } from "@/components/ascii";
import { AsciiWrapper } from "@/components/wrappers";
import { usePageHistory } from "@/utils/contexts";

export const GUINavBar = () => {
  const router = useRouter();
  const { currentPage } = usePageHistory();

  return (
    <nav className="fixed inset-x-0 z-[100] shadow-sm text-[25px]">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
        <div className="flex justify-between h-14 items-end">
          <nav className="hidden md:flex gap-1">
            <AsciiWrapper className="text-[1px]">{AsciiLogo}</AsciiWrapper>
            <Link
                href="/os/gui"
                className={currentPage === "/os/gui" ? `underline underline-offset-[10px]` : ''}
                prefetch={false}
                >
                {home()}
            </Link>
            <Link
                href="/os/gui/about"
                className={currentPage === "/os/gui/about" ? `underline underline-offset-[10px]` : ''}
                prefetch={false}
                >
                {about()}
            </Link>
            <Link
                href="/os/gui/education"
                className={currentPage === "/os/gui/education" ? `underline underline-offset-[10px]` : ''}
                prefetch={false}
                >
                {education()}
            </Link>
            <Link
                href="/os/gui/projects"
                className={currentPage === "/os/gui/projects" ? `underline underline-offset-[10px]` : ''}
                prefetch={false}
                >
                {projects()}
            </Link>
            <Link
                href="/os/gui/contact"
                className={currentPage === "/os/gui/contact" ? `underline underline-offset-[10px]` : ''}
                prefetch={false}
                >
                {contact()}
            </Link>
          </nav>
        </div>
            <div className="flex justify-between h-14 items-center">
                <nav className="hidden md:flex gap-10">
                    <Link
                    href="/os"
                    className=""
                    prefetch={false}
                    >
                    {start()}
                    </Link>
                    <Link
                    href="/os/cli"
                    className=""
                    prefetch={false}
                    >
                    CLI
                    </Link>
                    <Link
                    href="/os/blog"
                    className=""
                    prefetch={false}
                    >
                    Blog
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