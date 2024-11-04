import * as m from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_RESUME, "_blank");
  return m.resumeOpen();
};

export default {
  func,
  description: "Open my resume in a new tab",
  description_es: "Abre mi resume en una pestaña nueva",
  validArgs: []
};