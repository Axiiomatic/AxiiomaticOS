import * as m from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_REPO, "_blank");
  return m.repoOpen();
};

export default {
  func,
  description: "Open this project's Github repository in a new tab",
  description_es: "Abre el repositorio de Github de este proyecto en una pestaña nueva",
  validArgs: []
};