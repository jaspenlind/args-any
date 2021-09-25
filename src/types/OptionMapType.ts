import { ArgContainer, Option } from ".";
export interface OptionMapType extends ReadonlyMap<string, Option | undefined> {
  asPartial: <T>() => Partial<T>;
  filter: <T>(...items: T[]) => T[];
  args: ArgContainer;
}
