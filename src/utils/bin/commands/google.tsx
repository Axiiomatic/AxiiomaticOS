const func = async (args: string[]) => {
 window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searched Google for "${args.join(' ')}"`;
};

export default {
  func,
  description: "Search for a term on Google"
};