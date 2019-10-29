import { Option, Operator } from "../types";

export { Option, Operator };

export const empty: Option = Object.freeze({
  key: "",
  operator: Operator.Eq,
  value: "",
  toString: () => ""
});

export const create = (fields: Partial<Option>): Option => {
  const option = { ...empty, ...fields };

  option.toString = () => option.value;

  return option;
};
