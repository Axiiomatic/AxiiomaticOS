import * as m from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";

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
  let education, certificates;

  switch (languageTag()) {
    case "en":
      education = JSON.parse(process.env.NEXT_PUBLIC_EDUCATION || '[]');
      certificates = JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES || '[]');
      break;
    case "es":
      education = JSON.parse(process.env.NEXT_PUBLIC_EDUCATION_ES || '[]');
      certificates = JSON.parse(process.env.NEXT_PUBLIC_CERTIFICATES_ES || '[]');
      break;
  }
  if (args.length === 0) return `
${(education as Education[])
  .map(edu => m.educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}
${(certificates as Certificate[])
  .map(edu => m.educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "degrees":
        response += `${(education as Education[])
          .map(edu => m.educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}\n`;
        break;
      case "certifications":
        response += `${(certificates as Certificate[])
          .map(edu => m.educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}\n`;
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: {
    "en": "Prints my degrees and certifications",
    "es": "Muestra mis títulos y certificaciones"
  },
  validArgs: ["degrees", "certifications"]
};