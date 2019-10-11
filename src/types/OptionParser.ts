import { ParsedOptions, ParserSettings } from ".";

export interface OptionParser {
  parse: (args: string[], settings?: Partial<ParserSettings>) => ParsedOptions;
}
