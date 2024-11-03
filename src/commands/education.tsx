import { ThemeContextInterface } from "@/utils/contexts";
import { joinList } from "@/utils/functions";
import config from "@/../config.json"

const func = (context: ThemeContextInterface, args: string[]) => {
  return `
${config.education.map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${config.certificates.map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
`;
};

const description = "Prints my degrees and certifications";

export default {
  func,
  description
};