import { joinList } from "@/utils/functions";
import config from "@/../config.json"

const func = async () => {
  return `
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓
▐▓                                 ▐▓
▐▓      > A X I I O M A T I C      ▐▓
▐▓                                 ▐▓
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓

🖳 Summary
-------------------------
🕮 ABOUT
> ${config.name}
> AKA ${joinList(config.aka, "or")}
> <u><a href="${config.resume}" target="_blank">Resume (November 2024)</a></u>
> <u><a href="${config.repo}" target="_blank">Github Repo</a></u>
--------------------------
🖆 EDUCATION & CERTIFICATIONS
${config.education.map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${config.certificates.map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
--------------------------
🗃 PROJECTS
${config.projects.map(project => `> <u><a href="${project.url}" target="_blank">${project.name}</a></u>`).join("\n")}
--------------------------
🗂 CONTACT
${config.socials.map(social => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")}
`;
};

export default {
  func,
  description: "Prints a summary of my information",
  validArgs: []
};