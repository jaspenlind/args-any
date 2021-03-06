import { ArgContainer, Option } from ".";
export interface OptionMap extends ReadonlyMap<string, Option | undefined> {
  asPartial: <T>() => Partial<T>;
  filter: <T>(...items: T[]) => T[];
  args: ArgContainer;
}
