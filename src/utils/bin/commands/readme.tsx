import * as m from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_README, "_blank");
  return m.readmeOpen();
};

export default {
  func,
  description: "Open my profile's README in a new tab",
  description_es: "Abre el README de mi perfil en una pestaña nueva",
  validArgs: []
};