import { repoOpen } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

const func = async () => {
  window.open(personal[languageTag()].links.repo, "_blank");
  return repoOpen();
};

export default {
  func,
  description: {
    "en": "Open this project's Github repository in a new tab",
    "es": "Abre el repositorio de Github de este proyecto en una pestaña nueva"
  },
  validArgs: []
};