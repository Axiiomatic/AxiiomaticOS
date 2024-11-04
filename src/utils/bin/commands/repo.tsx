import { repoOpen } from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_REPO, "_blank");
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