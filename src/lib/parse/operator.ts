import { CaseInsensitiveMap, Operator } from "../../types";

export { Operator };

const operatorMap = new CaseInsensitiveMap<string, [Operator, boolean]>([
  ["ne", [Operator.Ne, false]],
  ["!=", [Operator.Ne, true]],
  ["lt", [Operator.Lt, false]],
  ["<", [Operator.Lt, true]],
  ["le", [Operator.Le, false]],
  ["<=", [Operator.Le, true]],
  ["=<", [Operator.Le, true]],
  ["gt", [Operator.Gt, false]],
  [">", [Operator.Gt, true]],
  ["ge", [Operator.Ge, false]],
  [">=", [Operator.Ge, true]],
  ["=>", [Operator.Ge, true]],
  ["in", [Operator.In, false]],
  ["=", [Operator.Eq, true]],
  [":", [Operator.Eq, true]]
]);

const defaultOperator: Operator = Object.freeze(Operator.Eq);
const has = (operatorString: string) => operatorMap.has(operatorString);
const inlinesAllowed = () => [...operatorMap.entries()].filter(x => x[1][1] === true).map(z => z[0]);

const parse = (operatorString?: string): Operator => {
  const value = operatorMap.get(operatorString || "");

  return (value && value[0]) || Operator.Eq;
};

export const operator = {
  default: defaultOperator,
  has,
  inlinesAllowed,
  parse
};
