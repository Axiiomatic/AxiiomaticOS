import { joinList } from "@/utils/functions";
import { and, or, aboutResponse, aboutMe, aboutAka, aboutAge, aboutOccupation, aboutLocation, aboutInterests } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import personal from "@/config/personal.json";

const func = async (args: string[]) => {
  const personalInfo = personal[languageTag()];

  const aka = joinList(personalInfo.aka, or());
  const occupation = personalInfo.occupation;
  const career_interests = joinList(personalInfo.interests.career, and());
  const personal_interests = joinList(personalInfo.interests.personal, and());

  if (args.length === 0) return aboutResponse({
    name: personalInfo.name,
    aka: aka,
    age: personalInfo.age,
    occupation: occupation,
    company: personalInfo.company,
    location: personalInfo.location,
    career_interests: career_interests,
    personal_interests: personal_interests
  });


  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "me":
        response += aboutMe({ name: personalInfo.name, occupation: occupation });
        break;
      case "aka":
        response += aboutAka({ aka: aka });
        break;
      case "age":
        response += aboutAge({ age: personalInfo.age });
        break;
      case "occupation":
        response += aboutOccupation({ occupation: occupation, company: personalInfo.company });
        break;
      case "location":
        response += aboutLocation({ location: personalInfo.location });
        break;
      case "interests":
        response += aboutInterests({ career_interests: career_interests, personal_interests: personal_interests });
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: {
    "en": "Prints a summary about me",
    "es": "Imprime un resumen sobre mí"
  },
  validArgs: ['age', 'aka', 'interests', 'location', 'me', 'occupation']
};