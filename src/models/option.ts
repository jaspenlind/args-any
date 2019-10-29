import { Option, OptionSegment } from "../types";
import { defaultOperator, Operator, parse } from "./operator";

export { Option, Operator };

export const empty: Option = Object.freeze({
  key: "",
  operator: defaultOperator,
  value: "",
  toString: () => ""
});

export const create = (fields: Partial<Option>): Option => {
  const option = { ...empty, ...fields };

  option.toString = () => option.value;

  return option;
};

export const fromSegment = (segment: OptionSegment): Option => {
  return create({ key: segment.key, operator: parse(segment.operand), value: segment.value });
};
