import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

interface Experience {
  company: string;
  url: string;
  position: string;
  duration: string;
  description: string[];
}

const func = async (args: string[]) => {
  const personalInfo = personal[languageTag()];
  const experience = personalInfo.experience;

  if (args.length === 0) return experience.map((exp: Experience) => `> ${exp.position} (${exp.duration}) - <u><a href="${exp.url}" target="_blank">${exp.company}</a></u>
    ${exp.description.join("\n    ")}`).join("\n");

  return experience.map((exp: Experience) => {
    if (args.includes(exp.company.toLowerCase()))
      return `> ${exp.position} (${exp.duration}) - <u><a href="${exp.url}" target="_blank">${exp.company}</a></u>
    ${exp.description.join("\n    ")}`}).join("\n").trim();
};

export default {
  func,
  description: {
    "en": "Prints a list of all my previous work experiences",
    "es": "Imprime una lista de todas mis experiencias de trabajo previas"
  },
  validArgs: personal.en.experience.map((exp : Experience) => exp.company.toLowerCase())
};