export const func = async () => {
    return new Date().toString();
};

export default {
    func,
    description: "Print current date and time",
    validArgs: []
};