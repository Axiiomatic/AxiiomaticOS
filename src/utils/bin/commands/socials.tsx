interface Social {
  name: string;
  url: string;
  display: string;
}

const func = async (args: string[]) => {
  if (args.length === 0) 
    return JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]').map((social: Social) => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")

  return JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]').map((social: Social) => {
    if (args.includes(social.name.toLowerCase()))
      return `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`
  }).join("\n").trim();
};

export default {
  func,
  description: "Prints a list of all my public socials",
  validArgs: JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]').map((social: { name: string }) => social.name.toLowerCase())
};