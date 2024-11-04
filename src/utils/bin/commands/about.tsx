import { joinList } from "@/utils/functions";
import { aboutResponse, aboutMe, aboutAka, aboutAge, aboutOccupation, aboutLocation, aboutInterests } from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";

const func = async (args: string[]) => {
  let aka, occupation, career_interests, personal_interests;

  switch (languageTag()) {
    case "en":
      aka = joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], 'or');
      occupation = process.env.NEXT_PUBLIC_OCCUPATION;
      career_interests = joinList(process.env.NEXT_PUBLIC_CAREER_INTERESTS?.split(',') || [], 'and');
      personal_interests = joinList(process.env.NEXT_PUBLIC_PERSONAL_INTERESTS?.split(',') || [], 'and');
      break;
    case "es":
      aka = joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], 'o');
      occupation = process.env.NEXT_PUBLIC_OCCUPATION_ES;
      career_interests = joinList(process.env.NEXT_PUBLIC_CAREER_INTERESTS_ES?.split(',') || [], 'y');
      personal_interests = joinList(process.env.NEXT_PUBLIC_PERSONAL_INTERESTS_ES?.split(',') || [], 'y');
      break;
  }

  if (args.length === 0) return aboutResponse({
    name: process.env.NEXT_PUBLIC_NAME || '',
    aka: aka,
    age: process.env.NEXT_PUBLIC_AGE || '',
    occupation: occupation || '',
    company: process.env.NEXT_PUBLIC_COMPANY || '',
    location: process.env.NEXT_PUBLIC_LOCATION || '',
    career_interests: career_interests,
    personal_interests: personal_interests
  });


  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "me":
        response += aboutMe({ name: process.env.NEXT_PUBLIC_NAME || '', occupation: occupation || '' });
        break;
      case "aka":
        response += aboutAka({ aka: aka });
        break;
      case "age":
        response += aboutAge({ age: process.env.NEXT_PUBLIC_AGE || '' });
        break;
      case "occupation":
        response += aboutOccupation({ occupation: occupation || '', company: process.env.NEXT_PUBLIC_COMPANY || '' });
        break;
      case "location":
        response += aboutLocation({ location: process.env.NEXT_PUBLIC_LOCATION || '' });
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