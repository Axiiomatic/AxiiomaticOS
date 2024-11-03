export const func = (args: string[]) => {
  return args.join(" ");
};

export default {
    func,
    description: "Echo user input"
};