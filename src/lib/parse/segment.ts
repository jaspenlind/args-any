import { takeWhile } from "lodash-es";
import { prefixless } from ".";
import { OptionSegment, ParserSettings } from "../../types";

const flags = ["h", "debug"];
const separators = ["=", ":"];
export const dash = "-";

const parseKey = (segment: string, settings?: Partial<ParserSettings>): [string | undefined, string | undefined] => {
  const isKey = segment.startsWith(dash) && segment.length > 1;

  if (!isKey) {
    return [undefined, segment];
  }

  const withoutPrefix = prefixless(segment, settings);

  const key = takeWhile([...withoutPrefix], x => !separators.includes(x)).join("");

  const value = withoutPrefix.substring(key.length);
  return [key, value === "" ? undefined : value];
};

export const parse = (
  current: string,
  prev?: OptionSegment,
  settings?: Partial<ParserSettings>
): OptionSegment | undefined => {
  const [key, remainder] = parseKey(current, settings);

  const currentKey = key || (prev && prev.key);

  if (currentKey === undefined) {
    return undefined;
  }

  const isFlag = flags.find(x => x === currentKey) !== undefined;

  let value: string | undefined;

  if (!isFlag) {
    value = (prev && prev.value) || remainder;

    if (value) {
      const [firstChar] = value;

      if (separators.includes(firstChar)) {
        value = value.substring(1);
      }
    }
  }

  const segment: OptionSegment = {
    isFlag,
    key: currentKey,
    operand: "",
    value
  };

  return segment;
};
