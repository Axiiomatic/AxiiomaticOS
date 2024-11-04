import { PreferencesContextInterface } from "@/utils/contexts";
import { usernameCurrent, usernameErrorAlready, usernameSet } from "@/paraglide/messages";

export const func = async (context: PreferencesContextInterface, args: string[]) => {
  const newUsername = args.join(" ");
  if (!newUsername)
    return usernameCurrent({ username: context.username });

  if (newUsername === context.username)
    return usernameErrorAlready({ username: newUsername })
  
  context.setUsername(newUsername);
  return usernameSet({ username: newUsername });
};

export default {
    func,
    description: {
      "en": "Check or change your username",
      "es": "Revisa o cambia tu nombre de usuario"
    },
    usesContext: true
};