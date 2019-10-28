import { trimStart } from "lodash-es";
import { ParserSettings } from "../../types";

const dash = "-";
const prefixSeparator = ".";

export const prefixless = (key: string, settings?: Partial<ParserSettings>): string => {
  const prefixes = [dash];

  if (settings && settings.keyPrefix) {
    prefixes.push(`${settings.keyPrefix}${prefixSeparator}`);
  }

  return trimStart(key, prefixes.join(""));
};
