import { ArgContainer } from ".";
export interface OptionMap extends ReadonlyMap<string, string | undefined> {
  asPartial: <T>() => Partial<T>;
  filter: <T>(...items: T[]) => T[];
  args: ArgContainer;
}
