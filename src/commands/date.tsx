import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface, args: string[]) => {
    return new Date().toString();
};

export const description = "Print current date and time";

export default {
    func,
    description
};