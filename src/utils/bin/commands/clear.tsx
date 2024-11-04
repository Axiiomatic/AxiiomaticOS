import * as m from "@/paraglide/messages";

export const func = async () => {
  return "CLEAR";
};

export default {
    func,
    description: m.clearDescription(),
    validArgs: []
};