#!/usr/bin/env node
import { OptionSegment, OptionParser, ParseOptions } from "../types";
import { filter } from "./partialFilter";
import { parse as parseOptions } from "./parse";
import { toObject } from "./mapHelper";

export enum OptionOperand {
  Equals
}

export { OptionSegment, OptionParser, ParseOptions };

const parse = (
  args: string[],
  options?: Partial<ParseOptions>
): OptionParser => {
  const map = new Map<string, string | undefined>(parseOptions(args, options));

  const asPartial = () => toObject(map);

  const parser: OptionParser = Object.assign(map, {
    asPartial,
    filter: <T>(...items: T[]) => {
      const filterMap = asPartial();
      return items.filter(item => filter(filterMap, item));
    },
    unwrap: () => args
  });

  return parser;
};

export default { parse };
