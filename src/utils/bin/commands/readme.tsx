import { readmeOpen } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

const func = async () => {
  window.open(personal[languageTag()].links.readme, "_blank");
  return readmeOpen();
};

export default {
  func,
  description: {
    "en": "Open my profile's README in a new tab",
    "es": "Abre el README de mi perfil en una pestaña nueva"
  },
  validArgs: []
};