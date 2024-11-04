import { languageTag } from "@/paraglide/runtime";

interface Social {
  name: string;
  url: string;
  display: string;
}

const func = async (args: string[]) => {
    let socials;

    switch (languageTag()) {
      case "en":
        socials = JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]');
        break;
      case "es":
        socials = JSON.parse(process.env.NEXT_PUBLIC_SOCIALS_ES || '[]');
        break;
    }

  if (args.length === 0) 
    return socials.map((social: Social) => `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`).join("\n")

  return socials.map((social: Social) => {
    if (args.includes(social.name.toLowerCase()))
      return `> ${social.name}: <u><a href="${social.url}" target="_blank">${social.display}</a></u>`
  }).join("\n").trim();
};

export default {
  func,
  description: {
    "en": "Prints a list of all my public socials",
    "es": "Imprime una lista de todas mis redes sociales públicas"
  },
  validArgs: JSON.parse(process.env.NEXT_PUBLIC_SOCIALS || '[]').map((social: { name: string }) => social.name.toLowerCase())
};