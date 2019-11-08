import { trimStart } from "lodash";
import { ParserSettings } from "../../types";

export const optionMarker = "-";
const prefixSeparator = ".";

export const prefixless = (key: string, settings?: Partial<ParserSettings>): string => {
  const prefixes = [optionMarker];

  if (settings && settings.keyPrefix) {
    prefixes.push(`${settings.keyPrefix}${prefixSeparator}`);
  }

  return trimStart(key, prefixes.join(""));
};
