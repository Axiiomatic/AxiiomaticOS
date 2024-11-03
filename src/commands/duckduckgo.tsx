import { ThemeContextInterface } from "@/utils/contexts";

const func = (context: ThemeContextInterface, args: string[]) => {
 window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searched DuckDuckGo for "${args.join(' ')}"`;
};

const description = "Search for a term on DuckDuckGo";

export default {
  func,
  description
};