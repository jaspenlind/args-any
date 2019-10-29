import { ArgContainer, Option, ParserSettings, ReadonlyMap } from "../types";
import { indexOfAny } from "./utils/indexOfAny";
import { argContainer } from ".";
import { filter } from "./partialFilter";
import { parse, prefixless } from "./parse";
import { toObject } from "./mapHelper";

const inlineSeparators = ["<=", "=<", ">=", "=>", "=", ":", "!="];

const expandSeparator = (arg: string): string[] => {
  const [index, matchingString] = indexOfAny(arg, ...inlineSeparators);

  if (matchingString) {
    return [
      arg.substring(0, index - 1),
      arg.substring(index, matchingString.length),
      arg.substring(index + matchingString.length + 1)
    ];
  }

  return [arg];
};

const parseNew = (args: string[]): Map<string, Option | undefined> => {
  const normalized = args.reduce<string[]>((acc, curr) => {
    acc.push(...expandSeparator(curr));
    return acc;
  }, []);

  return new Map<string, Option | undefined>();
};

export class OptionMap extends ReadonlyMap<string, Option | undefined> {
  private readonly settings?: Partial<ParserSettings>;

  constructor(args: string[], settings?: Partial<ParserSettings>) {
    super(parse(args, settings));
    this.args = argContainer(args, this);
    this.settings = settings;
  }

  public readonly args: ArgContainer;

  public asPartial<T>(): Partial<T> {
    return toObject(this);
  }

  public get(key: string): Option | undefined {
    return super.get(prefixless(key, this.settings));
  }

  public filter<T>(...items: T[]): T[] {
    const filterMap = this.asPartial<T>();

    return items.filter(item => filter(filterMap, item));
  }

  public has(key: string): boolean {
    return super.has(prefixless(key, this.settings));
  }
}
