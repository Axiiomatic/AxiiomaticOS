import { PreferencesContextInterface } from "@/utils/contexts";
import * as m from "@/paraglide/messages";

export const func = async (context: PreferencesContextInterface, args: string[]) => {
  const newSpeed = args.join(" ");
  if (!newSpeed) {
    return m.speedCurrent({ speed: context.typingSpeed });
  }

  const speed = parseInt(newSpeed);

  if (isNaN(speed))
    return m.speedErrorNaN();

  if (speed < 1 || speed > 100)
    return m.speedErrorOutOfRange();

  if (speed === context.typingSpeed)
    return m.speedErrorAlready({ speed: speed });
  
  context.setTypingSpeed(speed);
  return m.speedSet({ speed: speed });
};

export default {
  func,
  description: {
    "en": "Check or change the terminal's typing speed",
    "es": "Revisa o cambia la velocidad de tecleo del terminal"
  },
  usesContext: true
};