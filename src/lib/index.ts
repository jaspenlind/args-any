import { ParserSettings } from "../types";
import { OptionMap } from "./OptionMap";

export * from "../types";
export { argContainer } from "./argContainer";
export { OptionMap } from "./OptionMap";

export const optionParser = {
  parse: (args: string[], settings?: Partial<ParserSettings>) => new OptionMap(args, settings)
};

export default optionParser;
