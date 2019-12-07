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

  const keyPrefix = (settings && settings.keyPrefix) || false;
  const useValueAsKey = (settings && settings.valueAsKey) || false;

  if (keyPrefix) {
    keys = keys.filter(x => option.hasPrefix(x, keyPrefix));
  }

  const map = new Map<string, Option>();

  let current = [...normalized];

  for (const key of keys) {
    const itemValue = option.fromArgs(key, current, settings);
    const itemKey = useValueAsKey ? itemValue.value : prefixless(key, settings);

    current = current.slice(current.indexOf(key) + 1);

    const exclude = settings && settings.filter && !settings.filter(itemValue);

    if (!exclude) {
      map.set(itemKey, itemValue);
    }
  }

  return map;
};
