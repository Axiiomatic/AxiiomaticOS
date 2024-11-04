import * as m from "@/paraglide/messages";

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
${(JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]') as Education[])
  .map(edu => m.educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}
${(JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]') as Certificate[])
  .map(edu => m.educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "degrees":
        response += `${(JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]') as Education[])
          .map(edu => m.educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}\n`;
        break;
      case "certifications":
        response += `${(JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]') as Certificate[])
          .map(edu => m.educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}\n`;
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
  description_es: "Muestra mis títulos y certificaciones",
  validArgs: ["degrees", "certifications"]
};