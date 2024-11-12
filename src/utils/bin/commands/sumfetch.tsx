import { joinList } from "@/utils/functions";
import { or, sumfetchSummary, sumfetchAbout, sumfetchExperience, sumfetchEC, sumfetchProjects, sumfetchContact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

interface Experience {
  company: string;
  url: string;
  position: string;
  duration: string;
  description: string[];
}

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
  const experience = personalInfo.experience;
  const education = personalInfo.education.degrees;
  const certificates = personalInfo.education.certificates;
  const projects = personalInfo.projects;
  const socials = personalInfo.socials;

  return `▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓
▐▓                                 ▐▓
▐▓      > A X I I O M A T I C      ▐▓
▐▓                                 ▐▓
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓

🖳 ${sumfetchSummary()}
-------------------------
🕮 ${sumfetchAbout()}
> ${personalInfo.name}
> AKA ${aka}
> <u><a href="${personal.links.resume}" target="_blank">Resume</a></u>
> <u><a href="${personal.links.repo}" target="_blank">Github Repo</a></u>
 --------------------------
≣ ${sumfetchExperience()}
${experience.map((exp : Experience) => `> ${exp.position} (${exp.duration}) - <u><a href="${exp.url}" target="_blank">${exp.company}</a></u>`).join("\n")}
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