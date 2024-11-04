import { resumeOpen } from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_RESUME, "_blank");
  return resumeOpen();
};

export default {
  func,
  description: {
    "en": "Open my resume in a new tab",
    "es": "Abre mi resume en una pestaña nueva"
  },
  validArgs: []
};