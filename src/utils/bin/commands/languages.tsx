import { joinList } from "@/utils/functions";
import { and, languagesSpoken, languagesProgramming } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

const func = async (args: string[]) => {
  const personalInfo = personal[languageTag()];

  const spoken_languages = joinList(personalInfo.languages.spoken, and());
  const programming_languages = joinList(personalInfo.languages.programming, and());

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