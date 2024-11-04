import { joinList } from "@/utils/functions";

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
  return `
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓
▐▓                                 ▐▓
▐▓      > A X I I O M A T I C      ▐▓
▐▓                                 ▐▓
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓

🖳 Summary
-------------------------
🕮 ABOUT
> ${process.env.NEXT_PUBLIC_NAME}
> AKA ${joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], "or")}
> <u><a href="${process.env.NEXT_PUBLIC_RESUME}" target="_blank">Resume (November 2024)</a></u>
> <u><a href="${process.env.NEXT_PUBLIC_REPO}" target="_blank">Github Repo</a></u>
--------------------------
🖆 EDUCATION & CERTIFICATIONS
${(JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]') as Education[]).map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${(JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]') as Certificate[]).map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
--------------------------
🗃 PROJECTS
${(JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]') as Project[]).map(project => `> <u><a href="${project.url}" target="_blank">${project.name}</a></u>`).join("\n")}
--------------------------
🗂 CONTACT
${JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]').map((social: Social) => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")}
`;
};

export default {
  func,
  description: "Prints a summary of my information",
  validArgs: []
};