import { ParserSettings } from "../types";
import { OptionMap } from "./maps";

export * from "../types";

/**
 * @param args The arguments to parse
 * @param settings parser settings
 *
 *    * @example ["-option1>5", "-option2", "eq", "5", "--force"]
 */
export const parse = (args: string[], settings?: Partial<ParserSettings>): OptionMap => new OptionMap(args, settings);
/**
 * Parse command line arguments to a map of options
 */
export const argsAny = {
  parse
};

export default argsAny;
