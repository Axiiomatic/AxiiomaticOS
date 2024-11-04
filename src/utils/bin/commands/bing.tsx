import * as m from "@/paraglide/messages";

const func = async (args: string[]) => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  if (args.length === 0) return m.bingOpen();
  return m.bingResponse({ query: args.join(' ') });
};

export default {
  func,
  description: {
    "en": "Search for a term on Bing",
    "es": "Hace una búsqueda en Bing"
  }
};