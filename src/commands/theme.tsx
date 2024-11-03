import { ThemeContextInterface } from "@/utils/contexts";
import config from "@/../config.json"

interface ColorType {
  name: string;
  // ... add other color properties if needed
}

type ColorConfigType = Record<string, ColorType>;

export const func = (context: ThemeContextInterface & { color: ColorType }, args: string[]) => {
  const newTheme = args.join(" ");
  if (!newTheme) {
    return `Current theme: ${context.color.name}`;
  }

  if(newTheme === "list") {
    return `Available themes: ${Object.keys(config.colors).join(" ")}`;
  }

  if (newTheme === context.color.name) {
    return `Theme is already set to ${newTheme}`;
  }

  if (!config.colors[newTheme as keyof typeof config.colors]) {
    return `That theme is not available. Available themes: ${Object.keys(config.colors).join(" ")}`;
  }
  
  context.setColor(config.colors[newTheme as keyof typeof config.colors]);
  return `Theme set to: ${newTheme}`;
};

export const description = "Check or change the terminal's theme";

export default {
  func,
  description
};