import { PreferencesContextInterface } from "@/utils/contexts";

export const func = async (context: PreferencesContextInterface) => {
    return context.username;
};

export default {
    func,
    description: {
        "en": "Print current username",
        "es": "Imprime el usuario actual"
    },
    usesContext: true
};