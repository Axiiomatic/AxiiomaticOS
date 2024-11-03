import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  window.open(config.repo, "_blank");
  return `Opened Github repository`;
};

const description = "Open my Github repository in a new tab";

export default {
  func,
  description
};