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
import { start } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import { availableLanguageTags } from "@/paraglide/runtime";
import { AsciiLogo } from "@/components/ascii";
import { AsciiWrapper } from "@/components/wrappers";

export const CLINavBar = () => {
const router = useRouter();

return (
  <nav className="fixed inset-x-0 z-[100] shadow-sm text-[25px]">
    <div className="w-full mx-auto px-4">
      <div className="flex justify-between h-14 items-center">
      <div className="flex justify-between h-14 items-end">
        <nav className="hidden md:flex gap-1">
          <AsciiWrapper className="text-[1px]">{AsciiLogo}</AsciiWrapper>
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
                  href="/os/gui"
                  className=""
                  prefetch={false}
                  >
                  GUI
                  </Link>
                  <Link
                  href="/os/blog"
                  className=""
                  prefetch={false}
                  >
                  Blog
                  </Link>
                  <Select onValueChange={(newValue) => {
                      router.push("/os/cli", { locale: newValue.toLowerCase()})
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