export const func = async (args: string[]) => {
  return args.join(" ");
};

export default {
    func,
  description: "Echo user input",
  description_es: "Muestra el texto ingresado",
};