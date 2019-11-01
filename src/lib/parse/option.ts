import { Option, Operator, ParserSettings } from "../../types";
import { optionMarker, prefixless } from ".";
import { operator } from "./operator";

export { Option, Operator };

export const empty: Option = Object.freeze({
  key: "",
  operator: operator.default,
  toString: () => "",
  value: ""
});

const flags = ["h", "debug"];
export const isKey = (arg: string) => arg && arg.startsWith(optionMarker);
const isFlag = (key: string) => flags.find(x => x === prefixless(key)) !== undefined;

export const create = (fields: Partial<Option>): Option => {
  const option = { ...empty, ...fields };

  option.toString = () => option.value;

  return option;
};

export const fromArgs = (key: string, args: string[], settings?: Partial<ParserSettings>): Option => {
  const [first, second] = [...args].slice(args.indexOf(key) + 1);

  let op = "";
  let value: string | undefined;

  if (!isFlag(key) && first && !isKey(first) && second && !isKey(second) && operator.has(first)) {
    op = first;
    value = second;
  } else if (!isFlag(key) && first && !isKey(first)) {
    value = first;
  }

  return create({ key: prefixless(key, settings), operator: operator.parse(op), value });
};

export const option = {
  empty,
  create,
  isKey,
  fromArgs
};
