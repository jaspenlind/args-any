import { ArgContainer, ParserSettings, ReadonlyMap } from "../types";
import { argContainer } from ".";
import { filter } from "./partialFilter";
import { parse, prefixless } from "./parse";
import { toObject } from "./mapHelper";

export class OptionMap extends ReadonlyMap<string, string | undefined> {
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

  public get(key: string): string | undefined {
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
