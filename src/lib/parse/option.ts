import { trimStart } from "lodash";
import { Option, Operator, ParserSettings } from "../../types";
import { optionMarker, prefixSeparator, prefixless } from ".";
import { operator } from "./operator";

export { Option, Operator };

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
  return flagKeys.find((x) => x === prefixless(key)) !== undefined;
};

export const create = (fields: Partial<Option>): Option => {
  const option = { ...empty, ...fields };

  option.toString = () => option.value;

  return option;
};

export const fromArgs = (key: string, args: string[], settings?: Partial<ParserSettings>): Option => {
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

  return create({ key: prefixless(key, settings), operator: operator.parse(op), value });
};

export const option = {
  create,
  empty,
  fromArgs,
  hasPrefix,
  isKey
};
