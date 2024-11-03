import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  return config.projects.map(project => `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`).join("\n");
};

const description = "Prints a list of all my projects";

export default {
  func,
  description
};