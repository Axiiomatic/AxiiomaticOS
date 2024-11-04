import { joinList } from "@/utils/functions";

const func = async (args: string[]) => {
  if (args.length === 0) return `
Hello! I'm ${process.env.NEXT_PUBLIC_NAME}, but I usually go by ${joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], 'or')} online
I'm a ${process.env.NEXT_PUBLIC_AGE} year old ${process.env.NEXT_PUBLIC_OCCUPATION} at ${process.env.NEXT_PUBLIC_COMPANY} located at ${process.env.NEXT_PUBLIC_LOCATION}
I'm interested in ${joinList(process.env.NEXT_PUBLIC_CAREER_INTERESTS?.split(',') || [], 'and')}
However, I also really enjoy ${joinList(process.env.NEXT_PUBLIC_PERSONAL_INTERESTS?.split(',') || [], 'and')}!

More about me:
'sumfetch' - Short Summary
'resume' - My Latest Resume
'readme' - My Github README
`;

  let response = '';

  args.forEach(arg => {
    switch (arg) {
      case "me":
        response += `Hello! I'm ${process.env.NEXT_PUBLIC_NAME}.\nI'm a ${process.env.NEXT_PUBLIC_OCCUPATION}. Nice to meet you!\n`
        break;
      case "aka":
        response += `I almost never use my real name online. I usually go by ${joinList(process.env.NEXT_PUBLIC_AKA?.split(',') || [], 'or')} in social media\n`
        break;
      case "age":
        response += `I'm ${process.env.NEXT_PUBLIC_AGE} years old!\n`
        break;
      case "occupation":
        response += `I'm a ${process.env.NEXT_PUBLIC_OCCUPATION} at ${process.env.NEXT_PUBLIC_COMPANY}\n`
        break;
      case "location":
        response += `I'm currently located at ${process.env.NEXT_PUBLIC_LOCATION}\n`
        break;
      case "interests":
        response += `I'm interested in ${joinList(process.env.NEXT_PUBLIC_CAREER_INTERESTS?.split(',') || [], 'and')}\nI also enjoy ${joinList(process.env.NEXT_PUBLIC_PERSONAL_INTERESTS?.split(',') || [], 'and')}!\n`
        break;
      default:
        break;
    }
  });

  return response.trim();
};

export default {
  func,
  description: "Prints a summary of my information",
  validArgs: ["me", "aka", "age", "occupation", "location", "interests"]
};