import { StringConvertible } from "string-converter";
import { Operator } from ".";

export interface Option extends StringConvertible {
  key: string;
  operator: Operator;
  value: string;
}
