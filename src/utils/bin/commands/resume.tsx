const func = async () => {
  window.open(process.env.NEXT_PUBLIC_RESUME, "_blank");
  return `Opened resume`;
};

export default {
  func,
  description: "Open my resume in a new tab",
  validArgs: []
};