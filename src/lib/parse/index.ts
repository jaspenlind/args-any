import { trim } from "lodash";
import { Option, ParserSettings } from "../../types";
import { operator } from "./operator";

import { expandSeparator } from "./expandSeparator";
import { option } from "./option";
import { optionMarker, prefixless, prefixSeparator } from "./prefixless";

export { expandSeparator };
export { optionMarker, prefixless, prefixSeparator };
export * from "./option";
export { operator };

export const parse = (args: string[], settings?: Partial<ParserSettings>): Map<string, Option> => {
  const trimChars = '"';

  const normalized = args.reduce<string[]>((acc, curr) => {
    acc.push(...expandSeparator(trim(curr, trimChars)));
    return acc;
  }, []);

  let keys = normalized.filter(option.isKey);

  const keyPrefix = settings && settings.keyPrefix;

  if (keyPrefix) {
    keys = keys.filter(x => option.hasPrefix(x, keyPrefix));
  }

  const map = new Map<string, Option>();

  for (const key of keys) {
    map.set(prefixless(key, settings), option.fromArgs(key, normalized, settings));
  }

  return map;
};
