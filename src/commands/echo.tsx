import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
  return args.join(" ");
};

export const description = "Echo user input";

export default {
    func,
    description
};