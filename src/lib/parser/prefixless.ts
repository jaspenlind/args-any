import { trimStart } from "lodash";
import { ParserSettings } from "../../types";

export const optionMarker = "-";
export const prefixSeparator = ".";

export const prefixless = (key: string, settings?: Partial<ParserSettings>): string => {
  let trimmed = trimStart(key, optionMarker);

  if (settings && settings.keyPrefix) {
    const prefix = `${settings.keyPrefix}${prefixSeparator}`;

    if (trimmed.startsWith(prefix)) {
      trimmed = trimmed.substring(prefix.length);
    }
  }
  return trimmed;
};
