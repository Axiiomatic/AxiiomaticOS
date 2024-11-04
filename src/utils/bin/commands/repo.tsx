const func = async () => {
  window.open(process.env.NEXT_PUBLIC_REPO, "_blank");
  return `Opened Github repository`;
};

export default {
  func,
  description: "Open my Github repository in a new tab",
  validArgs: []
};