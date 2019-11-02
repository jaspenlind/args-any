import { ParserSettings } from "../types";
import { OptionMap } from "./OptionMap";

export * from "../types";
export { argContainer } from "./argContainer";
export { OptionMap } from "./OptionMap";

/**
 * Parse command line arguments to a map of options
 */
export const argsAny = {
  /**
   * @param args The arguments to parse
   * @param settings parser settings
   *
   *    * @example ["-option1>5", "-option2", "eq", "5", "--force"]
   */
  parse: (args: string[], settings?: Partial<ParserSettings>) => new OptionMap(args, settings)
};

export default argsAny;
