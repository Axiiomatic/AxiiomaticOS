export const func = async () => {
    return new Date().toString();
};

export default {
    func,
    description: {
        "en": "Display the current date and time",
        "es": "Muestra la fecha y hora actual"
    },
    validArgs: []
};