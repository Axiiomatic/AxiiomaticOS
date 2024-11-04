import { joinList } from "@/utils/functions";

const func = async (args: string[]) => {
  if (args.length === 0) return `
> Spoken Languages: ${joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES?.split(',') || [], 'and')}
> Programming Languages: ${joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES?.split(',') || [], 'and')}`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "spoken":
        response += `> Spoken Languages: ${joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES?.split(',') || [], 'and')}\n`;
        break;
      case "programming":
        response += `> Programming Languages: ${joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES?.split(',') || [], 'and')}\n`;
        break;
      default:
        break
    }
  });

  return response.trim();
};

export default {
  func,
  description: "Prints the languages I speak and the programming languages I'm proficient in",
  validArgs: ["spoken", "programming"]
};