import { joinList } from "@/utils/functions";
import { and, skillsProgramming, skillsFrameworks, skillsLibraries, skillsTools, skillsLanguages } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

const func = async (args: string[]) => {
  const personalInfo = personal[languageTag()];

  const programming_languages = joinList(personalInfo.skills.programming_languages, and());
  const frameworks = joinList(personalInfo.skills.frameworks, and());
  const libraries = joinList(personalInfo.skills.libraries, and());
  const tools = joinList(personalInfo.skills.tools, and());
  const spoken_languages = joinList(personalInfo.skills.languages, and());

  if (args.length === 0) return `${skillsProgramming({ programming_languages: programming_languages })}
${skillsFrameworks({ frameworks: frameworks })}
${skillsLibraries({ libraries: libraries })}
${skillsTools({ tools: tools })}
${skillsLanguages({ languages: spoken_languages })}`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "programming":
        response += `${skillsProgramming({ programming_languages: programming_languages })}\n`;
        break;
      case "frameworks":
        response += `${skillsFrameworks({ frameworks: frameworks })}\n`;
        break;
      case "libraries":
        response += `${skillsLibraries({ libraries: libraries })}\n`;
        break;
      case "tools":
        response += `${skillsTools({ tools: tools })}\n`;
        break;
      case "languages":
        response += `${skillsLanguages({ languages: spoken_languages })}\n`;
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: {
    "en": "Prints my most relevant skills",
    "es": "Imprime mis habilidades más relevantes"
  },
  validArgs: ["frameworks", "languages", "libraries", "programming", "tools"]
};