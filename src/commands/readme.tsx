import config from "@/../config.json"

const func = () => {
  window.open(config.readme, "_blank");
  return `Opened README`;
};

export default {
  func,
  description: "Open my profile's README in a new tab",
  validArgs: []
};