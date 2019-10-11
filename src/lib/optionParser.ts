#!/usr/bin/env node
import { OptionParser, ParsedOptions, ParserSettings } from "../types";
import { filter } from "./partialFilter";
import { parse } from "./parse";
import { toObject } from "./mapHelper";

export enum OptionOperand {
  Equals
}

export const optionParser: OptionParser = {
  parse: (args: string[], settings?: Partial<ParserSettings>): ParsedOptions => {
    const map = parse(args, settings);
    const asPartial = () => toObject(map);

    const options: ParsedOptions = Object.assign(map, {
      asPartial,
      filter: <T>(...items: T[]) => {
        const filterMap = asPartial();
        return items.filter(item => filter(filterMap, item));
      },
      unwrap: () => args
    });

    return options;
  }
};
