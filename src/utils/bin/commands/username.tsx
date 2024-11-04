import { PreferencesContextInterface } from "@/utils/contexts";
import * as m from "@/paraglide/messages";

export const func = async (context: PreferencesContextInterface, args: string[]) => {
  const newUsername = args.join(" ");
  if (!newUsername)
    return m.usernameCurrent({ username: context.username });

  if (newUsername === context.username)
    return m.usernameErrorAlready({ username: newUsername })
  
  context.setUsername(newUsername);
  return m.usernameSet({ username: newUsername });
};

export default {
    func,
    description: "Check or change your username",
    description_es: "Revisa o cambia tu nombre de usuario",
    usesContext: true
};