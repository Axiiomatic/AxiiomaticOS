const func = (args: string[]) => {
 window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searched DuckDuckGo for "${args.join(' ')}"`;
};

export default {
  func,
  description: "Search for a term on DuckDuckGo"
};