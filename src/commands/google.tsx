import { ThemeContextInterface } from "@/utils/contexts";

const func = (context: ThemeContextInterface, args: string[]) => {
 window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searched Google for "${args.join(' ')}"`;
};

const description = "Search for a term on Google";

export default {
  func,
  description
};