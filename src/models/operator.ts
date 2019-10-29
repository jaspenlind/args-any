import { Operator } from "../types";

export { Operator };

export const defaultOperator: Operator = Object.freeze(Operator.Eq);

export const parse = (operatorString?: string): Operator => {
  const compareWith = (operatorString && operatorString.toLowerCase()) || "";

  switch (compareWith) {
    case "ne":
    case "!=":
      return Operator.Ne;
    case "lt":
    case "<":
      return Operator.Lt;
    case "le":
    case "<=":
    case "=<":
      return Operator.Le;
    case "gt":
    case ">":
      return Operator.Gt;
    case "ge":
    case ">=":
    case "=>":
      return Operator.Ge;
    case "in":
      return Operator.In;
    default:
      return Operator.Eq;
  }
};
