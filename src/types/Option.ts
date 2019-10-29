import { Operator, StringConvertible } from ".";

export interface Option extends StringConvertible {
  key: string;
  operator: Operator;
  value: string;
}
