import { PreferencesContextInterface } from "@/utils/contexts";
import config from "@/../config.json";
import * as m from "@/paraglide/messages";

interface ThemeType {
  name: string;
}

export const func = async (context: PreferencesContextInterface & { theme: ThemeType }, args: string[]) => {
  const newTheme = args.join(" ");
  if (!newTheme) {
    return m.themeCurrent({ theme: context.theme.name });
  }

  if(newTheme === "list") {
    return m.themeAvailable({ themes: Object.keys(config.themes).join(" ") });
  }

  if (newTheme === context.theme.name) {
    return m.themeErrorAlready({ theme: newTheme });
  }

  if (!config.themes[newTheme as keyof typeof config.themes]) {
    return m.themeErrorNA({ themes: Object.keys(config.themes).join(" ") });
  }
  
  context.setTheme(config.themes[newTheme as keyof typeof config.themes]);
  return m.themeSet({ theme: newTheme });
};

export default {
  func,
  description: "Check or change the terminal's theme",
  description_es: "Revisa o cambia el tema del terminal",
  validArgs: [...Object.keys(config.themes), "list"],
  usesContext: true
};