import { redditOpen, redditResponse } from "@/paraglide/messages";

const func = async (args: string[]) => {
 window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
 if (args.length === 0) return redditOpen();
 return redditResponse({ query: args.join(' ') });
};

export default {
  func,
  description: {
    "en": "Search for a term on Reddit",
    "es": "Hace una búsqueda en Reddit"
  }
};