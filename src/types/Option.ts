import { StringConvertible } from "string-converter";
import { Operator } from ".";

/**
 * Represents a set of arguments describing a critera
 * @example
 * const serverInSweden: Option = {
 *  key: "location",
 *  operator: Operator.Eq,
 *  value: "Sweden"
 * }
 */
export interface Option extends StringConvertible {
  key: string;
  operator: Operator;
  value: string;
}
