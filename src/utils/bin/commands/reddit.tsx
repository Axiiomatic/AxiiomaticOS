const func = async (args: string[]) => {
 window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searched Reddit for "${args.join(' ')}"`;
};

export default {
  func,
  description: "Search for a term on Reddit"
};