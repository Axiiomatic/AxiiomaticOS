import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

interface Project {
  name: string;
  url: string;
  description: string;
}

const func = async (args: string[]) => {
  const personalInfo = personal[languageTag()];
  const projects = personalInfo.projects;

  if (args.length === 0) return projects.map((project: Project) => `> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`).join("\n");

  return projects.map((project: Project) => {
    if (args.includes(project.name.toLowerCase()))
      return `> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`
  }).join("\n").trim();
};

export default {
  func,
  description: {
    "en": "Prints a list of all my projects",
    "es": "Imprime una lista de todos mis proyectos"
  },
  validArgs: personal.en.projects.map((project: Project) => project.name.toLowerCase())
};