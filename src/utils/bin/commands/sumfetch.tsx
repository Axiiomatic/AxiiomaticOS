import { joinList } from "@/utils/functions";
import { or, sumfetchSummary, sumfetchAbout, sumfetchEC, sumfetchProjects, sumfetchContact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

interface Education {
  degree: string;
  major: string;
  institution: string;
  graduation_year: string | number;
}

interface Certificate {
  name: string;
  institution: string;
  completion_year: string | number;
}

interface Project {
  name: string;
  url: string;
}

interface Social {
  name: string;
  url: string;
  display: string;
}

const func = async () => {
  const personalInfo = personal[languageTag()];

  const aka = joinList(personalInfo.aka, or());
  const education = personalInfo.education.degrees;
  const certificates = personalInfo.education.certificates;
  const projects = personalInfo.projects;
  const socials = personalInfo.socials;

  return `
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓
▐▓                                 ▐▓
▐▓      > A X I I O M A T I C      ▐▓
▐▓                                 ▐▓
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓

🖳 ${sumfetchSummary()}
-------------------------
🕮 ${sumfetchAbout()}
> ${personalInfo.name}
> AKA ${aka}
> <u><a href="${personalInfo.links.resume}" target="_blank">Resume</a></u>
> <u><a href="${personalInfo.links.repo}" target="_blank">Github Repo</a></u>
--------------------------
🖆 ${sumfetchEC()}
${education.map((edu : Education) => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${certificates.map((edu : Certificate) => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
--------------------------
🗃 ${sumfetchProjects()}
${projects.map((project : Project) => `> <u><a href="${project.url}" target="_blank">${project.name}</a></u>`).join("\n")}
--------------------------
🗂 ${sumfetchContact()}
${socials.map((social : Social) => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")}
`;
};

export default {
  func,
  description: {
    "en": "Prints a summary of all my key information",
    "es": "Imprime un sumario de toda mi información clave"
  },
  validArgs: []
};