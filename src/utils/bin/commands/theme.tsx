import { PreferencesContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

interface ColorType {
  name: string;
  // ... add other color properties if needed
}

export const func = async (context: PreferencesContextInterface & { color: ColorType }, args: string[]) => {
  const newTheme = args.join(" ");
  if (!newTheme) {
    return `Current theme: ${context.color.name}`;
  }

  if(newTheme === "list") {
    return `Available themes: ${Object.keys(config.themes).join(" ")}`;
  }

  if (newTheme === context.color.name) {
    return `Theme is already set to ${newTheme}`;
  }

  if (!config.themes[newTheme as keyof typeof config.themes]) {
    return `That theme is not available. Available themes: ${Object.keys(config.themes).join(" ")}`;
  }
  
  context.setTheme(config.themes[newTheme as keyof typeof config.themes]);
  return `Theme set to: ${newTheme}`;
};

export default {
  func,
  description: "Check or change the terminal's theme",
  validArgs: [...Object.keys(config.themes), "list"],
  usesContext: true
};