import { languageTag } from "@/paraglide/runtime";

interface Project {
  name: string;
  url: string;
  description: string;
}

const func = async (args: string[]) => {
  let projects;

  switch (languageTag()) {
    case "en":
      projects = JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]');
      break;
    case "es":
      projects = JSON.parse(process.env.NEXT_PUBLIC_PROJECTS_ES || '[]');
  }

  if (args.length === 0) return projects.map((project: Project) => `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`).join("\n");

  return projects.map((project: Project) => {
    if (args.includes(project.name.toLowerCase()))
      return `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`
  }).join("\n").trim();
};

export default {
  func,
  description: {
    "en": "Prints a list of all my projects",
    "es": "Imprime una lista de todos mis proyectos"
  },
  validArgs: JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]').map((project: Project) => project.name.toLowerCase())
};