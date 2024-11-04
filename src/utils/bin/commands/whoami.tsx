import { PreferencesContextInterface } from "@/utils/contexts";

export const func = async (context: PreferencesContextInterface) => {
    return context.username;
};

export default {
    func,
    description: "Print current username",
    description_es: "Imprime el usuario actual",
    usesContext: true
};