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
  ["=", [Operator.Eq, true]],
  [":", [Operator.Eq, true]]
]);

const operatorIndex = 0;
const defaultOperator: Operator = Object.freeze(Operator.Eq);
const has = (operatorString: string) => operatorMap.has(operatorString);
const inlinesAllowed = () => [...operatorMap.entries()].filter(x => x[1][1] === true).map(z => z[operatorIndex]);

const parse = (operatorString?: string): Operator => {
  const value = operatorMap.get(operatorString || "");

  return (value && value[operatorIndex]) || Operator.Eq;
};

export const operator = {
  default: defaultOperator,
  has,
  inlinesAllowed,
  parse
};
