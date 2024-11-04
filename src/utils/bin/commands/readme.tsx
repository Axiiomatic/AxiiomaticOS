const func = async () => {
  window.open(process.env.NEXT_PUBLIC_README, "_blank");
  return `Opened README`;
};

export default {
  func,
  description: "Open my profile's README in a new tab",
  validArgs: []
};