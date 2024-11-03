import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  window.open(config.readme, "_blank");
  return `Opened README`;
};

const description = "Open my profile's README in a new tab";

export default {
  func,
  description
};