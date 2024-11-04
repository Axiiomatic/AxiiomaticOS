import { joinList } from "@/utils/functions";
import * as m from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";

const func = async (args: string[]) => {
  const lang = languageTag();

  let aka, occupation, career_interests, personal_interests;

  switch (lang) {
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

  if (args.length === 0) return m.aboutResponse({
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
      case "mi":
        response += m.aboutMe({ name: process.env.NEXT_PUBLIC_NAME || '', occupation: occupation || '' });
        break;
      case "aka":
      case "alias":
        response += m.aboutAka({ aka: aka });
        break;
      case "age":
      case "edad":
        response += m.aboutAge({ age: process.env.NEXT_PUBLIC_AGE || '' });
        break;
      case "occupation":
      case "ocupacion":
        response += m.aboutOccupation({ occupation: occupation || '', company: process.env.NEXT_PUBLIC_COMPANY || '' });
        break;
      case "location":
      case "ubicacion":
        response += m.aboutLocation({ location: process.env.NEXT_PUBLIC_LOCATION || '' });
        break;
      case "interests":
      case "intereses":
        response += m.aboutInterests({ career_interests: career_interests, personal_interests: personal_interests });
        break;
      default:
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: m.aboutDescription(),
  validArgs: ['age', 'aka', 'interests', 'location', 'me', 'occupation']
};