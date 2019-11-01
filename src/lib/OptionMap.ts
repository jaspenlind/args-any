import { ArgContainer, Option, ParserSettings, ReadonlyMap, OpenRecord, Operator } from "../types";
import { argContainer } from ".";
import { parse, prefixless } from "./parse";
import { toObject } from "./mapHelper";
import { convert } from "./stringConverter";

export { Option };

export class OptionMap extends ReadonlyMap<string, Option> {
  private readonly settings?: Partial<ParserSettings>;

  public readonly args: ArgContainer;

  constructor(args: string[], settings?: Partial<ParserSettings>) {
    super(parse(args, settings));
    this.args = argContainer(args, this);
    this.settings = settings;
  }

  public asPartial<T>(): Partial<T> {
    return toObject(this);
  }

  public get(key: string): Option | undefined {
    return super.get(prefixless(key, this.settings));
  }

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

  public filter<T extends OpenRecord>(...items: T[]): T[] {
    // allow this alias for now
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const map = this;
    return items.filter(x => this.matches.call(map, x));
  }

  public has(key: string): boolean {
    return super.has(prefixless(key, this.settings));
  }
}
