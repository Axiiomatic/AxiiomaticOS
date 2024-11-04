import { joinList } from "@/utils/functions";
import { sumfetchSummary, sumfetchAbout, sumfetchEC, sumfetchProjects, sumfetchContact } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";

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
  let aka, education, certificates, projects, socials;

  switch (languageTag()) {
    case "en":
      aka = joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], "or");
      education = JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]');
      certificates = JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]');
      projects = JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]');
      socials = JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]');
      break;
    case "es":
      aka = joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], "o");
      education = JSON.parse(process.env.NEXT_PUBLIC_EDUCATION_ES || '[]');
      certificates = JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES_ES || '[]');
      projects = JSON.parse(process.env.NEXT_PUBLIC_PROJECTS_ES || '[]');
      socials = JSON.parse(process.env.NEXT_PUBLIC_SOCIALS_ES || '[]')
      break;
  }
  return `
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓
▐▓                                 ▐▓
▐▓      > A X I I O M A T I C      ▐▓
▐▓                                 ▐▓
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓

🖳 ${sumfetchSummary()}
-------------------------
🕮 ${sumfetchAbout()}
> ${process.env.NEXT_PUBLIC_NAME}
> AKA ${aka}
> <u><a href="${process.env.NEXT_PUBLIC_RESUME}" target="_blank">Resume (November 2024)</a></u>
> <u><a href="${process.env.NEXT_PUBLIC_REPO}" target="_blank">Github Repo</a></u>
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