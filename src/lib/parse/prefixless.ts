import { trimStart } from "lodash";
import { ParserSettings } from "../../types";

export const optionMarker = "-";
export const prefixSeparator = ".";

export const prefixless = (key: string, settings?: Partial<ParserSettings>): string => {
  const prefixes = [optionMarker];

  if (settings && settings.keyPrefix) {
    prefixes.push(`${optionMarker}${settings.keyPrefix}${prefixSeparator}`);
  }
  return trimStart(key, prefixes.join(""));
};
