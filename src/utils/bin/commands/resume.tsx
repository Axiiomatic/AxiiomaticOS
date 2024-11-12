import { resumeOpen } from "@/paraglide/messages";
import personal from "@/config/personal.json";

const func = async () => {
  window.open(personal.links.resume, "_blank");
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