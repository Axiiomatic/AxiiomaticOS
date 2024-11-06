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
import { home } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import { availableLanguageTags } from "@/paraglide/runtime";

export const CLINavBar = () => {
const router = useRouter();

  return (
    <nav className="fixed inset-x-0 top-5 right-5 z-50 shadow-sm text-[20px]">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-end h-14 items-center">
            <div className="flex justify-between h-14 items-end">
                <nav className="hidden md:flex gap-10">
                    <Link
                    href="/os"
                    className=""
                    prefetch={false}
                    >
                    {home()}
                    </Link>
                    <Link
                    href="/os/gui"
                    className=""
                    prefetch={false}
                    >
                    GUI
                    </Link>
                    <Select onValueChange={(newValue : string) => {
                    router.push("/os/cli", { locale: newValue.toLowerCase()})
                }} defaultValue={languageTag().toUpperCase()}>
                    <SelectTrigger className="w-[180px] animate-text-flicker">
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