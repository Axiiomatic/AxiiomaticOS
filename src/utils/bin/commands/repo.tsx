import config from "@/../config.json"

const func = async () => {
  window.open(config.repo, "_blank");
  return `Opened Github repository`;
};

export default {
  func,
  description: "Open my Github repository in a new tab",
  validArgs: []
};