import config from "@/../config.json"

const func = (args: string[]) => {
  if (args.length === 0) return `
${config.education.map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${config.certificates.map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "degrees":
        response += `${config.education.map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}\n`;
        break;
      case "certifications":
        response += `${config.certificates.map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}\n`;
        break;
      default:
        break
    }
  });

  return response.trim();
};

export default {
  func,
  description: "Prints my degrees and certifications",
  validArgs: ["degrees", "certifications"]
};