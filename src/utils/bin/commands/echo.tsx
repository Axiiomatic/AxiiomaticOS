export const func = async (args: string[]) => {
  return args.join(" ");
};

export default {
    func,
  description: {
    "en": "Echo user input",
    "es": "Muestra el texto ingresado"
  }
};