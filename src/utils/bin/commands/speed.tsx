import { PreferencesContextInterface } from "@/utils/contexts";
import { speedCurrent, speedErrorNaN, speedErrorOutOfRange, speedErrorAlready, speedSet } from "@/paraglide/messages";

export const func = async (context: PreferencesContextInterface, args: string[]) => {
  const newSpeed = args.join(" ");
  if (!newSpeed) {
    return speedCurrent({ speed: context.typingSpeed });
  }

  const speed = parseInt(newSpeed);

  if (isNaN(speed))
    return speedErrorNaN();

  if (speed < 1 || speed > 100)
    return speedErrorOutOfRange();

  if (speed === context.typingSpeed)
    return speedErrorAlready({ speed: speed });
  
  context.setTypingSpeed(speed);
  return speedSet({ speed: speed });
};

export default {
  func,
  description: {
    "en": "Check or change the terminal's typing speed",
    "es": "Revisa o cambia la velocidad de tecleo del terminal"
  },
  usesContext: true
};