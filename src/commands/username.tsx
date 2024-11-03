import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
  const newUsername = args.join(" ");
  if (!newUsername) {
    return `Current username: ${context.username}`;
  }
  
  context.setUsername(newUsername);
  return `Username set to: ${newUsername}`;
};

export default {
    func,
    description: "Check or change your username",
    usesContext: true
};