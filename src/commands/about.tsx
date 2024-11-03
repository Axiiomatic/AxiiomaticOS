import { ThemeContextInterface } from "@/utils/contexts";
import { joinList, getAge } from "@/utils/functions";
import config from "@/../config.json"

const description = "Prints a summary of my information";

const validArgs = ["me", "aka", "age", "occupation", "location", "interests"];

const func = (context: ThemeContextInterface, args: string[]) => {
  if (args.length === 0) return `
Hello! I'm ${config.name}, but I usually go by ${joinList(config.aka, 'or')} online
I'm a ${config.age} year old ${config.occupation} located at ${config.location}
I'm interested in ${joinList(config.career_interests, 'and')}
However, I also really enjoy ${joinList(config.personal_interests, 'and')}!

More about me:
'sumfetch' - Short Summary
'resume' - My Latest Resume
'readme' - My Github README
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "me":
        response += `Hello! I'm ${config.name}.\nI'm a ${config.occupation}. Nice to meet you!\n`
        break;
      case "aka":
        response += `I almost never use my real name online. I usually go by ${joinList(config.aka, 'or')} in social media\n`
        break;
      case "age":
        response += `I'm ${config.age} years old!\n`
        break;
      case "occupation":
        response += `I'm a ${config.occupation} at ${config.company}\n`
        break;
      case "location":
        response += `I'm currently located at ${config.location}\n`
        break;
      case "interests":
        response += `I'm interested in ${joinList(config.career_interests, 'and')}\nI also enjoy ${joinList(config.personal_interests, 'and')}!\n`
        break;
      case "resume":
      default:
        break;
    }
  })

  return response.trim();
};

export default {
  func,
  description,
  validArgs
};