import * as m from "@/paraglide/messages";

export const func = async (args: string[]) => {
  return args.join(" ");
};

export default {
    func,
    description: m.echoDescription()
};