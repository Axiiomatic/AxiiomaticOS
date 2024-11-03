import { ThemeContextInterface } from "@/utils/contexts";

const func = (context: ThemeContextInterface, args: string[]) => {
 window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searched Reddit for "${args.join(' ')}"`;
};

const description = "Search for a term on Reddit";

export default {
  func,
  description
};