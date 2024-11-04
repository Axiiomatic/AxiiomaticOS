interface Education {
  degree: string;
  major: string;
  institution: string;
  graduation_year: string | number;
}

interface Certificate {
  name: string;
  institution: string;
  completion_year: string | number;
}

const func = async (args: string[]) => {
  if (args.length === 0) return `
${(JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]') as Education[]).map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}
${(JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]') as Certificate[]).map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "degrees":
        response += `${(JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]') as Education[]).map(edu => `> ${edu.degree} in ${edu.major} - ${edu.institution} (${edu.graduation_year})`).join("\n")}\n`;
        break;
      case "certifications":
        response += `${(JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]') as Certificate[]).map(edu => `> ${edu.name} - ${edu.institution} (${edu.completion_year})`).join("\n")}\n`;
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