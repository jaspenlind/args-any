import { Option, ParserSettings } from "../../types";

import { expandSeparator } from "./expandSeparator";
import { option } from "./option";
import { optionMarker, prefixless } from "./prefixless";

export { expandSeparator };
export { optionMarker, prefixless };
export * from "./option";
export { operator } from "./operator";

export const parse = (args: string[], settings?: Partial<ParserSettings>): Map<string, Option> => {
  const normalized = args.reduce<string[]>((acc, curr) => {
    acc.push(...expandSeparator(curr));
    return acc;
  }, []);

  const keys = normalized.filter(option.isKey);

  const map = new Map<string, Option>();

  for (const key of keys) {
    map.set(prefixless(key, settings), option.fromArgs(key, normalized, settings));
  }

  return map;
};
