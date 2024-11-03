import config from "@/../config.json"

const func = () => {
  window.open(config.resume, "_blank");
  return `Opened resume`;
};

export default {
  func,
  description: "Open my resume in a new tab",
  validArgs: []
};