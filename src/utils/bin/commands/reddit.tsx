import * as m from "@/paraglide/messages";

const func = async (args: string[]) => {
 window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
 if (args.length === 0) return m.redditOpen();
 return m.redditResponse({ query: args.join(' ') });
};

export default {
  func,
  description: "Search for a term on Reddit",
  description_es: "Hace una búsqueda en Reddit"
};