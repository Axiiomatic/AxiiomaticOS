import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
    return context.username;
};

export const description = "Print current username";

export default {
    func,
    description
};