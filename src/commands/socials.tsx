import config from "@/../config.json"

const func = (args: string[]) => {
  if (args.length === 0) 
    return config.socials.map(social => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")

  return config.socials.map(social => {
    if (args.includes(social.name.toLowerCase()))
      return `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`
  }).join("\n");
};

export default {
  func,
  description: "Prints a list of all my public socials",
  validArgs: config.socials.map(social => social.name.toLowerCase())
};