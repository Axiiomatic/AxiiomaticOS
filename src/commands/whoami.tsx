import { ThemeContextInterface } from "@/utils/contexts";

export const func = (context: ThemeContextInterface) => {
    return context.username;
};

export default {
    func,
    description: "Print current username",
    usesContext: true
};