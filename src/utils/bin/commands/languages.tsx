import { joinList } from "@/utils/functions";
import { languagesSpoken, languagesProgramming } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";


const func = async (args: string[]) => {
  let spoken_languages, programming_languages;
  
  switch (languageTag()) {
    case "en":
      spoken_languages = joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES?.split(',') || [], 'and');
      programming_languages = joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES?.split(',') || [], 'and');
      break;
    case "es":
      spoken_languages = joinList(process.env.NEXT_PUBLIC_SPOKEN_LANGUAGES_ES?.split(',') || [], 'y');
      programming_languages = joinList(process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES_ES?.split(',') || [], 'y');
      break;
  }

  if (args.length === 0) return `${languagesSpoken({ spoken_languages: spoken_languages })}
${languagesProgramming({ programming_languages: programming_languages })}`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "spoken":
        response += `${languagesSpoken({ spoken_languages: spoken_languages })}\n`;
        break;
      case "programming":
        response += `${languagesProgramming({ programming_languages: programming_languages })}\n`;
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: {
    "en": "Prints the languages I speak and the programming languages I'm proficient in",
    "es": "Imprime los idiomas que hablo y los lenguajes de programación que sé usar"
  },
  validArgs: ["spoken", "programming"]
};