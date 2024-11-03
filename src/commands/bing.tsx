import { ThemeContextInterface } from "@/utils/contexts";

const func = (context: ThemeContextInterface, args: string[]) => {
 window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Searched Bing for "${args.join(' ')}"`;
};

const description = "Search for a term on Bing";

export default {
  func,
  description
};