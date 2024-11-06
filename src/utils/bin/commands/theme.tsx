import { PreferencesContextInterface } from "@/utils/contexts";
import config from "@/../config.json";
import { themeCurrent, themeAvailable, themeErrorAlready, themeErrorNA, themeSet } from "@/paraglide/messages";

interface ThemeType {
  name: string;
}

export const func = async (context: PreferencesContextInterface & { theme: ThemeType }, args: string[]) => {
  const newTheme = args.join(" ");
  if (!newTheme) {
    return themeCurrent({ theme: context.theme });
  }

  if(newTheme === "list") {
    return themeAvailable({ themes: Object.keys(config.themes).join(" ") });
  }

  if (newTheme === context.theme) {
    return themeErrorAlready({ theme: newTheme });
  }

  if (!config.themes[newTheme as keyof typeof config.themes]) {
    return themeErrorNA({ themes: Object.keys(config.themes).join(" ") });
  }
  
  context.setTheme(config.themes[newTheme as keyof typeof config.themes].name);
  return themeSet({ theme: newTheme });
};

export default {
  func,
  description: {
    "en": "Check or change the terminal's theme",
    "es": "Revisa o cambia el tema del terminal"
  },
  validArgs: [...Object.keys(config.themes), "list"],
  usesContext: true
};