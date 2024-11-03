import config from "@/../config.json"

const func = async (args: string[]) => {
  if (args.length === 0) return config.projects.map(project => `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`).join("\n");

  return config.projects.map(project => {
    if (args.includes(project.name.toLowerCase()))
      return `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`
  }).join("\n").trim();

};

export default {
  func,
  description: "Prints a list of all my projects",
  validArgs: config.projects.map(project => project.name.toLowerCase())
};