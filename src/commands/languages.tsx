import { joinList } from "@/utils/functions";
import config from "@/../config.json"

const func = (args: string[]) => {
  if (args.length === 0) return `
> Spoken Languages: ${joinList(config.spoken_languages, 'and')}
> Programming Languages: ${joinList(config.programming_languages, 'and')}`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "spoken":
        response += `> Spoken Languages: ${joinList(config.spoken_languages, 'and')}\n`;
        break;
      case "programming":
        response += `> Programming Languages: ${joinList(config.programming_languages, 'and')}\n`;
        break;
      default:
        break
    }
  });
};

export default {
  func,
  description: "Prints the languages I speak and the programming languages I'm proficient in",
  validArgs: ["spoken", "programming"]
};