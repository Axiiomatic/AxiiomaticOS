import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  window.open(config.resume, "_blank");
  return `Opened resume`;
};

const description = "Open my resume in a new tab";

export default {
  func,
  description
};