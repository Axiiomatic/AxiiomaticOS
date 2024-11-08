import { educationDegrees, educationCertifications } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

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
  const personalInfo = personal[languageTag()];

  const education = personalInfo.education.degrees;
  const certificates = personalInfo.education.certificates;

  if (args.length === 0) return `
${(education as Education[])
  .map(edu => educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}
${(certificates as Certificate[])
  .map(edu => educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "degrees":
        response += `${(education as Education[])
          .map(edu => educationDegrees({ degree: edu.degree, major: edu.major, institution: edu.institution, graduation_year: edu.graduation_year })).join("\n")}\n`;
        break;
      case "certifications":
        response += `${(certificates as Certificate[])
          .map(edu => educationCertifications({ name: edu.name, institution: edu.institution, completion_year: edu.completion_year })).join("\n")}\n`;
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