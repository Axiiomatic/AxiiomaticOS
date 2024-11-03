import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
  const newSpeed = args.join(" ");
  if (!newSpeed) {
    return `Current typing speed: ${context.typingSpeed}`;
  }

  const speed = parseInt(newSpeed);

  if (isNaN(speed)) {
    return "Typing speed must be a number";
  }

  if (speed < 1 || speed > 100) {
    return "Typing speed must be a positive integer between 1 and 100";
  }
  
  context.setTypingSpeed(speed);
  return `Typing speed set to: ${speed}`;
};

export default {
    func,
    description: "Check or change the terminal's typing speed",
    usesContext: true
};