const func = async (args: string[]) => {
 window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Searched Bing for "${args.join(' ')}"`;
};

export default {
  func,
  description: "Search for a term on Bing"
};