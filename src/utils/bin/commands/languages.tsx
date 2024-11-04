import { joinList } from "@/utils/functions";
import * as m from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";


const func = async (args: string[]) => {
  const lang = languageTag();

  let spoken_languages, programming_languages;
  
  switch (lang) {
    case "en":
      spoken_languages = joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES?.split(',') || [], 'and');
      programming_languages = joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES?.split(',') || [], 'and');
      break;
    case "es":
      spoken_languages = joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES_ES?.split(',') || [], 'y');
      programming_languages = joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES_ES?.split(',') || [], 'y');
      break;
  }

  if (args.length === 0) return `${m.languagesSpoken({ spoken_languages: spoken_languages })}
${m.languagesProgramming({ programming_languages: programming_languages })}`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "spoken":
        response += `${m.languagesSpoken({ spoken_languages: spoken_languages })}\n`;
        break;
      case "programming":
        response += `${m.languagesProgramming({ programming_languages: programming_languages })}\n`;
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: "Prints the languages I speak and the programming languages I'm proficient in",
  description_es: "Imprime los idiomas que hablo y los lenguajes de programación que sé usar",
  validArgs: ["spoken", "programming"]
};