import { convert } from "string-converter";
import { argContainer } from "..";
import { parse } from "../parser";
import { prefixless } from "../parser/prefixless";
import { toObject } from "../map-helper";
import { ArgContainer, OpenRecord, Option, Operator, ParserSettings, ReadonlyMap } from "../../types";

/**
 * Map of `Option`
 */
export class OptionMap extends ReadonlyMap<string, Option> {
  public readonly args: ArgContainer;

  private readonly settings?: Partial<ParserSettings>;

  constructor(args: string[], settings?: Partial<ParserSettings>) {
    super(parse(args, settings));
    this.args = argContainer(args, this);
    this.settings = settings;
  }

  /**
   * Filter a list of items based on options defined in the map
   * @param items The items to filter
   * @returns The items matching options in the map
   */
  public filter<T extends OpenRecord>(...items: T[]): T[] {
    // allow this alias for now
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const map = this;
    return items.filter((x) => this.matches.call(map, x));
  }

  /**
   * Check if an option exists in the map
   * @param key key of the option to check
   * @returns `true` if the option exists, otherwise `false`
   */
  public has(key: string): boolean {
    return super.has(prefixless(key, this.settings));
  }

  /**
   * Creates a `Partial<T>` from the `OptionMap` with the keys and values defined in the map
   */
  public asPartial<T>(): Partial<T> {
    return toObject(this);
  }

  /**
   * Get option by key
   * @param key The option to fetch
   * @returns `Option` for the specified `key`
   */
  public get(key: string): Option | undefined {
    return super.get(prefixless(key, this.settings));
  }

  /** @ignore */
  private matches<T extends OpenRecord>(item: T): boolean {
    return [...this.keys()].reduce<boolean>((acc, curr) => {
      if (acc === false) return false;

      const itemValue = item[curr];
      const option = this.get(curr);

      if (option === undefined) return false;
      const optionValue = convert(option.value);

      switch (option.operator) {
        case Operator.Ne:
          return itemValue !== optionValue;
        case Operator.Ge:
          return (optionValue && itemValue >= optionValue) || false;
        case Operator.Gt:
          return (optionValue && itemValue > optionValue) || false;
        case Operator.Le:
          return (optionValue && itemValue <= optionValue) || false;
        case Operator.Lt:
          return (optionValue && itemValue < optionValue) || false;
        default:
          return itemValue === optionValue;
      }
    }, true);
  }
}
