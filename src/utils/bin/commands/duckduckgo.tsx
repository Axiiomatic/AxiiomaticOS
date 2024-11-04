import * as m from "@/paraglide/messages";

const func = async (args: string[]) => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  if (args.length === 0) return m.duckDuckGoOpen();
  return m.duckDuckGoResponse({ query: args.join(' ') });
};

export default {
  func,
  description: "Search for a term on DuckDuckGo",
  description_es: "Hace una búsqueda en DuckDuckGo",
};