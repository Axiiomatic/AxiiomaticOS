import * as m from "@/paraglide/messages";

const func = async (args: string[]) => {
 window.open(`https://google.com/search?q=${args.join(' ')}`);
 if (args.length === 0) return m.googleOpen();
 return m.googleResponse({ query: args.join(' ') });
};

export default {
  func,
  description: {
    "en": "Search for a term on Google",
    "es": "Hace una búsqueda en Google"
  }
};