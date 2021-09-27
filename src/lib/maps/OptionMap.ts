import { convert } from "string-converter";
import { parseArgs } from "../parser/args.parser";
import { prefixlessKey } from "../parser/prefixless-key.parser";
import { toObject } from "../partial";
import { ArgContainer, OpenRecord, Option, Operator, ParserSettings, ReadonlyMap } from "../../types";

/**
 * Map of `Option`
 */
export class OptionMap extends ReadonlyMap<string, Option> {
  public readonly args: ArgContainer;

  private mapArgs() {
    const options = this.arg.reduce<string[]>((acc, curr) => {
      if (this.has(curr)) {
        acc.push(curr);

        const option = this.get(curr);
        if (option?.value) {
          acc.push(option.value);
        }
      }
      return acc;
    }, []);

    return {
      all: () => this.arg,
      options: () => options,
      other: () => this.arg.filter((x) => !options.includes(x))
    };
  }

  constructor(private arg: string[], private settings?: Partial<ParserSettings>) {
    super(parseArgs(arg, settings));
    // this.args = args;

    this.args = this.mapArgs();

    // this.args = argContainer(arg, this);
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
    return super.has(prefixlessKey.parse(key, this.settings));
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
    return super.get(prefixlessKey.parse(key, this.settings));
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
