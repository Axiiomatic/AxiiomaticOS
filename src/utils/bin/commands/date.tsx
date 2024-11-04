import * as m from "@/paraglide/messages";

export const func = async () => {
    return new Date().toString();
};

export default {
    func,
    description: m.dateDescription(),
    validArgs: []
};