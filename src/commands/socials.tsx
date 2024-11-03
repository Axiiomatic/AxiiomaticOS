import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  return config.socials.map(social => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")
};

const description = "Prints a list of all my public socials";

export default {
  func,
  description
};