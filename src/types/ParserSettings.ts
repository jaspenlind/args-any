import { Option } from "../types";

/**
 * Option parser settings
 */
export interface ParserSettings {
  /**
   * Describes the prefix used to tag option keys
   * @example filter
   * -filter.option1=value1
   *
   * @default none
   */
  keyPrefix: string;
  /**
   * A list of keys considered to be a flag (option without a value)
   * @default ["h", "debug"]
   */
  flags: string[];

  /**
   * Map righthand side of statement to a property of a partial interface
   * @example
   * -output=name -output=ip_address
   */
  valueAsKey: boolean;

  /**
   * Optional predicate that can be used to filter options
   */
  filter?: (option: Option) => boolean;
}
