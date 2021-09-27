import { trimStart } from "lodash";
import { operator } from "./operator.parser";
import { optionMarker, parsePrefixlessKey, prefixSeparator } from "./prefixless-key.parser";
import { Option, ParserSettings } from "../../types";

export const empty: Option = Object.freeze({
  key: "",
  operator: operator.default,
  toString: () => "",
  value: ""
});

const defaultFlags = ["h", "debug"];

export const isKey = (arg: string): boolean => (arg && arg.startsWith(optionMarker)) || false;
export const hasPrefix = (arg: string, prefix: string): boolean =>
  isKey(arg) && trimStart(arg, optionMarker).startsWith(`${prefix}${prefixSeparator}`);

const isFlag = (key: string, flags?: string[]) => {
  const flagKeys = flags || defaultFlags;
  return flagKeys.find((x) => x === parsePrefixlessKey(key)) !== undefined;
};

export const create = (fields: Partial<Option>): Option => {
  const option = { ...empty, ...fields };

  option.toString = () => option.value;

  return option;
};

export const optionParser = (key: string, args: string[], settings?: Partial<ParserSettings>): Option => {
  const index = args.indexOf(key) + 1;

  const [first, second] = [...args].slice(index);

  const flags = settings && settings.flags;

  let op = "";
  let value: string | undefined;

  if (!isFlag(key, flags) && first && !isKey(first) && second && !isKey(second) && operator.has(first)) {
    op = first;
    value = second;
  } else if (!isFlag(key, flags) && first && !isKey(first)) {
    value = first;
  }

  return create({ key: parsePrefixlessKey(key, settings), operator: operator.parse(op), value });
};

export const option = {
  create,
  empty,
  parse: optionParser,
  hasPrefix,
  isKey
};
