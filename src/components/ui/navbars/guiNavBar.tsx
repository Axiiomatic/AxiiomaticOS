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
import { start, about, experience, projects, contact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import { availableLanguageTags } from "@/paraglide/runtime";
import { AsciiLogo } from "@/components/ascii";
import { AsciiWrapper } from "@/components/wrappers";
import { usePageHistory } from "@/utils/contexts";

export const GUINavBar = () => {
  const router = useRouter();
  const { currentPage } = usePageHistory();

  return (
    <nav className="w-full flex flex-wrap justify-between items-center px-4 py-2 min-h-12">
      <div className="flex flex-wrap items-center gap-4">
        <AsciiWrapper className="text-[0.05rem]">
          {AsciiLogo}
        </AsciiWrapper>
        
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/os/gui"
            className={`text-nav ${currentPage === "/os/gui" && 'underline underline-offset-8'}`}
            prefetch={false}
          >
            {about()}
          </Link>
          <Link
            href="/os/gui/experience"
            className={`text-nav ${currentPage === "/os/gui/experience" && 'underline underline-offset-8'}`}
            prefetch={false}
          >
            {experience()}
          </Link>
          <Link
            href="/os/gui/projects"
            className={`text-nav ${currentPage === "/os/gui/projects" && 'underline underline-offset-8'}`}
            prefetch={false}
          >
            {projects()}
          </Link>
          <Link
            href="/os/gui/contact"
            className={`text-nav ${currentPage === "/os/gui/contact" && 'underline underline-offset-8'}`}
            prefetch={false}
          >
            {contact()}
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/os"
          className="text-nav"
          prefetch={false}
        >
          {start()}
        </Link>
        <Link
          href="/os/cli"
          className="text-nav"
          prefetch={false}
        >
          CLI
        </Link>
        <Link
          href="/os/blog"
          className="text-nav"
          prefetch={false}
        >
          Blog
        </Link>
        <Select 
          onValueChange={(newValue) => {
            router.push(currentPage, { locale: newValue.toLowerCase()})
          }} 
          defaultValue={languageTag().toUpperCase()}
        >
          <SelectTrigger className="w-[6rem] text-nav animate-text-flicker">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-[--color] text-nav">
            {availableLanguageTags.map((tag : string) => (
              <SelectItem key={tag} value={tag.toUpperCase()}>
                {tag.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};