import { ParserSettings } from "../../types";
import { trimStart } from "../stringHelper";

const dash = "-";
const prefixSeparator = ".";

export const prefixless = (key: string, settings?: Partial<ParserSettings>): string => {
  const prefixes = [dash];

  if (settings && settings.keyPrefix) {
    prefixes.push(`${settings.keyPrefix}${prefixSeparator}`);
  }

  return trimStart(key, ...prefixes);
};
