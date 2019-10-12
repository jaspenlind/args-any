import { OptionMap, ParserSettings } from ".";

export interface OptionParser {
  parse: (args: string[], settings?: Partial<ParserSettings>) => OptionMap;
}
