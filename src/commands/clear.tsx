import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
  return "CLEAR";
};

export const description = "Clear terminal";

export default {
    func,
    description
};