import { ThemeContextInterface } from "@/utils/contexts";
import { joinList } from "@/utils/functions";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  return `
I speak ${joinList(config.spoken_languages, 'and')}
I program in ${joinList(config.programming_languages, 'and')}`;
};

const description = "Prints the languages I speak and the programming languages I'm proficient in";

export default {
  func,
  description
};