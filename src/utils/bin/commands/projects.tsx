interface Project {
  name: string;
  url: string;
  description: string;
}

const func = async (args: string[]) => {
  if (args.length === 0) return JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]').map((project: Project) => `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`).join("\n");

  return JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]').map((project: Project) => {
    if (args.includes(project.name.toLowerCase()))
      return `
> <u><a href="${project.url}" target="_blank">${project.name}</a></u>
    - ${project.description}`
  }).join("\n").trim();
};

export default {
  func,
  description: "Prints a list of all my projects",
  validArgs: JSON.parse(process.env.NEXT_PUBLIC_PROJECTS || '[]').map((project: Project) => project.name.toLowerCase())
};