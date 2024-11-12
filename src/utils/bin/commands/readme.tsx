import { readmeOpen } from "@/paraglide/messages";
import personal from "@/config/personal.json";

const func = async () => {
  window.open(personal.links.readme, "_blank");
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