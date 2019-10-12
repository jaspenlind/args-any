#!/usr/bin/env node
import { OptionParser, ParserSettings } from "../types";
import { OptionMap } from ".";

export enum OptionOperand {
  Equals
}

export const optionParser: OptionParser = {
  parse: (args: string[], settings?: Partial<ParserSettings>): OptionMap => {
    return new OptionMap(args, settings);
  }
};
