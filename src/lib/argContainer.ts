import { ArgContainer, OptionMap } from "../types";

export const argContainer = (args: string[], map: OptionMap) => {
  const all = (): string[] => args;

  const options = (): string[] => {
    const result: string[] = [];

    for (let i = 0; i < args.length; i += 1) {
      const key = args[i];
      if (map.has(key)) {
        result.push(args[i]);
        const option = map.get(key);
        if (option) {
          result.push(option.value);
          i += 1;
        }
      }
    }

    return result;
  };

  const other = (): string[] => {
    const optionArgs = options();

    return all().filter(x => !optionArgs.includes(x));
  };

  const container: ArgContainer = {
    all,
    options,
    other
  };

  return container;
};
