import { readmeOpen } from "@/paraglide/messages";

const func = async () => {
  window.open(process.env.NEXT_PUBLIC_README, "_blank");
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